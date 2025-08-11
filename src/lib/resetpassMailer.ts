import nodemailer from "nodemailer";

export async function sendPasswordResetMail(email: string, name: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const appName = "Secure Docs";
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
      <div style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px rgba(102, 126, 234, 0.25); overflow: hidden; position: relative;">
        
        <!-- Decorative Top Border -->
        <div style="height: 6px; background: linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #f87171 100%);"></div>
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); padding: 40px 32px; text-align: center; color: white; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"1\" fill=\"white\" opacity=\"0.08\"/><circle cx=\"10\" cy=\"60\" r=\"1\" fill=\"white\" opacity=\"0.08\"/><circle cx=\"90\" cy=\"40\" r=\"1\" fill=\"white\" opacity=\"0.06\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>'); opacity: 0.3;"></div>
          
          <div style="position: relative; z-index: 1;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="white" stroke-width="2"/>
                <path d="M12.0012 1.25C9.9218 1.25 7.89294 1.87722 6.1667 3.05905C4.44047 4.24087 3.09634 5.92295 2.30072 7.88658C1.5051 9.85021 1.28869 12.0116 1.68327 14.0993C2.07784 16.1869 3.06422 18.1062 4.51677 19.5588C5.96933 21.0113 7.88864 21.9977 9.97631 22.3923C12.064 22.7868 14.2254 22.5704 16.189 21.7748C18.1527 20.9792 19.8348 19.635 21.0166 17.9088C22.1984 16.1825 22.8256 14.1537 22.8256 12.0743" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 6V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Password Reset Request</h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Security alert for your ${appName} account</p>
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 40px 32px; color: #1f2937; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="color: #dc2626; font-size: 22px; margin: 0 0 16px 0; font-weight: 600;">Hello ${name}! 🔐</h2>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 24px; color: #4b5563;">
            We received a request to reset the password for your <strong style="color: #dc2626;">${appName}</strong> account. If you made this request, click the button below to create a new password.
          </p>
          
          <!-- Alert Box -->
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 1px solid #fca5a5; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
            <div style="margin-bottom: 16px;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p style="font-size: 16px; margin: 0 0 12px 0; color: #dc2626; font-weight: 600;">⚠️ Security Notice</p>
            <p style="font-size: 14px; margin: 0; color: #991b1b;">This link will expire in <strong>15 minutes</strong> for your security</p>
          </div>

          <!-- Reset Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" target="_blank" style="
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
              color: white;
              font-weight: 600;
              padding: 18px 36px;
              border-radius: 12px;
              text-decoration: none;
              font-size: 16px;
              display: inline-block;
              box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
              ">
              <span style="position: relative; z-index: 1;">🔒 Reset My Password</span>
            </a>
          </div>

          <!-- Alternative Link -->
          <div style="margin: 32px 0; padding: 20px; background-color: #f8fafc; border-radius: 10px; border-left: 4px solid #dc2626;">
            <p style="font-size: 14px; margin: 0 0 12px 0; color: #6b7280; font-weight: 500;">
              <strong>Button not working?</strong> Copy and paste this link into your browser:
            </p>
            <div style="background-color: white; padding: 12px; border-radius: 8px; word-break: break-all; font-size: 13px; color: #dc2626; font-family: 'Courier New', monospace; border: 1px solid #e5e7eb;">
              ${resetUrl}
            </div>
          </div>

          <!-- Security Information -->
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; border-radius: 10px; padding: 20px; margin: 24px 0;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="flex-shrink: 0; margin-top: 2px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1d4ed8;">Security Tips</h3>
                <ul style="margin: 0; padding-left: 16px; color: #1e40af; font-size: 14px; line-height: 1.5;">
                  <li>Choose a strong password with at least 8 characters</li>
                  <li>Include uppercase, lowercase, numbers, and symbols</li>
                  <li>Don't reuse passwords from other accounts</li>
                  <li>Consider using a password manager</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Didn't Request Notice -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #86efac; border-radius: 10px; padding: 20px; margin: 24px 0; text-align: center;">
            <div style="margin-bottom: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p style="font-size: 14px; margin: 0; color: #15803d; font-weight: 500;">
              <strong>Didn't request this?</strong> Your account is safe. Simply ignore this email and your password will remain unchanged.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 24px 32px; border-top: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 16px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: white; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22S2 16 2 9C2 5.6863 4.68629 3 8 3C9.65685 3 11.1685 3.67157 12 4.82843C12.8315 3.67157 14.3431 3 16 3C19.3137 3 22 5.6863 22 9C22 16 12 22 12 22Z" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span style="color: #dc2626; font-weight: 600; font-size: 14px;">${appName} Security</span>
            </div>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0 0 8px 0;">&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            <div style="margin-top: 12px;">
              <a href="#" style="color: #dc2626; text-decoration: none; margin: 0 8px; font-weight: 500;">Security Center</a>
              <span style="color: #cbd5e1;">|</span>
              <a href="#" style="color: #dc2626; text-decoration: none; margin: 0 8px; font-weight: 500;">Privacy Policy</a>
              <span style="color: #cbd5e1;">|</span>
              <a href="#" style="color: #dc2626; text-decoration: none; margin: 0 8px; font-weight: 500;">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"${appName} Security Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🔐 Password Reset Request - ${appName}`,
    html: emailHtml,
  });
}
