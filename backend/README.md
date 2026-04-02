# Unnathi CNC Backend

Production-ready Node.js backend for Unnathi CNC website forms using Express and Nodemailer SMTP.

## Features

- Express API with modular folder structure
- SMTP validation and startup verification
- Contact, enquiry, careers, and industrial quote endpoints
- Centralized template-driven HTML emails + text fallback
- Auto-replies to customer email submissions
- Security middleware (`helmet`, `cors`) and rate limiting
- SPA static serving support from `backend/dist` or root `dist`
- Hostinger-compatible root entrypoint (`server.cjs`) for Node app detection

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  routes/
  services/
  utils/
  .env.example
  package.json
  server.js
server.cjs
```

## API Endpoints

- `POST /api/contact`
- `POST /api/enquiry`
- `POST /api/careers`
- `POST /api/quote`
- `GET /api/health`

All POST endpoints return structured JSON:

```json
{
  "success": true,
  "message": "..."
}
```

## Environment Variables

Use `.env.example` to create `backend/.env`:

- `PORT`
- `FRONTEND_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (fallbacks to `SMTP_USER`)
- `ADMIN_EMAIL` (fallbacks to `MAIL_RECEIVER`)
- `MAIL_RECEIVER`

## Hostinger Deployment Guide (Important)

1. Upload your project to Hostinger (including root `server.cjs`, `backend`, and built frontend `dist`).
2. In Hostinger terminal, run install at **project root**:
   ```bash
   npm install
   ```
3. Ensure `backend/.env` exists and contains valid SMTP credentials.
4. Set startup command in Hostinger to:
   ```bash
   npm start
   ```
   (`npm start` runs `node server.cjs`, which loads `backend/server.js`).
5. Verify the app is up:
   - `GET /api/health` should return success JSON.

6. Optional: backend start can auto-build frontend if `dist` is missing (default behavior). Disable by setting `AUTO_BUILD_FRONTEND=false`.


## 503 Service Unavailable Troubleshooting

If you see 503, usually Node app is not running or crashed on boot.

- Check app logs in Hostinger immediately after deploy/start.
- Confirm dependencies are installed at root (`npm install` completed successfully).
- Confirm startup command is `npm start` (it now auto-builds frontend if `dist` is absent, then starts backend).
- Confirm `backend/.env` exists and has valid `SMTP_*` values.
- Confirm your frontend build exists in either:
  - `dist/index.html` (root), or
  - `backend/dist/index.html`

## Email Deliverability Best Practices

For reliable inbox delivery:

- Configure **SPF** record for your domain to authorize your mail provider.
- Enable **DKIM** in Hostinger/email provider so messages are cryptographically signed.
- Publish **DMARC** policy to enforce SPF/DKIM alignment and reporting.
- Use a `FROM` address domain that matches the authenticated SMTP mailbox.

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```
