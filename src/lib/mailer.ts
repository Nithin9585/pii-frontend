import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `http://localhost:3000/api/auth/confirm?token=${token}`;
  const appName = "Secure Docs";

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
      <div style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px rgba(102, 126, 234, 0.25); overflow: hidden; position: relative;">
        
        <!-- Decorative Top Border -->
        <div style="height: 6px; background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);"></div>
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%); padding: 40px 32px; text-align: center; color: white; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"1\" fill=\"white\" opacity=\"0.08\"/><circle cx=\"10\" cy=\"60\" r=\"1\" fill=\"white\" opacity=\"0.08\"/><circle cx=\"90\" cy=\"40\" r=\"1\" fill=\"white\" opacity=\"0.06\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>'); opacity: 0.3;"></div>
          
          <div style="position: relative; z-index: 1;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Account</h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Secure your access to ${appName}</p>
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 40px 32px; color: #1f2937; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="color: #1e40af; font-size: 22px; margin: 0 0 16px 0; font-weight: 600;">Welcome ${name}! 🎉</h2>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 24px; color: #4b5563;">
            Thank you for joining <strong style="color: #1e40af;">${appName}</strong>! You're just one step away from accessing our secure document management platform.
          </p>
          
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
            <div style="margin-bottom: 20px;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <path d="M12 15L12 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 15H12.01V15.01H12V15Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p style="font-size: 16px; margin: 0; color: #1e40af; font-weight: 500;">Click the button below to verify your email address and activate your account</p>
          </div>

          <!-- Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verificationUrl}" target="_blank" style="
              background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
              color: white;
              font-weight: 600;
              padding: 16px 32px;
              border-radius: 12px;
              text-decoration: none;
              font-size: 16px;
              display: inline-block;
              box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
              ">
              <span style="position: relative; z-index: 1;">✅ Verify My Email</span>
            </a>
          </div>

          <!-- Alternative Link -->
          <div style="margin: 32px 0; padding: 20px; background-color: #f8fafc; border-radius: 10px; border-left: 4px solid #3b82f6;">
            <p style="font-size: 14px; margin: 0 0 12px 0; color: #6b7280; font-weight: 500;">
              <strong>Button not working?</strong> Copy and paste this link into your browser:
            </p>
            <div style="background-color: white; padding: 12px; border-radius: 8px; word-break: break-all; font-size: 13px; color: #3b82f6; font-family: 'Courier New', monospace; border: 1px solid #e5e7eb;">
              ${verificationUrl}
            </div>
          </div>

          <!-- Security Notice -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 24px 0; text-align: center;">
            <div style="margin-bottom: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p style="font-size: 14px; margin: 0; color: #92400e; font-weight: 500;">
              🔒 <strong>Security Notice:</strong> If you didn't create this account, please ignore this email. This link will expire in 24 hours.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 24px 32px; border-top: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 16px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: white; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span style="color: #1e40af; font-weight: 600; font-size: 14px;">${appName}</span>
            </div>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0 0 8px 0;">&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            <div style="margin-top: 12px;">
              <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px; font-weight: 500;">Privacy Policy</a>
              <span style="color: #cbd5e1;">|</span>
              <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px; font-weight: 500;">Terms of Service</a>
              <span style="color: #cbd5e1;">|</span>
              <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px; font-weight: 500;">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"${appName} Security Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🔐 Verify Your ${appName} Account - Action Required`,
    html: htmlContent,
  });
}
