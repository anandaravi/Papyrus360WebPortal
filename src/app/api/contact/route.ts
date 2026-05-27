import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const subjectLabels: Record<string, string> = {
  general: 'General Enquiry',
  'erp-demo': 'ERP Demo (BPApp)',
  consulting: 'Process / Compliance Consulting',
  partnership: 'Partnership',
};

function renderHtml(data: ContactPayload): string {
  const { name, company, email, phone, subject, message } = data;
  const subjectLabel = subjectLabels[subject] ?? subject;

  const row = (label: string, value: string, isLink?: 'email' | 'tel') => {
    const link =
      isLink === 'email'
        ? `<a href="mailto:${esc(value)}" style="color:#f59e0b;text-decoration:none;">${esc(value)}</a>`
        : isLink === 'tel'
          ? `<a href="tel:${esc(value.replace(/\s/g, ''))}" style="color:#f59e0b;text-decoration:none;">${esc(value)}</a>`
          : esc(value);
    return `<tr>
      <td style="padding:10px 0;color:#71717a;font-size:13px;width:140px;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 0;color:#fafafa;font-size:14px;font-weight:500;vertical-align:top;">${link}</td>
    </tr>`;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>New Enquiry — ${esc(subjectLabel)}</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080808;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#0f0f0f 100%);border:1px solid #2a2a2a;border-bottom:none;border-radius:12px 12px 0 0;padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Enquiry — ${esc(subjectLabel)}</p>
                    <h1 style="margin:6px 0 0 0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">${esc(company)}</h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <span style="display:inline-block;background:#f59e0b;color:#0a0a0a;font-weight:800;font-size:11px;padding:6px 12px;border-radius:6px;letter-spacing:0.5px;">PAPYRUS360</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:24px 32px 8px 32px;">
              <p style="margin:0 0 14px 0;color:#a1a1aa;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Contact</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${row('Name', name)}
                ${row('Company', company)}
                ${row('Email', email, 'email')}
                ${phone ? row('Phone', phone, 'tel') : ''}
                ${row('Subject', subjectLabel)}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:18px 32px 24px 32px;">
              <p style="margin:0 0 12px 0;color:#a1a1aa;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Message</p>
              <div style="background:#0f0f0f;border-left:3px solid #f59e0b;padding:16px 18px;border-radius:6px;color:#d4d4d8;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
            </td>
          </tr>

          <tr>
            <td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;border-bottom:1px solid #2a2a2a;padding:8px 32px 28px 32px;text-align:center;">
              <a href="mailto:${esc(email)}?subject=Re:%20${encodeURIComponent(subjectLabel)}%20from%20${encodeURIComponent(company)}" style="display:inline-block;background:#f59e0b;color:#0a0a0a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin-right:8px;">Reply to ${esc(name.split(' ')[0])}</a>
              ${phone ? `<a href="tel:${esc(phone.replace(/\s/g, ''))}" style="display:inline-block;background:transparent;border:1px solid #2a2a2a;color:#fafafa;font-weight:600;font-size:14px;padding:11px 22px;border-radius:8px;text-decoration:none;">Call</a>` : ''}
            </td>
          </tr>

          <tr>
            <td style="background:#080808;border-radius:0 0 12px 12px;padding:18px 32px;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;border-bottom:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;color:#52525b;font-size:12px;line-height:1.5;">
                Sent from <a href="https://papyrus360.com" style="color:#71717a;text-decoration:none;">papyrus360.com</a>
                &middot; ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })} IST
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const { name, company, email, phone, subject, message } = body;

    if (!name || !company || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload: ContactPayload = { name, company, email, phone, subject, message };

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const subjectLabel = subjectLabels[subject] ?? subject;
      const text = [
        `New Enquiry — ${subjectLabel}`,
        `─────────────────────────────────`,
        `Name   : ${name}`,
        `Company: ${company}`,
        `Email  : ${email}`,
        `Phone  : ${phone ?? '—'}`,
        `Subject: ${subjectLabel}`,
        ``,
        `Message:`,
        message,
      ].join('\n');

      const result = await resend.emails.send({
        from: 'Papyrus360 Website <website@papyrus360.com>',
        to: ['vs@papyrus360.com'],
        bcc: ['anandaravi.ramasamy@gmail.com'],
        replyTo: email,
        subject: `[papyrus360.com] ${subjectLabel} — ${company}`,
        html: renderHtml(payload),
        text,
      });

      if (result.error) {
        console.error('[contact] Resend error:', result.error);
        return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
      }
      console.log('[contact] sent:', result.data?.id);
    } else {
      console.log('[contact] RESEND_API_KEY not set — logging submission:', { name, company, email, subject });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
