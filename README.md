# Equipment Tracker

A simple full-stack web application to manage a list of equipment.

## Features
- View, add, edit, and delete equipment
- Equipment fields: Name, Type, Status, Last Cleaned Date
- Search, filter, and sort equipment
- Responsive design for mobile and desktop
- Form validation and basic error handling


## Tech Stack
- **Frontend:** [React (Create React App)](./frontend)  
	- Runs at [http://localhost:3000](http://localhost:3000)  
	- Main UI for managing equipment  
	- Uses Tailwind CSS for styling
- **Backend:** [Node.js, Express](./backend)  
	- Runs at [http://localhost:5000](http://localhost:5000)  
	- Provides REST API for equipment data  
	- Stores data in a local JSON file (no external DB required)

---

## Project Structure

### [Frontend](./frontend)
- Built with React (Create React App)
- Styled with Tailwind CSS
- Provides the user interface for equipment management
- Start with:  
	```bash
	cd frontend
	npm install
	npm start
	```
- Runs at [http://localhost:3000](http://localhost:3000)

### [Backend](./backend)
- Built with Node.js and Express
- Serves REST API endpoints for equipment data
- Data stored in `equipment.json` (no external DB required)
- Start with:  
	```bash
	cd backend
	npm install
	npm start
	```
- Runs at [http://localhost:5000](http://localhost:5000)

## Getting Started

### 1. Start the Backend
```
cd backend
npm install
npm start
```
The backend runs on [http://localhost:5000](http://localhost:5000)

### 2. Start the Frontend
```
cd backend/frontend
npm install
npm start
```
The frontend runs on [http://localhost:3000](http://localhost:3000)

### 3. Usage
- Use the web UI to manage equipment.
- Add, edit, delete, search, filter, and sort equipment.

## Project Structure
- `backend/` - Express server and JSON data
- `backend/frontend/` - React app

## API Endpoints
- `GET    /api/equipment`      - Get all equipment
- `POST   /api/equipment`      - Add new equipment
- `PUT    /api/equipment/:id`  - Update equipment
- `DELETE /api/equipment/:id`  - Delete equipment

---

**Note:** For production, use a real database and add authentication.
