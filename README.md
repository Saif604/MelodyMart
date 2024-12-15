# MERN Stack E-Commerce Website

## Overview
This project is a fully responsive e-commerce website built with the MERN stack, designed for music lovers and artists to browse and purchase various musical instruments. It includes a comprehensive user dashboard, product management system, and admin portal, all with seamless backend and frontend integration.

---

## Features
### **User Features**

#### **General Pages**
- **Home Page**: A visually appealing homepage introducing the website.
- **Products Page**:
  - Displays all products with filters, sorting, and pagination.
  - All filtering, sorting, and pagination are implemented via the backend, while the frontend focuses on UI.

#### **Authentication**
- **Login/Register Page**: Users can register and log in to access additional features.

#### **Dashboard**
- **Profile Page**:
  - View and edit user details (name and password).
  - Displays:
    - Number of orders per month.
    - Money spent per month.
    - Money spent on each brand (via FusionCharts).
- **Products Page**:
  - View all products.
  - Click on a specific product to view detailed information, including reviews.
  - Add reviews and items to the cart.
- **Cart Page**:
  - View added items.
  - Adjust quantities or remove items.
  - Proceed to checkout and simulate payment using Razorpay in test mode.
- **Orders Page**: View all orders and their details.
- **Review Page**: Edit or delete reviews created by the user.

### **Admin Features**
- **All Users**: View a list of all registered users.
- **All Orders**: View all placed orders.
- **All Products**: Manage all products (view, edit, delete).
- **Add Product**: Add new products to the database via a dedicated form.

---

## Skills and Technologies Used

### **Frontend**
- **React**: Built the entire frontend using React.
- **Formik**: For form handling and frontend validation (using Yup).
- **React-Bootstrap**: For layout and responsive design.
- **Redux Toolkit**: Managed state across the application.

### **Backend**
- **Node.js**: Developed the backend server.
- **Express.js**: For routing and handling API requests.

### **Other Tools**
- **Razorpay**: Integrated for payment processing.
- **Cloudinary**: For image uploads and management.

---

## Routes

### **Auth Routes**
- `POST https://melodymart-q5w2.onrender.com/api/v1/auth/login`: Login user.
- `POST https://melodymart-q5w2.onrender.com/api/v1/auth/register`: Register user.
- `POST https://melodymart-q5w2.onrender.com/api/v1/auth/logout`: Logout user.

### **Product Routes**
- `GET https://melodymart-q5w2.onrender.com/api/v1/products`: Get all products (available to all users).
- `GET https://melodymart-q5w2.onrender.com/api/v1/products/:id`: Get a single product (available to all users).
- `POST https://melodymart-q5w2.onrender.com/api/v1/products`: Create a new product (admin only).
- `PATCH https://melodymart-q5w2.onrender.com/api/v1/products/:id`: Update a product (admin only).
- `DELETE https://melodymart-q5w2.onrender.com/api/v1/products/:id`: Delete a product (admin only).

### **User Routes**
- `GET https://melodymart-q5w2.onrender.com/api/v1/users`: Get all users (admin only).
- `GET https://melodymart-q5w2.onrender.com/api/v1/users/:id`: Get a single user (logged-in user only).
- `GET https://melodymart-q5w2.onrender.com/api/v1/users/showMe`: Get current logged-in user.
- `PATCH https://melodymart-q5w2.onrender.com/api/v1/users/updateUser`: Update current user details.
- `PATCH https://melodymart-q5w2.onrender.com/api/v1/users/updateUserPassword`: Update current user password.

### **Order Routes**
- `GET https://melodymart-q5w2.onrender.com/api/v1/orders`: Get all orders (admin only).
- `GET https://melodymart-q5w2.onrender.com/api/v1/orders/showAllMyOrders`: Get orders for the current logged-in user.
- `GET https://melodymart-q5w2.onrender.com/api/v1/orders/:id`: Get a single order (user).
- `POST https://melodymart-q5w2.onrender.com/api/v1/orders`: Create a new order (user).
- `PATCH https://melodymart-q5w2.onrender.com/api/v1/orders`: Update order (user).
- `POST https://melodymart-q5w2.onrender.com/api/v1/orders/verifyPayment`: Verify Razorpay payment.

### **Review Routes**
- `POST https://melodymart-q5w2.onrender.com/api/v1/reviews`: Create a review (logged-in user only).
- `GET https://melodymart-q5w2.onrender.com/api/v1/reviews`: Get all reviews.
- `GET https://melodymart-q5w2.onrender.com/api/v1/reviews/:id`: Get a single review.
- `PATCH https://melodymart-q5w2.onrender.com/api/v1/reviews/:id`: Update a review (only by the creator).
- `DELETE https://melodymart-q5w2.onrender.com/api/v1/reviews/:id`: Delete a review (only by the creator).
- `GET https://melodymart-q5w2.onrender.com/api/v1/reviews/showAllMyReviews`: Get all reviews by the current user.

---

## Key Learnings
1. **Formik and Validation**: Leveraged Formik for efficient form handling and validation using Yup.
2. **Bootstrap Implementation**: Designed responsive layouts using React-Bootstrap.
3. **Payment Integration**: Successfully implemented payment functionality with Razorpay.
4. **Complex Redux Setup**: Managed complex state across the application using Redux Toolkit.
5. **Image Uploads**: Implemented image uploads and management with Cloudinary.

---

## Getting Started
### **Prerequisites**
- Node.js
- MongoDB
- Razorpay account for payment setup
- Cloudinary account for image uploads

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Saif604/MelodyMart.git
   ```
2. Install dependencies:
   ```bash
   npm install
   npm install --prefix client
   ```
3. Set up environment variables in `.env` (both in the root and client directories).
4. Build the frontend:
   ```bash
   npm run build-client
   ```
5. Start the server:
   ```bash
   npm start
   ```

---
