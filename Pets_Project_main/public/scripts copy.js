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

// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
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

function showUpdateFields() {
    const selectValue = document.getElementById("updateSelect").value;

    document.getElementById("nameDiv").classList.add("hidden");
    document.getElementById("ageDiv").classList.add("hidden");
    document.getElementById("healthConditionDiv").classList.add("hidden");
    document.getElementById("adoptionDateDiv").classList.add("hidden");
    document.getElementById("ownerAddressDiv").classList.add("hidden");

    if (selectValue === "name") {
        document.getElementById("nameDiv").classList.remove("hidden");
    } else if (selectValue === "age") {
        document.getElementById("ageDiv").classList.remove("hidden");
    } else if (selectValue === "healthCondition") {
        document.getElementById("healthConditionDiv").classList.remove("hidden");
    } else if (selectValue === "adoptionDate") {
        document.getElementById("adoptionDateDiv").classList.remove("hidden");
    } else if (selectValue === "ownerAddress") {
        document.getElementById("ownerAddressDiv").classList.remove("hidden");
    }
}


async function updateDemotable(event) {
  event.preventDefault();
  const selectedField = document.getElementById("updateSelect").value;
  switch (selectedField) {
    case "age":
        oldValue = document.getElementById("oldAgeValue").value;
        newValue = document.getElementById("newAgeValue").value;
        break;
    case "name":
        oldValue = document.getElementById("oldNameValue").value;
        newValue = document.getElementById("newNameValue").value;
        break;
    case "healthCondition":
        oldValue = document.getElementById("oldHealthConditionValue").value;
        newValue = document.getElementById("newHealthConditionValue").value;
        break;
    case "adoptionDate":
        oldValue = document.getElementById("oldAdoptionDateValue").value;
        newValue = document.getElementById("newAdoptionDateValue").value;
        break;
    case "ownerAddress":
        oldValue = document.getElementById("oldOwnerAddressValue").value;
        newValue = document.getElementById("newOwnerAddressValue").value;
        break;
    default:
        alert("Please select a valid field to update.");
        return;
}
  const resultMsg = document.getElementById("updateResultMsg");
  const response = await fetch(`/update-demotable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      field: selectedField,
      oldValue,
      newValue,
    }),
  });
  fetchAndDisplayPets()
  const responseData = await response.json();

  if (responseData.success) {
    resultMsg.textContent = `${selectedField} updated successfully!`;
  } else {
    resultMsg.textContent = `Error updating ${selectedField}!`;
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


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("insertPetTable").addEventListener("submit", insertDemotable);
    document.getElementById("updatePetTable").addEventListener("submit", updateDemotable);
    document.getElementById("countPetTable").addEventListener("click", countDemotable);
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
