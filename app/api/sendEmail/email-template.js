export const generateEmailTemplate = ({
  fname,
  lname,
  email,
  phone,
  content,
  date,
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skinbloom Kontaktanfrage</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Georgia, "Times New Roman", serif;
        line-height: 1.65;
        color: #1f2d3e;
        background: #f6f1ee;
        padding: 28px 14px;
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(31, 45, 62, 0.12);
      }

      .header {
        padding: 34px 28px 28px;
        background:
          radial-gradient(circle at top right, rgba(1, 115, 116, 0.22), transparent 34%),
          linear-gradient(135deg, #1f2d3e 0%, #24384d 100%);
        color: #ffffff;
      }

      .eyebrow {
        display: inline-block;
        font-family: Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #c49994;
        margin-bottom: 14px;
      }

      .header h1 {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.12;
        margin-bottom: 10px;
        letter-spacing: -0.02em;
      }

      .header p {
        font-family: Arial, sans-serif;
        font-size: 15px;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.84);
      }

      .content {
        padding: 28px;
      }

      .meta-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        margin-bottom: 18px;
      }

      .card {
        padding: 18px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(248, 244, 242, 0.88) 0%, rgba(255, 255, 255, 0.96) 100%);
        border: 1px solid rgba(196, 153, 148, 0.18);
      }

      .label {
        font-family: Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #c49994;
        margin-bottom: 6px;
      }

      .value {
        font-family: Arial, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #1f2d3e;
        background: #ffffff;
        border: 1px solid rgba(196, 153, 148, 0.14);
        border-radius: 12px;
        padding: 12px 14px;
      }

      .message-card {
        margin-top: 4px;
      }

      .message-content {
        white-space: pre-line;
      }

      .footer {
        padding: 22px 28px 28px;
        background: #f8f4f2;
        border-top: 1px solid rgba(196, 153, 148, 0.18);
        text-align: center;
      }

      .footer p {
        font-family: Arial, sans-serif;
        font-size: 13px;
        line-height: 1.75;
        color: #6f7a86;
      }

      .footer p + p {
        margin-top: 8px;
      }

      @media only screen and (max-width: 600px) {
        body {
          padding: 0;
        }

        .container {
          border-radius: 0;
        }

        .header,
        .content,
        .footer {
          padding-left: 18px;
          padding-right: 18px;
        }

        .header h1 {
          font-size: 24px;
        }

        .meta-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <span class="eyebrow">Skinbloom Aesthetics</span>
        <h1>Neue Kontaktanfrage</h1>
        <p>Ueber das Kontaktformular ist eine neue Nachricht eingegangen. Die wichtigsten Angaben finden Sie unten kompakt aufbereitet.</p>
      </div>

      <div class="content">
        <div class="meta-grid">
          <div class="card">
            <div class="label">Name</div>
            <div class="value">${fname} ${lname}</div>
          </div>
          <div class="card">
            <div class="label">E-Mail</div>
            <div class="value">${email}</div>
          </div>
          ${phone ? `
          <div class="card">
            <div class="label">Telefon</div>
            <div class="value">${phone}</div>
          </div>
          ` : ""}
          <div class="card">
            <div class="label">Eingang</div>
            <div class="value">${date}</div>
          </div>
        </div>

        <div class="card message-card">
          <div class="label">Nachricht</div>
          <div class="value message-content">${content}</div>
        </div>
      </div>

      <div class="footer">
        <p>Automatisch generiert ueber das Kontaktformular von Skinbloom Aesthetics.</p>
        <p>Bitte direkt an ${email} antworten, wenn Sie auf diese Anfrage reagieren moechten.</p>
      </div>
    </div>
  </body>
</html>
`;

export const generatePlainTextEmail = ({
  fname,
  lname,
  email,
  phone,
  content,
  date,
}) => `
NEUE KONTAKTANFRAGE
-------------------

Name: ${fname} ${lname}
E-Mail: ${email}
${phone ? `Telefon: ${phone}\n` : ""}Datum: ${date}

Nachricht:
${content}
`;
