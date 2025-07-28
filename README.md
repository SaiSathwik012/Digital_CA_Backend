
This implementation provides a complete backend system for a Digital CA Platform with all the required features. The code follows RESTful API design principles, 
uses MVC architecture, and includes proper error handling and validation. The system supports both CA and Client roles with appropriate access control.

# Chartered Accountant Digitalization Platform - Backend

## Setup Instructions

1.Clone the repository
   git clone https://github.com/SaiSathwik012/Digital_CA_Backend.git
   cd ca-backend
2.Install dependencies
  npm install
3.Create a .env file in the root directory and add the following:
  MONGO_URI=your_mongo_uri
  JWT_SECRET=your_jwt_secret
  PORT=3000
4.Start the development server
  npm run dev
5.The API will be available at http://localhost:3000
  API Endpoints
Authentication
POST /api/auth/register - Register a new user (CA or Client)
POST /api/auth/login - Login user
GET /api/auth/profile - Get user profile

Client Management (CA only)
GET /api/clients - Get all clients
POST /api/clients - Create a new client
GET /api/clients/:id - Get a single client
PUT /api/clients/:id - Update a client
DELETE /api/clients/:id - Delete a client

Document Management (CA only)
GET /api/documents - Get all documents (optionally filter by clientId)
POST /api/documents - Upload a new document
GET /api/documents/:id - Get a single document
PUT /api/documents/:id - Update document metadata
DELETE /api/documents/:id - Delete a document

Invoice Management (CA only)
GET /api/invoices - Get all invoices (optionally filter by clientId or status)
POST /api/invoices - Create a new invoice
GET /api/invoices/:id - Get a single invoice
PUT /api/invoices/:id - Update an invoice
DELETE /api/invoices/:id - Delete an invoice

Compliance Alerts (CA only)
GET /api/alerts - Get all alerts (optionally filter by clientId or status)
POST /api/alerts - Create a new alert
GET /api/alerts/:id - Get a single alert
PUT /api/alerts/:id - Update an alert
DELETE /api/alerts/:id - Delete an alert
