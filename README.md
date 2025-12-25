# Equipment Tracker

## Deployed Link : [(https://equipmenttrackerapp.netlify.app/)](https://equipmenttrackerapp.netlify.app/)

A simple full-stack web application to manage a list of equipment.

## Features
- View, add, edit, and delete equipment
- Equipment fields: Name, Type, Status, Last Cleaned Date
- Search, filter, and sort equipment
- Responsive design for mobile and desktop
- Form validation and basic error handling

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

### 3. Usage
- Use the web UI to manage equipment.
- Add, edit, delete, search, filter, and sort equipment.



