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
      totalItems,
      totalAmount,
      cartItems,
    } = orderData;

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.NOTIFICATION_EMAIL_USER, // your email
        pass: process.env.NOTIFICATION_EMAIL_PASS, // your app password
      },
    });

    // Generate cart items HTML
    const cartItemsHtml =
      cartItems && cartItems.length > 0
        ? cartItems
            .map((item) => {
              // Function to get files for a specific section
              const getFilesForSection = (sectionIndex) => {
                const sectionFiles =
                  item.uploadedFiles?.filter(
                    (file) => file.sectionIndex === sectionIndex
                  ) || [];
                if (sectionFiles.length === 0) return "";

                return `<p><strong>Reference Files (${
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
               </ul>`;
              };

              // Generate sections for each item (when quantity > 1)
              let sectionsHtml = "";
              for (let i = 0; i < item.quantity; i++) {
                const sectionNumber = i + 1;
                const serviceName =
                  item.serviceName ||
                  item.serviceId
                    ?.replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase()) ||
                  "Unknown Service";
                const sectionTitle =
                  item.quantity > 1
                    ? `${serviceName} #${sectionNumber}`
                    : serviceName;

                sectionsHtml += `
                   <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #dc2626;">
                     <h4 style="color: #333; margin: 0 0 10px 0;">${sectionTitle}</h4>
                     ${
                       item.designPreferences?.[`colorScheme_${i}`]
                         ? `<p><strong>Color Scheme:</strong> ${
                             item.designPreferences[`colorScheme_${i}`]
                           }</p>`
                         : ""
                     }
                     ${
                       item.designPreferences?.[`colorScheme_${i}`] ===
                         "custom" &&
                       item.designPreferences?.[`customColor1_${i}`]
                         ? `<p><strong>Custom Colors:</strong> Background: ${
                             item.designPreferences[`customColor1_${i}`]
                           }, Accent: ${
                             item.designPreferences[`customColor2_${i}`] ||
                             "Not specified"
                           }</p>`
                         : ""
                     }
                     ${
                       item.designPreferences?.[`comments_${i}`]
                         ? `<p><strong>Additional Comments:</strong> ${
                             item.designPreferences[`comments_${i}`]
                           }</p>`
                         : ""
                     }
                     ${getFilesForSection(i)}
                   </div>
                 `;
              }

              return sectionsHtml;
            })
            .join("")
        : "<p>No items in order</p>";

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
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Items:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${totalItems}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Amount:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">€${(
              totalAmount / 100
            ).toFixed(2)}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Stripe Session:</strong></td><td style="padding: 8px 0;">${sessionId}</td></tr>
          </table>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Items & Requirements:</h3>
          ${cartItemsHtml}
        </div>

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
      subject: `🎨 New Order: ${totalItems} items - ${customerName}`,
      html: emailHtml,
      // Also include plain text version
      text: `
🥋 New Order - Karate Designs CN

Order Details:
- Customer: ${customerName}
- Email: ${customerEmail}
- Social Media: ${socialPlatform} - ${socialUsername}
- Total Items: ${totalItems}
- Total Amount: €${(totalAmount / 100).toFixed(2)}
- Stripe Session: ${sessionId}

Order Items:
${
  cartItems && cartItems.length > 0
    ? cartItems
        .map(
          (item, index) => `
${index + 1}. ${item.serviceId
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())} (Qty: ${item.quantity})
   ${
     item.designPreferences?.notes
       ? `Notes: ${item.designPreferences.notes}`
       : ""
   }
   ${
     item.designPreferences?.colors
       ? `Colors: ${item.designPreferences.colors}`
       : ""
   }
   ${
     item.designPreferences?.specialRequirements
       ? `Special Requirements: ${item.designPreferences.specialRequirements}`
       : ""
   }
   ${
     item.uploadedFiles && item.uploadedFiles.length > 0
       ? `Reference Files: ${item.uploadedFiles
           .map((file) => file.url)
           .join(", ")}`
       : "No reference files"
   }
  `
        )
        .join("")
    : "No items in order"
}

This order was automatically generated from your Karate Designs CN website.
      `,
    });

    console.log("Order notification email sent successfully");

    res.status(200).json({
      success: true,
      message: "Order notification sent",
    });
  } catch (error) {
    console.error("Failed to send order notification:", error);
    res.status(500).json({
      error: "Failed to send notification",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
