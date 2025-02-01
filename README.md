# Assignment-3

## Project Description
This project implements a dynamic student records management system with an interactive table interface. Intro to JS.

## Technical Requirements
- Web Browser (Chrome/Firefox/Safari)
- Local development environment or web server
- JavaScript enabled

## Features

### 1. Initial Page Load
- Displays student name and NUID in an alert
- Table is collapsed by default
- Submit button is initially disabled and grayed out

### 2. Add New Student
- Dynamically adds new student records
- Automatically increments student numbers
- Maintains consistent formatting with existing records
- Shows success message after addition

### 3. Row Selection Features
When a checkbox is selected:
- Row background changes to yellow
- Submit button becomes enabled and turns orange
- Delete and Edit buttons appear dynamically
- Row background returns to white when deselected

### 4. Row Expansion
- Green arrows toggle row details
- Clicking expands/collapses additional information

### 5. Edit Functionality
- Edit button appears when row is selected
- Opens a popup showing all student details
- Includes Update and Cancel options
- Displays success message upon update

### 6. Delete Functionality
- Delete button appears when row is selected
- Removes the selected row
- Shows confirmation message after deletion

## File Structure
```
project/
│
├── table.html          # Main HTML file
├── table.css          # Table-specific styles
├── style.css          # General styles
├── script.js          # JavaScript functionality
└── README.md          # Project documentation
```

## Setup Instructions
1. Clone the repository
2. Place all files in your web server directory
3. Open table.html in a web browser
4. No additional setup or dependencies required

## Usage Guide
1. **Adding a Student:**
   - Click "Add New Student" button
   - New row appears with incremented details

2. **Selecting Records:**
   - Check the checkbox next to student name
   - Row highlights and action buttons appear

3. **Editing Records:**
   - Select a row
   - Click Edit button
   - Update information in popup
   - Click Update or Cancel

4. **Deleting Records:**
   - Select a row
   - Click Delete button
   - Confirm deletion

5. **Viewing Details:**
   - Click green arrow to expand/collapse details

## Additional Notes
- All data is managed client-side
- No server-side storage implemented
- Page refresh will reset to initial state
