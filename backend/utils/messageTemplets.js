const emailVerificationTemplate = (verificationCode) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verification</title>
    </head>
    <body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
        <tr>
          <td>
            <h2 style="color: #333333; margin-bottom: 24px;">Verify Your Email Address</h2>

            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              Thank you for signing up with <strong>AiSoftTech</strong>. To complete your registration, please verify your email address using the code below:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #000;">${verificationCode}</p>
              <p style="font-size: 14px; color: #888888;">This code will expire in 10 minutes.</p>
            </div>

            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              If you didn’t request this, you can safely ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};


const welcomeMessage = (name) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div>
      <h2>Hi ${name},</h2>
      <p>Welcome to <strong>Your Company</strong>! 🎉 We're thrilled to have you onboard.</p>
      <p>Start exploring our services or reach out to us if you need help getting started.</p>
      <a href="https://yourwebsite.com/services" style="display:inline-block; padding:10px 20px; background:#007bff; color:#fff; text-decoration:none; border-radius:4px;">View Services</a>
      <p style="margin-top: 20px;">Cheers,<br>The Your Company Team</p>
    </div>
  </body>
</html>
`;

const updateProjectMessage = (
  userName,
  projectName,
  description,
  projectUrl,
  technologies
) => {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>We’ve Just Launched a New Project – Come Take a Look!</h2>

      <p>Hi ${userName},</p>

      <p>
        We’re excited to share some great news with you — we’ve just added a brand new project to our portfolio at <strong>AiSoftTech</strong>!
      </p>

      <p>
        🎯 <strong>Project Title:</strong> ${projectName}<br>
        📍 <strong>Overview:</strong> ${description}<br>
        🔗 <strong>Live Project:</strong> <a href="${projectUrl}" target="_blank">${projectUrl}</a>
      </p>

      <p>
        This project showcases our expertise in <strong>${technologies.join(
          ", "
        )}</strong>, and we’re proud of the results we delivered for our client.
      </p>

      <p>
        We invite you to explore the case study and see how we continue to deliver high-impact digital solutions.
      </p>

      <p>
        👉 <a href="${projectUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">View Project</a>
      </p>

      <p>
        Thank you for being part of our journey. If you have any questions or are interested in starting a similar project, we’d love to hear from you!
      </p>

      <p>
        Warm regards,<br>
        <strong>AiSoftTech Team</strong>
      </p>
    </body>
  </html>
  `;
};

const passwordResetOTPMessage = (userName, otpCode) => {
  return `
  <!DOCTYPE html>
  <html lang="n">
    <body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
        <tr>
          <td>
            <h2 style="color: #333333; margin-bottom: 24px;">Password Reset Request</h2>

            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              Hello ${userName},
            </p>

            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              We received a request to reset the password associated with your <strong>VISoftTech</strong> account.
              Use the OTP code below to complete the process.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #000;">${otpCode}</p>
              <p style="font-size: 14px; color: #888888;">This code is valid for the next 10 minutes.</p>
            </div>

            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              If you did not request this change, you can safely ignore this message. No changes will be made to your account.
            </p>


            <p style="font-size: 14px; color: #999999; text-align: center;">
              &copy; ${new Date().getFullYear()} AiSoftTech. All rights reserved. <br>
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = {
  passwordResetOTPMessage,
  welcomeMessage,
  updateProjectMessage,
  emailVerificationTemplate,
};
