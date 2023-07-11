# Multi-Vendor-Infographic-Submission

Authentication Endpoints:

POST /signin - User login endpoint.
POST /signup - User registration endpoint.
POST /logout - User logout endpoint. =>working with browser side
GET /getAllData - get all users availble in the database and all see data by admin only
Vendor Endpoints:

GET /vendors - Get a list of all vendors.
GET /vendors/:id - Get details of a specific vendor.
POST /vendors - Create a new vendor account.
PUT /vendors/:id - Update vendor account details.
DELETE /vendors/:id - Delete a vendor account.
Category Endpoints:

GET /categories - Get a list of all categories.
GET /categories/:id - Get details of a specific category.
POST /categories - Create a new category.
PUT /categories/:id - Update category details.
DELETE /categories/:id - Delete a category.
Content Endpoints:

GET /contents - Get a list of all contents.
GET /contents/:id - Get details of a specific content.
POST /contents - Upload new content.
PUT /contents/:id - Update content details.
DELETE /contents/:id - Delete a content.
Payment Endpoints:

POST /payments - Initiate a payment transaction.
GET /payments/invoices - Get a list of invoices.
GET /payments/invoices/:id - Get details of a specific invoice.
