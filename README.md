# Pollify

## Introduction
Pollify is a dynamic polling platform that allows users to create polls using templates like MCQ, True or False, and Ranging. Users can attend and share polls, while poll creators can view results through various graphs, including bar, radar, and pie charts. The platform features user authentication and an admin panel for managing polls and users, making it a comprehensive solution for interactive polling and data analysis.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://pollify-1.onrender.com <br/>
Backend: https://pollify-yc1z.onrender.com  <br/>
Database: https://cloud.mongodb.com/v2/669ba4d751ed8d405bef6e9c#/metrics/replicaSet/669ba59a88e68a4dfe588301/explorer/test/customers/find

## Directory Structure
![image](https://github.com/user-attachments/assets/f9dd8e4f-adca-463d-b446-45c3ad7e33fc) ![image](https://github.com/user-attachments/assets/68268298-ac19-4b29-8e7e-2969e44a9009)
![image](https://github.com/user-attachments/assets/f3a8b3ca-26fd-4175-9420-81fb6531a0f4)



## Video Walkthrough of the project
https://youtu.be/_L5w0eLdJkA

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features

- **User Authentication**: Secure login and registration system.
- **Poll Creation**: Create multiple types of polls (MCQ, Quiz, Rating Scale, True/False).
- **Real-time Updates**: Live updates of poll results using WebSockets.
- **Role-based Access Control**: Different roles such as admin, poll creator, and normal user.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Visualization**: Visual representation of poll results using charts and graphs.

## design decisions or assumptions
List your design desissions & assumptions

## Installation & Getting started

Follow these steps to set up and run the project locally:

# Usage Guide
## Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (version 14 or higher)
NPM (Node Package Manager, comes with Node.js)
MongoDB (either installed locally or using MongoDB Atlas)
Installation
1. Clone the Repository
Begin by cloning the repository to your local machine:

```bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
2. Install Backend Dependencies
Navigate to the backend directory and install the necessary dependencies:

```bash
Copy code
cd backend
npm install
```
3. Install Frontend Dependencies
Next, move to the frontend directory and install the necessary dependencies:

```bash
Copy code
cd ../frontend
npm install
```
Configuration
1. Environment Variables
For the backend, create a .env file in the backend directory with the following content:

```plaintext
Copy code
PORT=2300
MONGO_URL="your DB_url"
JWT_SECRET="polli" //any text
JWT_REFRESH_SECRET="refreshpolli" //any text
USER_EMAIL="babakhalilmalyam2@gmail.com" //your email 
EMAIL_PASSWORD=""
SESSION_SECRET="Hellosession" 
EMAIL_USER="babakhalilmalyam2@gmail.com"
```
Explanation:

PORT: Specifies the port on which your backend server will run.<br/>
MONGO_URL: Your MongoDB Atlas connection string.<br/>
JWT_SECRET: Secret key used to sign JWT tokens.<br/>
JWT_REFRESH_SECRET: Secret key used to sign JWT refresh tokens.<br/>
USER_EMAIL: Email address used for sending emails.<br/>
EMAIL_PASSWORD: App-specific password or API key for the email service.<br/>
SESSION_SECRET: Secret key used for session management.<br/>
EMAIL_USER: The sender's email address.<br/>
Frontend:

No environment variables are needed for the frontend based on your current setup.
Running the Application
1. Start the Backend
Open a terminal window, navigate to the backend directory, and start the backend server:

```bash
Copy code
cd backend
npm start
```
The backend server will be running on http://localhost:2300.

2. Start the Frontend
In a new terminal window, navigate to the frontend directory and start the frontend development server:

```bash
Copy code
cd frontend
npm run dev
```
The frontend server will be running on http://localhost:3000.

Database Setup
MongoDB Schemas
Schema Setup: The MongoDB database schemas are automatically created when the backend is run. The models are defined in the backend/models directory. Each model represents a MongoDB collection and defines the structure of the documents within that collection.

Connection: Ensure your MongoDB instance (local or Atlas) is running and accessible via the MONGO_URL provided in the .env file.

Accessing MongoDB
Local MongoDB: If using a local MongoDB instance, ensure that MongoDB is running on the default port (27017). You can access the MongoDB shell using the command:

```bash
Copy code
mongo
```
MongoDB Atlas: If using MongoDB Atlas, ensure that the connection string is correctly configured in your .env file. Access your MongoDB Atlas dashboard to manage your database, collections, and documents.

Testing the Application
Access the Application
Once both the frontend and backend servers are running, you can interact with the application by navigating to http://localhost:3000 in your web browser.

API Testing
Use tools like Postman or cURL to test API endpoints. This allows you to send requests to your backend and view responses, helping you verify that your API is functioning as expected.
Include screenshots as necessary.

## Credentials
For Admin Page You can login by admin@gmail.com password:ad.

## API Endpoints
Authentication and User Management API
Register a New User<br/>
Endpoint: POST /api/register<br/>
Description: Registers a new user in the system.<br/>
Request:

```json
Copy code
{
  "username": "john_doe",
  "password": "password123"
}
```
Response:
```json
Copy code
{
  "message": "User registered successfully",
  "userId": "60f7e4e2f1b8b9e7f5b7fabc"
}
```
Login<br/>
Endpoint: POST /api/login<br/>
Description: Logs in a user and returns an authentication token.<br/>
Request:
```json
Copy code
{
  "username": "john_doe",
  "password": "password123"
}
```
Response:
```json
Copy code
{
  "message": "Login successful",
  "accessToken": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```
Get All Users<br/>
Endpoint: GET /api/allusers<br/>
Description: Retrieves all registered users.<br/>
Response:
```json
Copy code
[
  {
    "id": "60f7e4e2f1b8b9e7f5b7fabc",
    "username": "john_doe"
  },
  ...
]
```
Get User by ID<br/>
Endpoint: GET /api/user/:id<br/>
Description: Retrieves a user by their ID.<br/>
Response:
```json
Copy code
{
  "id": "60f7e4e2f1b8b9e7f5b7fabc",
  "username": "john_doe"
}
```
Update User<br/>
Endpoint: PATCH /api/user/:id<br/>
Description: Updates user details.<br/>
Request:
```json
Copy code
{
  "username": "new_username"
}
```
Response:
```json
Copy code
{
  "message": "User updated successfully"
}
```
Delete User<br/>
Endpoint: DELETE /api/user/:id<br/>
Description: Deletes a user by their ID.<br/>
Response:
```json
Copy code
{
  "message": "User deleted successfully"
}
```
Refresh Token<br/>
Endpoint: POST /api/token<br/>
Description: Refreshes the authentication token.<br/>
Request:
```json
Copy code
{
  "refreshToken": "refresh_token_here"
}
```
Response:
```json
Copy code
{
  "accessToken": "new_jwt_token_here"
}
```
Logout<br/>
Endpoint: POST /api/logout<br/>
Description: Logs out the user and invalidates the token.<br/>
Response:
```json
Copy code
{
  "message": "Logout successful"
}
```
## OTP and Password Management API
Send OTP<br/>
Endpoint: POST /api/send-otp<br/>
Description: Sends an OTP to the user's email.<br/>
Request:
```json
Copy code
{
  "email": "user@example.com"
}
```
Response:
```json
Copy code
{
  "message": "OTP sent successfully"
}
```
Verify OTP<br/>
Endpoint: POST /api/verify-otp<br/>
Description: Verifies the OTP provided by the user.<br/>
Request:
```json
Copy code
{
  "otp": "123456"
}
```
Response:
```json
Copy code
{
  "message": "OTP verified successfully"
}
```
Change Password<br/>
Endpoint: POST /api/change-password<br/>
Description: Changes the user's password.<br/>
Request:
```json
Copy code
{
  "email": "user@example.com",
  "newPassword": "new_password123"
}
```
Response:
```json
Copy code
{
  "message": "Password changed successfully"
}
```
Send Ticket<br/>
Endpoint: POST /api/send-ticket<br/>
Description: Sends a support ticket.<br/>
Request:
```json
Copy code
{
  "subject": "Issue with login",
  "description": "Unable to login to my account"
}
```
Response:
```json
Copy code
{
  "message": "Ticket sent successfully"
}
```
## Poll Management API
Create a New Poll<br/>
Endpoint: POST /api/polls <br/>
Description: Creates a new poll. <br/>
Request:
```json
Copy code
{
  "title": "Favorite Programming Language",
  "options": ["JavaScript", "Python", "Java"]
}
```
Response:
```json
Copy code
{
  "message": "Poll created successfully",
  "pollId": "60f7e4e2f1b8b9e7f5b7fabc"
}
```
Get All Polls
Endpoint: GET /api/polls<br/>
Description: Retrieves all polls.<br/>
Response:
```json
Copy code
[
  {
    "id": "60f7e4e2f1b8b9e7f5b7fabc",
    "title": "Favorite Programming Language"
  },
  ...
]
```
Get Poll by ID
Endpoint: GET /api/polls/:pollId<br/>
Description: Retrieves a poll by its ID.<br/>
Response:
```json
Copy code
{
  "id": "60f7e4e2f1b8b9e7f5b7fabc",
  "title": "Favorite Programming Language",
  "options": ["JavaScript", "Python", "Java"]
}
```
Submit Poll Response <br/>
Endpoint: POST /api/polls/:pollId/responses <br/>
Description: Submits a response to a poll.<br/>
Request:
```json
Copy code
{
  "option": "JavaScript"
}
```
Response:
```json
Copy code
{
  "message": "Response submitted successfully"
}
```
Get Poll Responses<br/>
Endpoint: GET /api/polls/:pollId/responses<br/>
Description: Retrieves all responses for a specific poll.<br/>
Response:
```json
Copy code
[
  {
    "option": "JavaScript",
    "count": 42
  },
  ...
]
```
## Scale Poll Management API
Create a Scale Poll<br/>
Endpoint: POST /api/Scalepolls<br/>
Description: Creates a new scale poll.<br/>
Request:
```json
Copy code
{
  "question": "Rate our service",
  "scaleRange": [1, 10]
}
```
Response:
```json
Copy code
{
  "message": "Scale poll created successfully",
  "pollId": "60f7e4e2f1b8b9e7f5b7fabc"
}
```
Get Scale Poll by ID <br/>
Endpoint: GET /api/Scalepolls/:id <br/>
Description: Retrieves a scale poll by its ID. <br/>
Response:
```json
Copy code
{
  "id": "60f7e4e2f1b8b9e7f5b7fabc",
  "question": "Rate our service",
  "scaleRange": [1, 10]
}
```
Submit Scale Poll Response <br/>
Endpoint: POST /api/pollresponse<br/>
Description: Submits a response to a scale poll.<br/>
Request:
```json
Copy code
{
  "rating": 8
}
```
Response:
```json
Copy code
{
  "message": "Response submitted successfully"
}
```
Get Scale Poll Results<br/>
Endpoint: GET /api/scalepolls/:pollId/results <br/>
Description: Retrieves results of a specific scale poll. <br/>
Response:
```json
Copy code
[
  {
    "rating": 8,
    "count": 20
  },
  ...
]
```
True/False Poll Management API <br/>
Create a True/False Poll<br/>
Endpoint: POST /api/true-false-poll<br/>
Description: Creates a new true/false poll.<br/>
Request:
```json
Copy code
{
  "question": "Is the sky blue?"
}
```
Response:
```json
Copy code
{
  "message": "True/False poll created successfully",
  "pollId": "60f7e4e2f1b8b9e7f5b7fabc"
}
```
Submit True/False Poll Response<br/>
Endpoint: POST /api/true-false-poll/:pollId/responses<br/>
Description: Submits a response to a true/false poll.<br/>
Request:
```json
Copy code
{
  "answer": "true"
}
```
Response:
```json
Copy code
{
  "message": "Response submitted successfully"
}
```
Get True/False Poll Results<br/>
Endpoint: GET /api/true-false-poll/:pollId/results<br/>
Description: Retrieves results of a specific true/false poll.<br/>
Response:
```json
Copy code
[
  {
    "answer": "true",
    "count": 100
  },
  ...
]
```


## Technologies Used

- **Frontend**: React, Chakra UI
- **Backend**: Node.js, Express.js, npm Packeges 
- **Database**: Atlas
- **Real-time Communication**: Socket.io

