import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    // Parse the multipart form data
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 20 * 1024 * 1024, // 20MB
      filter: ({ mimetype }) => {
        // Only allow images
        return mimetype && mimetype.startsWith("image/");
      },
    });

    const [fields, files] = await form.parse(req);

    const customerName = Array.isArray(fields.customerName)
      ? fields.customerName[0]
      : fields.customerName || "Unknown";
    const orderId = Array.isArray(fields.orderId)
      ? fields.orderId[0]
      : fields.orderId || Date.now().toString();

    // Convert files object to array
    const fileArray = Object.values(files).flat();

    if (fileArray.length === 0) {
      return res.status(400).json({ error: "No valid image files provided" });
    }

    // Upload files to Vercel Blob
    const uploadPromises = fileArray.map(async (file, index) => {
      try {
        // Read file buffer
        const fileBuffer = await fs.readFile(file.filepath);

        // Create a clean filename
        const cleanFilename =
          file.originalFilename?.replace(/[^a-zA-Z0-9.-]/g, "_") ||
          `file_${index + 1}`;
        const filename = `orders/${orderId}/${index + 1}-${cleanFilename}`;

        // Upload to Vercel Blob
        const blob = await put(filename, fileBuffer, {
          access: "public",
          contentType: file.mimetype || "image/jpeg",
        });

        // Clean up temporary file
        try {
          await fs.unlink(file.filepath);
        } catch (unlinkError) {
          console.warn("Failed to delete temp file:", unlinkError);
        }

        return {
          originalName: file.originalFilename,
          filename: cleanFilename,
          url: blob.url,
          size: file.size,
          type: file.mimetype,
          uploadedAt: new Date().toISOString(),
        };
      } catch (error) {
        console.error(`Failed to upload ${file.originalFilename}:`, error);

        // Clean up temporary file on error
        try {
          await fs.unlink(file.filepath);
        } catch (unlinkError) {
          console.warn("Failed to delete temp file after error:", unlinkError);
        }

        return {
          originalName: file.originalFilename,
          error: "Upload failed: " + error.message,
        };
      }
    });

    const uploadResults = await Promise.all(uploadPromises);
    const successfulUploads = uploadResults.filter((result) => result.url);
    const failedUploads = uploadResults.filter((result) => result.error);

    return res.status(200).json({
      success: true,
      orderId: orderId,
      customerName: customerName,
      uploaded: successfulUploads,
      failed: failedUploads,
      totalUploaded: successfulUploads.length,
      totalFailed: failedUploads.length,
      message: `Successfully uploaded ${successfulUploads.length} out of ${fileArray.length} files`,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return res.status(500).json({
      error: "Failed to process file upload",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
