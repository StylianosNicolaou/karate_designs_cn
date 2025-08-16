# 📧 Email Notification Setup Guide

Your order system will automatically send you email notifications with customer details and uploaded images. Here's how to set it up:

## 🔧 **Gmail Setup (Recommended)**

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password

1. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and your device
3. Copy the generated 16-character password

### Step 3: Add to Environment Variables

Add these to your `.env.local` file:

```env
NOTIFICATION_EMAIL_USER=karatedesignscn@gmail.com
NOTIFICATION_EMAIL_PASS=your-16-character-app-password-here
```

## 📋 **What You'll Receive**

When a customer places an order, you'll get an email with:

- ✅ Customer name and email
- ✅ Social media contact info
- ✅ Service type and color preferences
- ✅ Customer comments/requirements
- ✅ **Direct download links to all uploaded reference images**
- ✅ Stripe session ID for payment verification

## 🔄 **Alternative Email Services**

If you don't use Gmail, update the transporter in `/pages/api/send-order-notification.js`:

### For Outlook/Hotmail:

```javascript
service: "outlook";
```

### For Yahoo:

```javascript
service: "yahoo";
```

### For Custom SMTP:

```javascript
host: "your-smtp-host.com",
port: 587,
secure: false,
```

## 🚨 **Important Notes**

- Without email setup, orders will still work, but you won't get notifications
- Images are still accessible via Stripe dashboard metadata
- Test with a small order first to verify email delivery

## ✅ **Testing**

After setup, place a test order to verify:

1. Payment processes correctly
2. You receive the notification email
3. Image links in the email work properly
