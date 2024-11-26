/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches data from the pettable and displays it.
async function fetchAndDisplayPets() {
    const tableElement = document.getElementById('petTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/pettable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const pettableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    pettableContent.forEach(pet => {
        const row = tableBody.insertRow();
        pet.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayDocs() {
    const tableElement = document.getElementById('docTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/doctable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const doctableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    doctableContent.forEach(doc => {
        const row = tableBody.insertRow();
        doc.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayVets() {
    const tableElement = document.getElementById('vetTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/vettable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const vettableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    vettableContent.forEach(vet => {
        const row = tableBody.insertRow();
        vet.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayOwners() {
    const tableElement = document.getElementById('ownerTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/ownertable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const ownertableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    ownertableContent.forEach(owner => {
        const row = tableBody.insertRow();
        owner.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayApplications() {
    const tableElement = document.getElementById('applicationTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/applicationtable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const applicationtableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    applicationtableContent.forEach(application => {
        const row = tableBody.insertRow();
        application.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayShelters() {
    const tableElement = document.getElementById('shelterTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/sheltertable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const sheltertableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    sheltertableContent.forEach(shelter => {
        const row = tableBody.insertRow();
        shelter.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayPurchasesFrom() {
    const tableElement = document.getElementById('purchasesFromTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/purchasesfromtable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const purchasetableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    purchasetableContent.forEach(purchases => {
        const row = tableBody.insertRow();
        purchases.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayDogs() {
    const tableElement = document.getElementById('dogTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/dogtable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const dogtableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    dogtableContent.forEach(dog => {
        const row = tableBody.insertRow();
        dog.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "petTable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// Inserts new records into the demotable.
async function insertDoctable(event) {
    event.preventDefault();

    const pidValue = document.getElementById('insertPID').value;
    const vetConValue = document.getElementById('insertVetCon').value;
    const idValue = document.getElementById('insertId').value;
    const descValue = document.getElementById('insertDesc').value;
    const dateValue = document.getElementById('insertDate').value;

    const response = await fetch('/insert-doctable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pid: pidValue,
            vetcon: vetConValue,
            id: idValue,
            ddesc: descValue,
            ddate: dateValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in petTable: ${tupleCount}`;
    } else {
        alert("Error in count petTable!");
    }
}

async function joinTableAddQuery() {
    const querySetDiv = document.getElementById('querySet');
    const newQueryDiv = document.createElement('div');
    newQueryDiv.classList.add('query');

    const andOr = document.createElement('select');
    andOr.classList.add('andOr');
    andOr.innerHTML = `<option value="AND">and</option>
                    <option value="OR">or</option>`;

    const attributes = document.createElement('select');
    attributes.classList.add('attributes');
    attributes.innerHTML = `<option value="o.oaddress">Owner Address</option>
                    <option value="o.oname">Owner Name</option>
                    <option value="o.ocontact">Owner Contact</option>
                    <option value="a.shelterAddress">Shelter Address on Application</option>
                    <option value="a.ownerAddress">Owner Address on Application</option>
                    <option value="a.id">Application id</option>
                    <option value="a.applicationDate">Application Date</option>
                    <option value="a.approvalStatus">Application Status</option>`;
    
    const predicates = document.createElement('select');
    predicates.classList.add('predicates');
    predicates.innerHTML = `<option value="=">=</option>
                    <option value="!=">!=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&ge;</option>
                    <option value="<=">&le;</option>`;

    const input = document.createElement('input');
    input.classList.add('whereValue');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter value');
    input.required = true;

    newQueryDiv.appendChild(andOr);
    newQueryDiv.appendChild(attributes);
    newQueryDiv.appendChild(predicates);
    newQueryDiv.appendChild(input);
    querySetDiv.appendChild(newQueryDiv);
}

async function joinTableSubmitQuery(event) {
    event.preventDefault();

    const querySet = document.getElementById('querySet').querySelectorAll('.query');
    let fullQueryString = "(";

    console.log(querySet.length);

    querySet.forEach((query, index) => {
        let currQuery = "";
        const currAttribute = query.querySelector('.attributes').value;
        const currPredicate = query.querySelector('.predicates').value;
        const currInput = query.querySelector('.whereValue').value;

        if (index > 0) {
            const currAndOr = query.querySelector('.andOr').value;
            currQuery += ` ${currAndOr} `;
            console.log(currAndOr);
        }

        currQuery += `${currAttribute} `;
        currQuery += `${currPredicate} `;

        switch (currAttribute) {
            case "a.id":
                currQuery += `${currInput}`;
                break;
            case "a.applicationDate":
                currQuery += `TO_DATE('${currInput}','YYYY-MM-DD')`;
                break;
            default:
                currQuery += `'${currInput}'`;
                break;
        }

        fullQueryString += `${currQuery}`;

        console.log(currQuery);
        console.log(fullQueryString);
    });

    fullQueryString += `)`;

    const response = await fetch('/join-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: fullQueryString
        })
    });

    const responseData = await response.json();
    const joinTableContent = responseData.data;
    const messageElement = document.getElementById('joinResultMsg');

    const tableElement = document.getElementById('joinedTable');
    const tableBody = tableElement.querySelector('tbody');

    if (responseData.success) {
        messageElement.textContent = "Join query result:";

        // Always clear old, already fetched data before new fetching process.
        if (tableBody) {
            tableBody.innerHTML = '';
        }

        if (joinTableContent.length == 0) {
            messageElement.textContent += " No results!";
            return;
        }

        joinTableContent.forEach(join => {
            const row = tableBody.insertRow();
            join.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error inserting join query!";
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    // document.getElementById("resetPetTable").addEventListener("click", resetDemotable);
    document.getElementById("insertDocTable").addEventListener("submit", insertDoctable);
    document.getElementById("updateNamePetTable").addEventListener("submit", updateNameDemotable);
    document.getElementById("countPetTable").addEventListener("click", countDemotable);
    document.getElementById("joinTableInput").addEventListener("submit", joinTableSubmitQuery);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayPets();
    fetchAndDisplayDocs();
    fetchAndDisplayVets();
    fetchAndDisplayOwners();
    fetchAndDisplayApplications();
    fetchAndDisplayShelters();
    fetchAndDisplayPurchasesFrom();
    fetchAndDisplayDogs();
}
