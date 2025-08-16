import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { orderData, sessionId } = req.body;
    const {
      customerName,
      customerEmail,
      socialPlatform,
      socialUsername,
      serviceType,
      selectedColors,
      comments,
      uploadedFilesCount,
      uploadedFileUrls,
    } = orderData;

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.NOTIFICATION_EMAIL_USER, // your email
        pass: process.env.NOTIFICATION_EMAIL_PASS, // your app password
      },
    });

    // Debug logging to see what we're receiving
    console.log("Received uploadedFileUrls:", uploadedFileUrls);
    console.log("Type of uploadedFileUrls:", typeof uploadedFileUrls);
    console.log("Full orderData:", orderData);

    // Ensure uploadedFileUrls is always an array of strings
    let fileUrls = [];

    if (Array.isArray(uploadedFileUrls)) {
      // If it's already an array, extract URLs from objects if needed
      fileUrls = uploadedFileUrls
        .map((item) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object" && item.url) return item.url;
          if (item && typeof item === "object" && item.originalName)
            return item.originalName; // fallback
          return String(item); // last resort
        })
        .filter((url) => url && url !== "undefined" && url !== "null");
    } else if (
      typeof uploadedFileUrls === "string" &&
      uploadedFileUrls.trim()
    ) {
      // If it's a string, split by comma
      fileUrls = uploadedFileUrls
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url && url !== "undefined" && url !== "null");
    }

    console.log("Processed fileUrls:", fileUrls);

    // Create file links HTML
    const fileLinksHtml =
      fileUrls.length > 0
        ? `
        <h3 style="color: #333; margin-bottom: 15px;">Reference Images (${
          uploadedFilesCount || fileUrls.length
        } files):</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${fileUrls
            .map(
              (url, index) => `
            <div style="margin-bottom: 15px; padding: 10px; background-color: white; border-radius: 3px;">
              <strong style="color: #333;">Image ${index + 1}</strong><br><br>
              <p style="margin: 10px 0;">
                <a href="${url}" style="color: #dc2626; font-weight: bold; font-size: 16px;">📸 CLICK HERE TO VIEW</a>
              </p>
              <p style="margin: 5px 0; font-size: 12px; color: #666;">
                Copy this URL if the link above doesn't work:<br>
                ${url}
              </p>
            </div>
          `
            )
            .join("")}
        </div>
      `
        : "<p>No reference images uploaded.</p>";

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">🥋 New Order - Karate Designs CN</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${customerName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${customerEmail}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Social Media:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${socialPlatform} - ${socialUsername}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${serviceType}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Colors:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${selectedColors}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Stripe Session:</strong></td><td style="padding: 8px 0;">${sessionId}</td></tr>
          </table>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Comments/Requirements:</h3>
          <p style="margin: 0; color: #333;">${
            comments || "No additional comments"
          }</p>
        </div>

        ${fileLinksHtml}

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="text-align: center; color: #666; font-size: 12px; margin: 0;">
          <small>This order was automatically generated from your Karate Designs CN website.</small>
        </p>
      </div>
    `;

    // Send email with both HTML and plain text versions for better compatibility
    await transporter.sendMail({
      from: process.env.NOTIFICATION_EMAIL_USER,
      to: "karatedesignscn@gmail.com", // your business email
      subject: `🎨 New Order: ${serviceType} - ${customerName}`,
      html: emailHtml,
      // Also include plain text version with clickable URLs
      text: `
🥋 New Order - Karate Designs CN

Order Details:
- Customer: ${customerName}
- Email: ${customerEmail}
- Social Media: ${socialPlatform} - ${socialUsername}
- Service: ${serviceType}
- Colors: ${selectedColors}
- Stripe Session: ${sessionId}

Comments/Requirements:
${comments || "No additional comments"}

${
  fileUrls.length > 0
    ? `Reference Images (${uploadedFilesCount || fileUrls.length} files):
${fileUrls.map((url, index) => `Image ${index + 1}: ${url}`).join("\n")}`
    : "No reference images uploaded."
}

This order was automatically generated from your website.
      `,
    });

    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Email notification error:", error);
    res.status(500).json({
      error: "Failed to send notification",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
