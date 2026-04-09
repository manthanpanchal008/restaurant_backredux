const nodemailer = require('nodemailer');


const sendEmail = async(email,otp) => {

  const otptemplate = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
        
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:40px; border-radius:10px; overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:#0d6efd; color:#fff; padding:20px; text-align:center;">
                    <h2 style="margin:0;">CaterServ</h2>
                    <p style="margin:5px 0 0;">Account Verification</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px; text-align:center;">
                    
                    <h3>Verify Your Email</h3>
                    
                    <p style="color:#555;">
                      Use the OTP below to complete your registration.
                    </p>

                    <!-- OTP -->
                    <div style="margin:30px 0;">
                      <span style="
                        display:inline-block;
                        font-size:28px;
                        letter-spacing:8px;
                        font-weight:bold;
                        color:#0d6efd;
                        background:#f1f5ff;
                        padding:15px 25px;
                        border-radius:8px;
                      ">
                        ${otp}
                      </span>
                    </div>

                    <p style="color:#777; font-size:13px;">
                      This OTP is valid for 5 minutes. Do not share it with anyone.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f9fa; text-align:center; padding:15px; font-size:12px; color:#888;">
                    © 2026 CaterServ. All rights reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD, // app password
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: "OTP Verification",
        html: otptemplate
      };
    //   mzfu nggs ignf ovvt
      await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;