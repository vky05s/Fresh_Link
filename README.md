# Fresh_Link
A responsive web app connecting Indian street vendors, farmers, and delivery partners for fresh ingredient sourcing. Compare prices, order produce/dairy, chat in real time, and track deliveries—all in a simple, mobile-friendly dashboard.

## Table of Contents

- Project Overview
- Features & User Flows
  - 1. Authentication & Onboarding
  - 2. Role-Based Dashboards
  - 3. Vendor (Buyer) Features
  - 4. Seller (Farmer) Features
  - 5. Delivery Partner Features
  - 6. Chat & Communication directly with Seller
- Visual Style and User Experience (UI/UX)
- Technology Stack and Folder Structure
- How the App Works
- Setup & Running Instructions
- Hackathon Notes and Customization
- Credits

## Project Overview

This web app provides a direct digital bridge between Indian street vendors, farmers, and delivery partners for efficient, transparent, and trustworthy sourcing of fresh vegetables, fruits, and dairy products. By eliminating unreliable middlemen, it enables vendors to compare prices, order produce in bulk or by weight, schedule convenient deliveries, and communicate directly with suppliers—all through an accessible, responsive interface built for real-world conditions and devices. The app is inspired by BigBasket’s marketplace, but optimized for the specific and vital needs of street vendors.

## Features & User Flows

### 1. Authentication & Onboarding

- **Landing Page**:
  - Clean, mobile-first page with options to Sign In or Sign Up.
- **Sign Up Flow**:
  - Step 1: Enter first name and last name.
  - Step 2: Enter phone number.
  - Step 3: Enter OTP for verification.
  - Step 4: After verification, choose your role: Buyer (Vendor), Seller (Farmer), or Delivery Partner in a pop-up modal.
- **Sign In Flow**:
  - Enter phone number and receive OTP for quick, secure login.

> This flow is beginner-friendly, reduces friction, and uses multi-step logic for clear guidance.

### 2. Role-Based Dashboards

After authentication and role selection, users land on customized dashboards:

- **Vendors** see product listings, categories, cart, and order tracking.
- **Sellers** have product management, order history, and notifications.
- **Delivery Partners** handle tasks, accept/reject deliveries, and view earnings.

Dashboards present quick actions, order status, and personalized greetings, and are optimized for minimal clicks.

### 3. Vendor (Buyer) Features

- **Home**: Welcome message and quick access to frequently ordered products.
- **Shop Categories**: Vegetable, fruit, and dairy products are easily accessible via tabs. Each product displays:
  - Multiple sellers, seller ratings, price per unit (gram/kg/liter), stock info.
  - *Price comparison table*: See prices from all sellers for the same product.
  - Choose quantity with dynamic discount display. Promote bulk ordering.
  - Add to cart or instantly reorder past purchases.
- **Cart**:
  - Review orders, change quantities, see dynamic pricing and apply discounts.
  - Place an order and select/schedule a delivery slot.
- **Order Tracking**:
  - Track your placed orders in real time (with delivery slot and ETA).
- **Feedback & Rating**:
  - After delivery, vendors are prompted to give feedback, which is sent automatically to sellers, ensuring quality and accountability.

### 4. Seller (Farmer) Features

- **Product Management**:
  - List new products easily with image/camera upload.
  - Set price/unit and quantity. Update current stock with a click.
- **Order History**:
  - View and manage new, pending, and completed orders.
  - Generate digital receipts for every transaction.
- **Notifications**:
  - Instant alerts for new orders or chat requests.
- **Pricing & Stock Controls**:
  - Adjust rates and available quantity for each product on the fly.
- **Chat Box**:
  - Persistent, always-visible chat window for handling vendor queries or negotiation.

### 5. Delivery Partner Features

- **Order List**:
  - Manage incoming assignments from both vendors and sellers.
  - Accept or reject orders.
- **Task Tracking**:
  - Track pickup/delivery status, update task workflows instantly.
  - View earnings, delivery stats, and performance.

### 6. Chat & Communication

- Every user has access to a real-time chatbox, anchored at the bottom left corner, to support vendor-to-seller discussion, price negotiation, order questions, and feedback.
- Chat is integrated throughout dashboards for continued transparency and fast communication.

## Visual Style and User Experience (UI/UX)

- **Mobile-First & Responsive**: Layouts adapt gracefully to phones, tablets, and desktop, ensuring usability on any device.
- **Color-Coded Navigation**: Roles, alerts, and actions use consistent color themes.
- **Big, Tappable Controls**: Especially important for vendors/farmers using smartphones.
- **Image-Heavy Product Cards**: Products are shown with attractive photos.
- **Category Tabs and Bottom Navigation**: Single-tap switching between Vegetables, Fruits, Dairy, Cart, Orders.
- **Stateful Feedback**: All actions (add to cart, reorder, chat, submit feedback) give clear visual responses.

## Technology Stack and Folder Structure

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks for simplicity and hackathon speed).
- **Styling**: CSS (with utility classes and gradients, color codes for branding).
-" **Backend** (optional/demo): Node.js with Express, with in-memory arrays or JSON files for persistence (no full database required)."
- **Images**: Backgrounds/images featuring fresh market produce (1920x1080 for landing), product photos, icons.
- **Chat**: Demo logic for chat box; can be expanded to real-time communication with additional backend setup.

**Folder Structure:**
```
/public
  index.html         // Main HTML structure, all pages & modals
  styles.css         // Styling for landing/auth/dashboard
  script.js             // All JS logic (navigation, state, flows)
  /images            // Images: vegetables, fruits, dairy, icons
README.md
```
---

## How the App Works

1. **User lands on the homepage.**
2. **Signs up or signs in** via multi-step form and OTP.
3. **Role selection modal** determines dashboard: Vendor, Seller, Delivery.
4. **Vendors**: 
   - Shop by browsing categories, compare prices, add to cart with weight/discount options.
   - Place and track orders, rate sellers after delivery.
5. **Sellers**:
   - List products, update availability, receive new orders/notifications, manage inventory.
   - Chat and send digital receipts.
6. **Delivery Partners**:
   - Accept/reject delivery/pickup tasks and view ongoing/completed tasks.
7. **All users**: Use chat for communication, see dynamic UI relevant to their role, and enjoy seamless navigation and real-time feedback.

## Setup & Running Instructions

**Frontend-Only Demo:**
1. Download/clone the project.
2. Add your images to `/public/images/`.
3. Open `/public/index.html` in your browser—no build required.


## Hackathon Notes and Customization

- The app is designed for fast prototyping in a 48-hour hackathon.
- All UI logic is in a single page/app, making it easy to customize or extend.
- Easily swap or add new product images in `/images/`.
- Background images are royalty-free and optimized for a welcoming, market-like look.
- Ready for rapid presentation: demo user flows for all three roles on any device.

*Need to extend?* Add backend authentication, real-time WebSocket chat, or payment processing post-hackathon.

## Credits

Built with ❤️ for Indian street vendors, farmers, and delivery partners.  
Design logic, UI flows, and feature strategy inspired by the needs of local markets and the operational simplicity of BigBasket.

If you need further customization, want deployment tips, or would like to add screenshots, project badges, or step-by-step walkthroughs, feel free to ask!


[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/81643340/13b82ff8-f858-467a-9f6a-b01c513b649d/index.html

[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/81643340/c35ebdcd-0f8a-4bd0-b339-b344d55ae617/script.js 

[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/81643340/42e11225-5afc-4140-b9a9-d58bb1cb4743/style.css
