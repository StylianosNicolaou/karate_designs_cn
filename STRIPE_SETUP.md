# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for the Karate Designs CN order system.

## 🔧 Prerequisites

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

## 🔑 Environment Configuration

Create a `.env.local` file in the project root with the following variables:

```env
# Stripe Configuration
# Test Mode Keys (for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Production Keys (for live site)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
# STRIPE_SECRET_KEY=sk_live_your_secret_key_here

# Your domain for success/cancel URLs
NEXT_PUBLIC_DOMAIN=http://localhost:3000  # Change to your production domain

# Optional: EmailJS (if you want email notifications too)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

## 🚀 Getting Your Stripe Keys

### Test Mode (Development)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy the **Publishable key** (starts with `pk_test_`)
3. Copy the **Secret key** (starts with `sk_test_`)

### Live Mode (Production)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Toggle to "Live mode"
3. Copy the **Publishable key** (starts with `pk_live_`)
4. Copy the **Secret key** (starts with `sk_live_`)

## 💰 Service Pricing

Current pricing is configured in `/pages/api/create-checkout-session.js`:

### Poster Design

- Tournament Poster: €100
- Seminar Poster: €90
- Team Poster: €80
- Custom Poster: €100

### Banner Design

- Event Banner: €150
- Dojo Banner: €130
- Competition Banner: €140

### Logo Design

- Dojo Logo: €150
- Tournament Logo: €150
- Personal Brand Logo: €130

### Package Deals

- Event Branding Package: €250
- Dojo Starter Pack: €350
- Athlete Highlight Pack: €180
- Tournament Promo Pack: €400

## 🔄 Order Flow

1. **User fills order form** → Selects service, provides details, colors
2. **Form submission** → Creates Stripe checkout session via API
3. **Stripe Checkout** → Secure payment processing
4. **Success redirect** → Payment confirmation page with order details
5. **Order fulfillment** → Manual process based on order metadata

## 📊 Order Management

### Viewing Orders

- **Stripe Dashboard**: [Payments](https://dashboard.stripe.com/payments) - View all transactions
- **Order Details**: Stored in Stripe metadata including:
  - Customer name and email
  - Social media platform and username (Instagram/Facebook)
  - Selected colors
  - Comments/requirements
  - Service type
  - Reference images count and file details

### Customer Communication

- Use customer email from Stripe session
- Reference order ID for customer support
- All design requirements stored in metadata

## 🔐 Security Features

- ✅ Secure payment processing via Stripe
- ✅ No card details stored on your server
- ✅ PCI compliance handled by Stripe
- ✅ Fraud protection and 3D Secure
- ✅ Customer email verification

## 🛠 Testing

### Test Card Numbers

Use these test cards in development:

```
Success: 4242 4242 4242 4242
Declined: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

Any future date for expiry, any 3-digit CVC.

## 📱 Features Included

### Order Form

- Service selection with pricing
- Customer information collection
- Color scheme preferences
- Comments/requirements
- Real-time price display

### Payment Processing

- Secure Stripe Checkout
- Multiple payment methods
- International card support
- Mobile-optimized checkout

### Success Page

- Payment verification
- Order details display
- Next steps information
- Customer support contact

## 🌐 Production Deployment

1. **Update environment variables** with live Stripe keys
2. **Set production domain** in `NEXT_PUBLIC_DOMAIN`
3. **Test with real cards** (start with small amounts)
4. **Monitor Stripe Dashboard** for incoming orders

## 📞 Support

For Stripe-related issues:

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)

For implementation questions:

- Check the code in `/pages/api/create-checkout-session.js`
- Review the order form in `/pages/order.js`
- Examine success page in `/pages/order-success.js`

## 🎯 Next Steps

1. **Set up your Stripe account**
2. **Add your API keys to `.env.local`**
3. **Test with development keys**
4. **Customize pricing if needed**
5. **Deploy with production keys**

Your customers can now place orders and pay securely through your website! 🥋✨
