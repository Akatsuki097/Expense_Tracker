# Expense Tracker Full-Stack Application

A full-stack Expense Tracker application built using React (with TypeScript and Redux Toolkit for state management) for the frontend and NestJS (with TypeScript) for the backend. The application allows users to manage expenses with features such as filtering, pagination. MongoDB (via Mongoose) is used as the database.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Features

- **Expense Management:** Create, edit, delete, and filter expenses.
- **Category Management:** Manage categories with auto-creation on expense submission.
- **Pagination:** Improve performance by paginating the expenses list.

## Tech Stack

- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query
- **Backend:** NestJS, TypeScript, Mongoose
- **Database:** MongoDB (preferably using Mongoose)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible via a cloud provider)
- Git

### Backend Setup (NestJS)

1. **Clone the Repository:**

   ```bash
   git clone <your-repo-url>
   cd expense-tracker/expense-tracker-backend
2. **Install Dependencies:**

```bash
npm install
```
3. **Configure Environment Variables:**

MONGO_URI=mongodb://localhost/expense-tracker
PORT=27017

4. **Run the Backend Server in Development Mode:**

```bash
npm run start:dev
```
The backend should now be running at http://localhost:3000
   
### Frontend Setup (React)

1. **Navigate to the Frontend Folder:**

```bash
cd ../expense-tracker-frontend
```
2. **Install Dependencies:**

```bash
npm install
```
3. **Configure Environment Variables (if applicable):**

REACT_APP_API_URL=http://localhost:3001

4. **Run the Frontend Server:**

```bash

npm start
```
The frontend will start on http://localhost:3001. Open this URL in your browser to view the application.
