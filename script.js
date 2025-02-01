//Title constructor function that creates a Title object
function Title(t1) {
    this.mytitle = t1;
}

Title.prototype.getName = function () {
    return (this.mytitle);
}

var socialMedia = {
    facebook: 'http://facebook.com',
    twitter: 'http://twitter.com',
    flickr: 'http://flickr.com',
    youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

// Immediately hide all dropdowns before anything else
document.querySelectorAll('.dropDownTextArea').forEach(function(row) {
    row.style.setProperty('display', 'none', 'important');
});

// Page load initialization
document.addEventListener('DOMContentLoaded', function() {
    // Display student info
    alert("Student Name: Nithin Naidu\nNUID: 002300837");

    // Double-check dropdowns are hidden
    document.querySelectorAll('.dropDownTextArea').forEach(function(row) {
        row.style.setProperty('display', 'none', 'important');
    });

    // Disable submit button initially
    const submitButton = document.getElementById('button');
    submitButton.disabled = true;
    submitButton.style.backgroundColor = 'gray';

    let studentCount = 3;

    // Add new student handler
    document.getElementById('add').onclick = function() {
        studentCount++;
        addNewStudent(studentCount);
    };

    // Set up existing rows
    setupExistingRows();
});

function addNewStudent(num) {
    const table = document.getElementById('myTable');
    
    // Add main row
    const row = table.insertRow(-1);
    row.innerHTML = `
        <td><input type="checkbox"/><br/><br/><img src="down.png" width="25px"/></td>
        <td>Student ${num}</td>
        <td>Teacher ${num}</td>
        <td>Approved</td>
        <td>Fall</td>
        <td>TA</td>
        <td>${num}2345</td>
        <td>100%</td>
        <td></td>
        <td></td>
    `;

    // Add dropdown row
    const dropdownRow = table.insertRow(-1);
    dropdownRow.className = 'dropDownTextArea';
    dropdownRow.style.setProperty('display', 'none', 'important');
    dropdownRow.innerHTML = `
        <td colspan="10">
            Advisor:<br/><br/>
            Award Details<br/>
            Summer 1-2014(TA)<br/>
            Budget Number: <br/>
            Tuition Number: <br/>
            Comments:<br/><br/><br/>
            Award Status:<br/><br/><br/>
        </td>
    `;

    setupRowHandlers(row);
    alert(`Student ${num} Record added successfully`);
}

function setupExistingRows() {
    const rows = document.querySelectorAll('#myTable tr:not(.dropDownTextArea)');
    rows.forEach(row => {
        if(row.cells[0].querySelector('input[type="checkbox"]')) {
            setupRowHandlers(row);
        }
    });
}

function setupRowHandlers(row) {
    const checkbox = row.querySelector('input[type="checkbox"]');
    const arrow = row.querySelector('img');
    
    if(checkbox) {
        checkbox.onchange = function() {
            handleCheckboxChange(row, this.checked);
            updateSubmitButton();
        };
    }

    if(arrow) {
        arrow.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const detailRow = row.nextElementSibling;
            if(detailRow && detailRow.classList.contains('dropDownTextArea')) {
                const currentDisplay = detailRow.style.display;
                if(currentDisplay === 'none' || currentDisplay === '') {
                    detailRow.style.setProperty('display', 'table-row', 'important');
                } else {
                    detailRow.style.setProperty('display', 'none', 'important');
                }
            }
            return false;
        };
    }
}

function handleCheckboxChange(row, checked) {
    // Toggle row background
    row.style.backgroundColor = checked ? 'yellow' : 'white';
    
    // Handle delete/edit buttons
    const deleteCell = row.cells[row.cells.length - 2];
    const editCell = row.cells[row.cells.length - 1];
    
    if(checked) {
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteRow(row);
        deleteCell.appendChild(deleteBtn);

        // Add edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => showEditPopup(row);
        editCell.appendChild(editBtn);
    } else {
        deleteCell.innerHTML = '';
        editCell.innerHTML = '';
    }
}

function updateSubmitButton() {
    const submitButton = document.getElementById('button');
    const anyChecked = document.querySelector('input[type="checkbox"]:checked');
    submitButton.disabled = !anyChecked;
    submitButton.style.backgroundColor = anyChecked ? 'orange' : 'gray';
}

function deleteRow(row) {
    const studentName = row.cells[1].textContent;
    row.nextElementSibling.remove(); // Remove dropdown row
    row.remove(); // Remove main row
    alert(`${studentName} Record deleted successfully`);
    updateSubmitButton();
}

function showEditPopup(row) {
    const studentName = row.cells[1].textContent;
    
    // Create popup container
    const popupContainer = document.createElement('div');
    popupContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 5px;
        min-width: 300px;
        max-width: 500px;
    `;

    // Add title
    const title = document.createElement('h3');
    title.textContent = `Edit details of ${studentName}`;
    title.style.marginTop = '0';
    popup.appendChild(title);

    // Add form fields
    const fields = ['Student', 'Advisor', 'Award Status', 'Semester', 'Type', 'Budget #', 'Percentage'];
    const values = Array.from(row.cells).slice(1, -2).map(cell => cell.textContent);

    fields.forEach((field, index) => {
        const fieldDiv = document.createElement('div');
        fieldDiv.style.marginBottom = '10px';
        
        const label = document.createElement('label');
        label.textContent = `${field}: `;
        label.style.fontWeight = 'bold';
        
        const value = document.createElement('span');
        value.textContent = values[index];
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(value);
        popup.appendChild(fieldDiv);
    });

    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    `;

    // Update button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.style.cssText = `
        padding: 5px 15px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    `;
    updateButton.onclick = function() {
        alert(`${studentName} data updated successfully`);
        popupContainer.remove();
    };

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
        padding: 5px 15px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    `;
    cancelButton.onclick = function() {
        popupContainer.remove();
    };

    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(cancelButton);
    popup.appendChild(buttonContainer);

    // Add popup to container and container to body
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);

    // Close popup when clicking outside
    popupContainer.onclick = function(e) {
        if (e.target === popupContainer) {
            popupContainer.remove();
        }
    };
}