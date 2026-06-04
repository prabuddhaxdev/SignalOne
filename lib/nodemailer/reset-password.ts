import { transporter } from "@/lib/nodemailer";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendPasswordResetEmail = async ({
  email,
  name,
  resetUrl,
}: {
  email: string;
  name?: string | null;
  resetUrl: string;
}) => {
  try {
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    const firstName = name?.trim().split(" ")[0] || "there";
    const escapedFirstName = escapeHtml(firstName);
    const escapedResetUrl = escapeHtml(encodeURI(resetUrl));
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Reset Your SignalOne Password</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .dark-bg {
                background-color: #050505 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: #30333A !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 64px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/yoqpgz1jm/logo.png" alt="SignalOne Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Shield Icon & Header -->
                    <tr>
                        <td class="mobile-padding" style="padding: 10px 40px 0 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #212328; border-radius: 8px; padding: 24px;">
                                <tr>
                                    <td align="center">
                                        <!-- Shield Icon -->
                                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #FDD458 0%, #E8BA40 100%); border-radius: 50%; margin: 0 auto 16px auto; text-align: center; line-height: 56px; font-size: 28px;">
                                            🔐
                                        </div>
                                        <h1 class="mobile-title" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #FDD458; line-height: 1.2;">
                                            Reset Your Password
                                        </h1>
                                        <p style="margin: 0; font-size: 14px; color: #9095A1;">
                                            Secure your SignalOne account
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px 40px 40px 40px;">
                            
                            <!-- Greeting -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                Hi ${escapedFirstName},
                            </p>
                            
                            <!-- Message -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                We received a request to reset the password for your SignalOne account. Click the button below to create a new password and regain access to your market dashboard.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="${escapedResetUrl}" style="display: block; width: 100%; background: linear-gradient(135deg, #FDD458 0%, #E8BA40 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center; box-sizing: border-box;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Link Expiry Notice -->
                            <div style="background-color: #050505; border: 1px solid #30333A; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="vertical-align: top; padding-right: 12px; font-size: 18px; line-height: 1;">⏳</td>
                                        <td>
                                            <p class="mobile-text" style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #E8BA40;">
                                                This link expires in 1 hour
                                            </p>
                                            <p class="mobile-text" style="margin: 0; font-size: 13px; line-height: 1.5; color: #9095A1;">
                                                For security, the password reset link will only be valid for a limited time. If it expires, you can request a new one.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Security Info Box -->
                            <div style="background-color: #212328; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                                <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #CCDADC; text-transform: uppercase; letter-spacing: 0.5px;">
                                    🛡️ Security Tips
                                </h3>
                                <ul class="mobile-text" style="margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.8; color: #9095A1;">
                                    <li>Choose a strong, unique password</li>
                                    <li>Never share your password or this link</li>
                                    <li>SignalOne will never ask for your password via email</li>
                                </ul>
                            </div>
                            
                            <!-- Didn't Request Notice -->
                            <div style="border-top: 1px solid #30333A; padding-top: 20px;">
                                <p class="mobile-text" style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #CCDADC;">
                                    Didn't request this?
                                </p>
                                <p class="mobile-text" style="margin: 0; font-size: 14px; line-height: 1.6; color: #9095A1;">
                                    If you didn't request a password reset, you can safely ignore this email. Your account remains secure and no changes have been made.
                                </p>
                            </div>
                            
                            <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    SignalOne HQ, 200 Market Street, San Francisco, CA 94105
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    <a href="#" style="color: #CCDADC !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://signalone.vercel.app/" style="color: #CCDADC !important; text-decoration: underline;">Visit SignalOne</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    © 2025 SignalOne
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const info = await transporter.sendMail({
      from: `"SignalOne" <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "Reset your SignalOne password",
      text: `Reset your password: ${encodeURI(resetUrl)}`,
      html,
    });

    console.log("Password reset email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};
