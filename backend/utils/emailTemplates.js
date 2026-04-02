function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeValue(value, fallback = 'Not provided') {
  return escapeHtml(value || fallback);
}

function metadataBadge(label, value) {
  return `
    <span style="display:inline-block;background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;border-radius:999px;padding:6px 10px;margin:0 6px 6px 0;font-size:12px;line-height:1.2;">
      <strong>${escapeHtml(label)}:</strong> ${safeValue(value)}
    </span>
  `;
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:12px 14px;background:#f9fafb;border:1px solid #e5e7eb;width:220px;font-weight:700;color:#111827;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;background:#ffffff;border:1px solid #e5e7eb;color:#1f2937;white-space:pre-wrap;word-break:break-word;">${safeValue(value)}</td>
    </tr>
  `;
}

function baseTemplate({
  heading,
  subheading,
  contextBadges,
  tableTitle,
  rows,
  actionNotes,
}) {
  const badges = (contextBadges || []).join('');
  const notes = (actionNotes || [])
    .map(
      (note) => `
        <li style="margin-bottom:8px;color:#374151;">${escapeHtml(note)}</li>
      `
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(heading)}</title>
      </head>
      <body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:840px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(135deg,#0b1220,#1f2f46);color:#ffffff;">
              <p style="margin:0;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;opacity:0.85;">Unnathi CNC Website</p>
              <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(heading)}</h1>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#dbe7ff;">${escapeHtml(subheading)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 24px 8px;background:#ffffff;">${badges}</td>
          </tr>

          <tr>
            <td style="padding:8px 24px 24px;">
              <h2 style="margin:0 0 12px;font-size:17px;color:#111827;">${escapeHtml(tableTitle)}</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;">
                ${rows.join('')}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 24px;">
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;">
                <h3 style="margin:0 0 10px;font-size:15px;color:#111827;">Recommended next actions</h3>
                <ul style="margin:0;padding-left:18px;">${notes}</ul>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.5;">
              This is an automated notification from Unnathi CNC web forms. Please reply from your business mailbox to continue the discussion.
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function getContactTemplate(data) {
  return baseTemplate({
    heading: 'New Website Contact Submission',
    subheading: 'A visitor reached out through the contact form and may need CNC machining assistance.',
    contextBadges: [
      metadataBadge('Form Type', 'Contact'),
      metadataBadge('Priority', 'Standard Follow-up'),
      metadataBadge('Service Context', data.interestArea || 'General CNC Support'),
    ],
    tableTitle: 'Contact details',
    rows: [
      detailRow('Name', data.name),
      detailRow('Email', data.email),
      detailRow('Phone', data.phone),
      detailRow('Message', data.message),
      detailRow('Interest Area', data.interestArea || 'General CNC machining support'),
    ],
    actionNotes: [
      'Acknowledge the enquiry and capture machining goals, target application, and expected usage.',
      'Identify if the requirement is prototype, pilot run, or recurring batch production.',
      'Request drawings/spec files when technical evaluation is needed.',
    ],
  });
}

function getEnquiryTemplate(data) {
  return baseTemplate({
    heading: 'New Manufacturing Enquiry',
    subheading: 'A company has shared a requirement for precision components or CNC production support.',
    contextBadges: [
      metadataBadge('Form Type', 'Enquiry'),
      metadataBadge('Company', data.company),
      metadataBadge('Material', data.material || 'To be confirmed'),
      metadataBadge('Lead Time', data.leadTime || 'To be discussed'),
    ],
    tableTitle: 'Requirement summary',
    rows: [
      detailRow('Name', data.name),
      detailRow('Email', data.email),
      detailRow('Phone', data.phone),
      detailRow('Company', data.company),
      detailRow('Requirement', data.requirement),
      detailRow('Material Preference', data.material || 'Not provided'),
      detailRow('Estimated Quantity', data.quantity || 'Not provided'),
      detailRow('Expected Lead Time', data.leadTime || 'Not provided'),
    ],
    actionNotes: [
      'Evaluate machining process flow and tolerance capability for this requirement.',
      'Confirm material grade, heat treatment/coating needs, and inspection expectations.',
      'Share feasible timeline and next commercial discussion checkpoint.',
    ],
  });
}

function getCareersTemplate(data) {
  return baseTemplate({
    heading: 'New Careers / Job Application',
    subheading: 'A candidate is interested in contributing to Unnathi CNC operations and precision manufacturing.',
    contextBadges: [
      metadataBadge('Form Type', 'Careers'),
      metadataBadge('Role Applied', data.role),
      metadataBadge('Experience', data.experience),
    ],
    tableTitle: 'Candidate details',
    rows: [
      detailRow('Name', data.name),
      detailRow('Email', data.email),
      detailRow('Phone', data.phone),
      detailRow('Applied Role', data.role),
      detailRow('Experience', data.experience),
      detailRow('Relevant Skills', data.skills || 'Not provided'),
      detailRow('Resume / Profile Link', data.resumeLink || 'Not provided'),
      detailRow('Message', data.message),
    ],
    actionNotes: [
      'Review role fit for CNC machining, production, quality, or process engineering functions.',
      'Shortlist based on hands-on experience with tolerances, setup, inspection, and shift discipline.',
      'Schedule HR + technical screening for suitable profiles.',
    ],
  });
}

function getQuoteTemplate(data) {
  return baseTemplate({
    heading: 'New Industrial Quote Request',
    subheading:
      'A customer is requesting a quotation for precision CNC component manufacturing and delivery planning.',
    contextBadges: [
      metadataBadge('Form Type', 'Quote Request'),
      metadataBadge('Part Name', data.partName),
      metadataBadge('Quantity', data.quantity),
      metadataBadge('Material', data.material),
      metadataBadge('Tolerance', data.tolerance || 'To be finalized'),
      metadataBadge('Lead Time', data.leadTime || 'To be finalized'),
    ],
    tableTitle: 'Quotation input details',
    rows: [
      detailRow('Name', data.name),
      detailRow('Email', data.email),
      detailRow('Phone', data.phone),
      detailRow('Company', data.company),
      detailRow('Part Name', data.partName),
      detailRow('Material', data.material),
      detailRow('Quantity', data.quantity),
      detailRow('Tolerance', data.tolerance || 'Not provided'),
      detailRow('Lead Time', data.leadTime || 'Not provided'),
      detailRow('Drawings / Spec Files', data.attachments || 'Customer to share separately'),
      detailRow('Batch Production Need', data.batchProduction || 'Not specified'),
      detailRow('Notes', data.notes),
    ],
    actionNotes: [
      'Review manufacturability based on tolerances, geometry complexity, and material stock availability.',
      'Prepare quote with assumptions: cycle time, setup/tooling, inspection, and packaging/logistics.',
      'Respond with commercial offer and clarify missing technical information if required.',
    ],
  });
}

function getAutoReplyTemplate({ name, projectType }) {
  const resolvedName = safeValue(name, 'Customer');
  const resolvedProjectType = safeValue(projectType, 'enquiry');

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank you for contacting Unnathi CNC</title>
      </head>
      <body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:720px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
          <tr>
            <td style="padding:22px 24px;background:linear-gradient(135deg,#0b1220,#1f2f46);color:#ffffff;">
              <p style="margin:0;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;opacity:0.85;">Unnathi CNC</p>
              <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;">Thank you for contacting us</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;line-height:1.7;color:#1f2937;">
              <p style="margin:0 0 12px;">Dear ${resolvedName},</p>
              <p style="margin:0 0 12px;">
                We have received your ${resolvedProjectType}. Our team will review your requirement and get back to you shortly.
              </p>
              <p style="margin:0 0 12px;">
                Unnathi CNC specializes in precision CNC machining, high-quality components, and dependable batch production
                for industrial applications.
              </p>
              <p style="margin:0;">
                To help us provide faster and accurate feedback, please share drawings/specification files, material details,
                tolerance requirements, quantity split, and expected lead time if available.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#4b5563;">
              Regards,<br />
              <strong>Unnathi CNC Team</strong>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

module.exports = {
  getContactTemplate,
  getEnquiryTemplate,
  getCareersTemplate,
  getQuoteTemplate,
  getAutoReplyTemplate,
};
