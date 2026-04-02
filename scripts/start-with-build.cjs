const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const distCandidates = [path.join(projectRoot, 'dist'), path.join(projectRoot, 'backend', 'dist')];

function hasBuiltFrontend() {
  return distCandidates.some((candidate) => fs.existsSync(path.join(candidate, 'index.html')));
}

function run(command, args) {
  return spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}

const autoBuild = process.env.AUTO_BUILD_FRONTEND !== 'false';

if (!hasBuiltFrontend() && autoBuild) {
  console.log('No frontend dist found. Building frontend before starting backend...');
  const buildResult = run('npm', ['run', 'build']);
  if (buildResult.status !== 0) {
    console.warn('Frontend build failed at startup. Starting backend anyway (API-only mode).');
  }
}

require(path.join(projectRoot, 'backend', 'server.js'));
