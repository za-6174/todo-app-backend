# Todo App Backend

**Description:**

This is the backend for the todo app which implements functionality to 
* log in/sign up 
* create tasks and update tasks
* trigger corn job for sending email reminders for over due tasks. Cron job is scheduled to run every 15 minutes for any over due task past 3 hours.

**Technologies:**

* MongoDB Atlas (Cloud-based Database). Note: This project already contains my atlas database configurations to easily run without any need to download mongodb locally. 
* Express.js (Backend Framework)
* Node.js (JavaScript Runtime Environment)

**Installation and Setup:**

1. **Prerequisites:**
   - **Node.js and npm (or yarn):** Ensure you have Node.js (version 14 or later) and npm (or yarn) installed on your system. Download them from the official Node.js website if needed: https://nodejs.org/en

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/za-6174/todo-app-backend.git
   cd todo-app-backend
3. Install packages
   ```bash
   npm install  # or yarn install
4. Run it
   ```bash
   npm start # or yarn start

Note: .env file should never be pushed on github but since this project is meant for testing purposes, I have included .env to minimize the efforts to run the application.
