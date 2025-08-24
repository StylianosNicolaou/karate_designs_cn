import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { orderData, sessionId } = req.body;
    const { customerEmail, socialPlatform, socialUsername, cartItems } =
      orderData;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NOTIFICATION_EMAIL_USER,
        pass: process.env.NOTIFICATION_EMAIL_PASS,
      },
    });

    // Generate order details from cart items
    const orderDetailsHtml =
      cartItems
        ?.map((item) => {
          const serviceName =
            item.serviceName ||
            item.serviceId
              ?.replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()) ||
            "Unknown Service";
          const totalFiles = item.uploadedFiles?.length || 0;

          // Generate design preferences for each section
          const sectionsHtml = [];
          for (let i = 0; i < item.quantity; i++) {
            const colorScheme =
              item.designPreferences?.[`colorScheme_${i}`] || "Not specified";
            const comments =
              item.designPreferences?.[`comments_${i}`] ||
              "No additional comments";
            const customColor1 =
              item.designPreferences?.[`customColor1_${i}`] || "";
            const customColor2 =
              item.designPreferences?.[`customColor2_${i}`] || "";

            // Get files for this specific section
            const sectionFiles =
              item.uploadedFiles?.filter((file) => file.sectionIndex === i) ||
              [];
            const filesHtml =
              sectionFiles.length > 0
                ? `<p><strong>Reference Files (${
                    sectionFiles.length
                  }):</strong></p>
                 <ul style="margin: 10px 0; padding-left: 20px;">
                   ${sectionFiles
                     .map(
                       (file) =>
                         `<li><a href="${
                           file.url
                         }" target="_blank" style="color: #dc2626; text-decoration: none;">${
                           file.name || "View File"
                         }</a></li>`
                     )
                     .join("")}
                 </ul>`
                : "";

            sectionsHtml.push(`
          <div style="margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <h4 style="color: #333; margin-top: 0;">${serviceName} #${
              i + 1
            }:</h4>
            <p><strong>Color Scheme:</strong> ${colorScheme}</p>
            ${
              customColor1 && customColor2
                ? `<p><strong>Custom Colors:</strong> ${customColor1}, ${customColor2}</p>`
                : ""
            }
            <p><strong>Comments:</strong> ${comments}</p>
            ${filesHtml}
          </div>
        `);
          }

          return `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">${serviceName} (Quantity: ${
            item.quantity
          })</h3>
          ${sectionsHtml.join("")}
          <p><strong>Reference Files:</strong> ${totalFiles} file${
            totalFiles !== 1 ? "s" : ""
          }</p>
        </div>
      `;
        })
        .join("") || "<p>No order details available.</p>";

    // Generate file links HTML
    const allFiles =
      cartItems?.flatMap((item) => item.uploadedFiles || []) || [];
    const fileLinksHtml =
      allFiles.length > 0
        ? `
        <h3 style="color: #333; margin-bottom: 15px;">Your Reference Files (${
          allFiles.length
        } files):</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${allFiles
            .map(
              (file, index) => `
            <div style="margin-bottom: 15px; padding: 10px; background-color: white; border-radius: 3px;">
              <strong style="color: #333;">File ${index + 1}: ${
                file.name || `File ${index + 1}`
              }</strong><br><br>
              <p style="margin: 10px 0;">
                <a href="${
                  file.url
                }" style="color: #dc2626; font-weight: bold; font-size: 16px;">📸 VIEW YOUR UPLOADED FILE</a>
              </p>
              <p style="margin: 5px 0; font-size: 12px; color: #666;">
                Copy this URL if the link above doesn't work:<br>
                ${file.url}
              </p>
            </div>
          `
            )
            .join("")}
        </div>
      `
        : "<p>No reference files were uploaded with this order.</p>";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">🥋 Order Confirmation - Karate Designs CN</h2>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <h3 style="color: #333; margin-top: 0;">🎉 Thank you for your order!</h3>
          <p style="margin: 0; color: #333; font-size: 16px;">
            Your payment has been processed successfully. We'll start working on your design within 24 hours.
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Order ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sessionId}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Social Media:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${socialPlatform} - ${socialUsername}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Total Files:</strong></td><td style="padding: 8px 0;">${allFiles.length} files</td></tr>
          </table>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Order Items:</h3>
          ${orderDetailsHtml}
        </div>

        ${fileLinksHtml}

        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📞 What's Next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px; color: #333;">
            <li>We'll review your requirements and reference images</li>
            <li>You'll receive a first draft within 24-48 hours</li>
            <li>We'll work with you on any revisions needed</li>
            <li>Final files will be delivered in high-resolution formats</li>
          </ul>
        </div>

        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">💬 Need to make changes?</h3>
          <p style="margin: 0; color: #333;">
            Reply to this email or contact us at <a href="mailto:karatedesignscn@gmail.com" style="color: #dc2626;">karatedesignscn@gmail.com</a> if you need to modify your order.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="text-align: center; color: #666; font-size: 12px; margin: 0;">
          <small>Thank you for choosing Karate Designs CN! 🥋</small>
        </p>
      </div>
    `;

    // Send email with both HTML and plain text versions
    await transporter.sendMail({
      from: process.env.NOTIFICATION_EMAIL_USER,
      to: customerEmail,
      subject: `🥋 Order Confirmation - Karate Designs CN`,
      html: emailHtml,
      text: `
🥋 Order Confirmation - Karate Designs CN

🎉 Thank you for your order! Your payment has been processed successfully.

Order Details:
- Order ID: ${sessionId}
- Social Media: ${socialPlatform} - ${socialUsername}
- Total Files: ${allFiles.length} files

Your Order Items:
${
  cartItems
    ?.map((item) => {
      const serviceName =
        item.serviceName ||
        item.serviceId
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()) ||
        "Unknown Service";
      return `${serviceName} (Quantity: ${item.quantity})`;
    })
    .join("\n") || "No order details available"
}

${
  allFiles.length > 0
    ? `Your Reference Files (${allFiles.length} files):
${allFiles
  .map(
    (file, index) =>
      `File ${index + 1}: ${file.name || `File ${index + 1}`} - ${file.url}`
  )
  .join("\n")}`
    : "No reference files were uploaded with this order."
}

📞 What's Next?
- We'll review your requirements and reference images
- You'll receive a first draft within 24-48 hours
- We'll work with you on any revisions needed
- Final files will be delivered in high-resolution formats

💬 Need to make changes?
Reply to this email or contact us at karatedesignscn@gmail.com

Thank you for choosing Karate Designs CN! 🥋
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Customer confirmation sent" });
  } catch (error) {
    console.error("Customer confirmation email error:", error);
    res.status(500).json({
      error: "Failed to send customer confirmation",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
