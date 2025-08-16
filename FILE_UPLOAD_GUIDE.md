# 📁 File Upload System Guide

## 🎯 How You Receive Customer Images

When customers upload reference images through your order form, here's exactly how you'll receive them:

### **📧 Method 1: Direct File Links (Recommended)**

#### **Where to Find Images:**

1. **Stripe Dashboard**: Go to [Payments](https://dashboard.stripe.com/payments)
2. **Find the Order**: Click on any payment to view details
3. **Order Metadata**: Scroll to "Metadata" section
4. **File URLs**: Look for `uploadedFileUrls` field containing direct links

#### **Example Metadata:**

```json
{
  "customerName": "John Doe",
  "socialPlatform": "Instagram",
  "socialUsername": "johndoe_karate",
  "uploadedFilesCount": "3",
  "uploadedFileUrls": "[
    {
      \"originalName\": \"tournament_poster_ref.jpg\",
      \"url\": \"https://blob.vercel-storage.com/orders/order_123/1-tournament_poster_ref.jpg\",
      \"size\": 2048576,
      \"type\": \"image/jpeg\"
    }
  ]"
}
```

#### **Accessing Images:**

- **Click any URL** → Opens image directly in browser
- **Right-click** → Save image to your computer
- **Share with team** → URLs work for anyone

---

### **🗂️ Method 2: Organized File Storage**

#### **File Organization:**

```
📁 Vercel Blob Storage
  └── 📁 orders/
      └── 📁 order_1703123456789_abc123def/
          ├── 📄 1-reference_image.jpg
          ├── 📄 2-logo_inspiration.png
          └── 📄 3-color_scheme.jpg
```

#### **File Naming Convention:**

- **Format**: `{index}-{original_filename}`
- **Example**: `1-tournament_poster_ref.jpg`
- **Benefits**: Easy to identify order and sequence

---

### **⚡ Method 3: Email Notifications (Optional)**

If you set up email notifications, you'll receive:

#### **Email Contains:**

- 📋 Complete order details
- 👤 Customer information
- 🔗 Direct links to all uploaded images
- 💰 Payment confirmation
- 📝 Comments and requirements

#### **Setup Required:**

Add to your `.env.local`:

```env
NOTIFICATION_EMAIL_USER=your-email@gmail.com
NOTIFICATION_EMAIL_PASS=your-app-password
```

---

## 🛠️ Technical Details

### **File Storage:**

- **Service**: Vercel Blob Storage
- **Access**: Public URLs (secure, direct access)
- **Retention**: Permanent storage
- **Bandwidth**: Unlimited downloads

### **File Limits:**

- **Max Files**: 5 per order
- **Max Size**: 10MB per file
- **Types**: Images only (JPG, PNG, GIF, WebP)
- **Total**: Up to 50MB per order

### **Security:**

- ✅ Files stored securely on Vercel's CDN
- ✅ Public URLs but obscure paths
- ✅ No sensitive data in filenames
- ✅ Automatic virus scanning

---

## 📋 Step-by-Step: Accessing Customer Images

### **For Each New Order:**

1. **Check Email** (if notifications enabled)

   - Look for "🎨 New Order" emails
   - Click image links to view/download

2. **Or Check Stripe Dashboard**

   - Go to [Payments](https://dashboard.stripe.com/payments)
   - Find the recent payment
   - Click to view details
   - Scroll to "Metadata" section

3. **View Images**

   - Copy URLs from `uploadedFileUrls`
   - Paste in browser to view
   - Right-click to save locally

4. **Organize Files**
   - Create folder for each project
   - Save images with customer name
   - Reference order ID for tracking

---

## 💡 Pro Tips

### **For Design Workflow:**

1. **Create Project Folders**: One per order with customer name
2. **Download All Images**: Save locally for offline access
3. **Reference Order Details**: Keep Stripe metadata handy
4. **Track Progress**: Use order ID for file organization

### **Customer Communication:**

- **Confirm Receipt**: "We've received your X reference images"
- **Ask Questions**: "Could you clarify the color scheme in image 2?"
- **Share Progress**: "Here's the design based on your reference image 1"

### **File Management:**

```
📁 Projects/
  ├── 📁 2024-01-15_John_Doe_Tournament_Poster/
  │   ├── 📄 order_details.txt
  │   ├── 📄 ref_1_tournament_logo.jpg
  │   ├── 📄 ref_2_color_scheme.png
  │   └── 📄 final_design.psd
  └── 📁 2024-01-16_Sarah_Smith_Dojo_Banner/
      └── ...
```

---

## 🔧 Troubleshooting

### **Can't Access Images?**

1. **Check URL Format**: Should start with `https://blob.vercel-storage.com/`
2. **Try Different Browser**: Sometimes cache issues occur
3. **Check Stripe Metadata**: Ensure `uploadedFileUrls` field exists
4. **Contact Support**: If files seem missing

### **Images Not Uploading?**

1. **File Size**: Must be under 10MB each
2. **File Type**: Only images (JPG, PNG, GIF, WebP)
3. **Browser Issues**: Try different browser
4. **Network**: Check internet connection

### **Missing Orders?**

1. **Check Spam Folder**: Email notifications might be filtered
2. **Stripe Dashboard**: Always has complete record
3. **Payment Status**: Ensure payment completed successfully

---

## 🚀 Advanced Features

### **Bulk Download Script** (Optional)

Create a simple script to download all images for an order:

```javascript
// Save as download_order_images.js
const orderUrls = [
  "https://blob.vercel-storage.com/orders/order_123/1-ref.jpg",
  "https://blob.vercel-storage.com/orders/order_123/2-logo.png",
];

orderUrls.forEach((url, index) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `reference_${index + 1}`;
  link.click();
});
```

### **Integration with Design Tools**

- **Photoshop**: Drag URLs directly into PS
- **Figma**: Import images via URL
- **Canva**: Upload downloaded files
- **Illustrator**: Place linked files

---

## 📞 Support

### **For Technical Issues:**

- **Vercel Blob**: [Vercel Support](https://vercel.com/support)
- **Stripe**: [Stripe Support](https://support.stripe.com/)

### **For Implementation Help:**

- Check `/pages/api/upload-files.js` for upload logic
- Review `/pages/order.js` for form handling
- Examine Stripe metadata structure

---

## ✅ Quick Checklist

**For Each Order:**

- [ ] Check Stripe payment details
- [ ] Copy image URLs from metadata
- [ ] Download reference images
- [ ] Create project folder
- [ ] Confirm receipt with customer
- [ ] Start design work
- [ ] Reference order ID for communication

**Your customers' reference images are now automatically stored and easily accessible through direct URLs! 🎨✨**
