const fs = require('fs');
const path = require('path');

const dotenvModuleCandidates = [
  path.resolve(__dirname, '..', 'node_modules', 'dotenv'),
  path.resolve(__dirname, 'node_modules', 'dotenv'),
];

if (dotenvModuleCandidates.some((candidate) => fs.existsSync(candidate))) {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
} else {
  console.warn('dotenv module not found. Proceeding with environment variables from hosting platform.');
}

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { apiRateLimiter } = require('./middleware/rateLimiter');
const { verifySmtpConnection } = require('./config/smtpConfig');

const contactRoutes = require('./routes/contactRoutes');
const careersRoutes = require('./routes/careersRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

const distCandidates = [path.join(__dirname, 'dist'), path.resolve(__dirname, '..', 'dist')];

const getActiveDistPath = () =>
  distCandidates.find((candidate) => fs.existsSync(path.join(candidate, 'index.html')));

const runCommand = (command, args) =>
  spawnSync(command, args, {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

const autoBuildFrontend = () => {
  if (process.env.AUTO_BUILD_FRONTEND === 'false' || getActiveDistPath()) {
    return;
  }

  console.log('No frontend dist found. Attempting build before serving routes...');

  let buildResult = runCommand('npm', ['run', 'build']);

  if (buildResult.status === 0 || getActiveDistPath()) {
    return;
  }

  const viteBinaryPath = path.resolve(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
  if (fs.existsSync(viteBinaryPath)) {
    console.warn('Frontend build failed during startup. Continuing with backend-only mode.');
    return;
  }

  console.warn('Vite build tool is unavailable (likely production-only install). Installing dev dependencies and retrying build...');
  const installResult = runCommand('npm', ['install', '--include=dev']);
  if (installResult.status !== 0) {
    console.warn('Installing dev dependencies failed. Continuing with backend-only mode.');
    return;
  }

  buildResult = runCommand('npm', ['run', 'build']);
  if (buildResult.status !== 0) {
    console.warn('Frontend build failed during retry. Continuing with backend-only mode.');
  }
};

autoBuildFrontend();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
  })
);
app.use(express.json({ limit: '10kb' }));

app.use('/api', apiRateLimiter);
app.use('/api', contactRoutes);
app.use('/api', careersRoutes);
app.use('/api', enquiryRoutes);
app.use('/api', quoteRoutes);

app.get('/api/health', (_, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

for (const candidate of distCandidates) {
  if (fs.existsSync(candidate)) {
    app.use(express.static(candidate));
  }
}

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  const activeDistPath = getActiveDistPath();
  if (!activeDistPath) {
    return res.status(200).send('Unnathi CNC backend is running. Frontend build files were not found. Run "npm run build" in project root and redeploy.');
  }

  const indexPath = path.join(activeDistPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(200).send('Unnathi CNC backend is running. Frontend build files were not found. Run "npm run build" in project root and redeploy.');
  }

  return res.sendFile(indexPath, (error) => {
    if (error && error.code === 'ENOENT') {
      return res.status(200).send('Unnathi CNC backend is running. Frontend build files were not found. Run "npm run build" in project root and redeploy.');
    }

    if (error) {
      return next(error);
    }

    return undefined;
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`SMTP backend running on port ${PORT}`);

  if (!getActiveDistPath()) {
    console.warn('Frontend dist not found. Build frontend and upload dist to root/dist or backend/dist.');
  }

  const smtpStatus = await verifySmtpConnection();
  if (smtpStatus.ok) {
    console.log('SMTP transporter verification successful.');
  } else {
    console.error('SMTP transporter verification failed:', smtpStatus.message);
  }
});
