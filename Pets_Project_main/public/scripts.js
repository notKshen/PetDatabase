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

async function fetchAndDisplayTrainers() {
    const tableElement = document.getElementById('trainerTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/trainertable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const trainertableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }
    trainertableContent.forEach(trainer => {
        const row = tableBody.insertRow();
        trainer.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplaySelectedPets() {

    const tableElement = document.getElementById('selectedPetTable');
    const tableBody = tableElement.querySelector('tbody');
    let queryString = selectionSQL.textContent;
    if (queryString !== '') {
        queryString = `AND (${queryString})`;
    }

    // console.log(queryString);

    const response = await fetch('/selectedpettable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            queryString: queryString
        })
    });

    const responseData = await response.json();
    const selectedPettableContent = responseData.data;
    const messageElement = document.getElementById('SelectionResultMsg');

    if (responseData.success) {
        messageElement.textContent = "selection performed successfully!";
        // can use a separate function
        if (tableBody) {
            tableBody.textContent = '';
        }
        selectedPettableContent.forEach(pet => {
            const row = tableBody.insertRow();
            pet.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error performing selection!";
    }
}


async function fetchAndDisplaySelectedShelters() {
    const tableElement = document.getElementById('selectedShelterTable');
    const tableBody = tableElement.querySelector('tbody');
    let queryString = shelterSelectionSQL.textContent;
    if (queryString !== '') {
        queryString = `WHERE (${queryString})`;
    }
    console.log(queryString);

    const response = await fetch('/selectedsheltertable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            queryString: queryString
        })
    });

    const responseData = await response.json();
    const selectedPettableContent = responseData.data;
    const messageElement = document.getElementById('ShelterSelectionResultMsg');

    if (responseData.success) {
        messageElement.textContent = "selection performed successfully!";
        if (tableBody) {
            tableBody.textContent = '';
        }
        selectedPettableContent.forEach(pet => {
            const row = tableBody.insertRow();
            pet.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error performing selection!";
    }
}

async function fetchAndDisplayTrainerContacts() {
    const selectElement = document.getElementById('trainerContactSelect');

    const response = await fetch('/trainertable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const trainertableContent = responseData.data;

    if (selectElement) {
        selectElement.innerHTML = '';
    }

    trainertableContent.forEach(trainer => {
        const option = document.createElement('option');
        const contact = trainer[0];
        option.value = contact;
        option.textContent = contact;
        selectElement.appendChild(option);
    });
}

async function fetchAndDisplayPetSpecies() {
    const selectElement = document.getElementById('speciesSelect');

    const response = await fetch('/pettable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const petTableContent = responseData.data;

    if (selectElement) {
        selectElement.textContent = '';
    }

    const speciesSet = new Set();
    petTableContent.forEach(pet => {
        const species = pet[2];
        speciesSet.add(species);
    });

    speciesSet.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species;
        selectElement.appendChild(option);
    });
}

async function sortYoung() {
    const tableElement = document.getElementById('youngTable');
    const tableBody = tableElement.querySelector('tbody');

    if (!tableElement.classList.contains('hidden')) {
        tableElement.classList.add('hidden');
        return; 
    }

    const response = await fetch('/sortYoungPet', {
        method: 'GET'
    });

    const responseData = await response.json();
    const pettableContent = responseData.data;

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
    tableElement.classList.remove('hidden');
    const resultMsg = document.getElementById("updateMsg");
    resultMsg.textContent = 'Displaying animals of each species whose ages are below or equal to the average age of that species.';
}


// Toggle the visibility of the filter container

function toggleFilter() {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.style.display = filterContainer.style.display === 'none' ? 'block' : 'none';
  }

async function applyFilter() {
    const tableElement = document.getElementById('dogTable');
    const tableBody = tableElement.querySelector('tbody');
    const columns = ['pid', 'coatType', 'barkingFrequency'];
    const selectedColumns = columns.filter((col) => document.getElementById(col).checked);

    const response = await fetch('/filter-columns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columns: selectedColumns }),
    });

    const responseData = await response.json();
    const dogTableContent = responseData.data;
    // Always clear old, already fetched data before the new fetching process
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    // Dynamically create table headers
    const tableHead = document.getElementById('dogTable').querySelector('thead');
    if (tableHead) {
        tableHead.innerHTML = ''; // Clear old headers
        const headerRow = tableHead.insertRow();
        selectedColumns.forEach((col) => {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });
    }

    dogTableContent.forEach(dog => {
        const row = tableBody.insertRow();
        dog.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
    document.getElementById('filterContainer').style.display = 'none';
}



  

// Updates names in the demotable.

function showUpdateFields() {
    const selectValue = document.getElementById("updateSelect").value;

    document.getElementById("nameDiv").classList.add("hidden");
    document.getElementById("ageDiv").classList.add("hidden");
    document.getElementById("dietReqDiv").classList.add("hidden");
    document.getElementById("healthConditionDiv").classList.add("hidden");
    document.getElementById("adoptionDateDiv").classList.add("hidden");
    document.getElementById("ownerAddressDiv").classList.add("hidden");
    document.getElementById("carePlanDiv").classList.add("hidden");

    if (selectValue === "name") {
        document.getElementById("nameDiv").classList.remove("hidden");
    } else if (selectValue === "age") {
        document.getElementById("ageDiv").classList.remove("hidden");
    } else if (selectValue === "dietaryRequirements") {
        document.getElementById("dietReqDiv").classList.remove("hidden");
    } else if (selectValue === "healthCondition") {
        document.getElementById("healthConditionDiv").classList.remove("hidden");
    } else if (selectValue === "adoptionDate") {
        document.getElementById("adoptionDateDiv").classList.remove("hidden");
    } else if (selectValue === "ownerAddress") {
        document.getElementById("ownerAddressDiv").classList.remove("hidden");
    } else if (selectValue === "carePlan") {
        document.getElementById("carePlanDiv").classList.remove("hidden");
    }
}

// Update demotable
async function updateDemotable(event) {
  event.preventDefault();
  const selectedField = document.getElementById("updateSelect").value;
  switch (selectedField) {
    case "name":
        petID = document.getElementById("petIDName").value;
        oldValue = document.getElementById("oldNameValue").value;
        newValue = document.getElementById("newNameValue").value;
        break;
    case "age":
        petID = document.getElementById("petIDAge").value;
        oldValue = document.getElementById("oldAgeValue").value;
        newValue = document.getElementById("newAgeValue").value;
        break;
    case "dietaryRequirements":
        petID = document.getElementById("petIDDietReq").value;
        oldValue = document.getElementById("oldDietReqValue").value;
        newValue = document.getElementById("newDietReqValue").value;
        break;
    case "healthCondition":
        petID = document.getElementById("petIDHC").value;
        oldValue = document.getElementById("oldHealthConditionValue").value;
        newValue = document.getElementById("newHealthConditionValue").value;
        break;
    case "adoptionDate":
        petID = document.getElementById("petIDAD").value;
        oldValue = document.getElementById("oldAdoptionDateValue").value;
        newValue = document.getElementById("newAdoptionDateValue").value;
        break;
    case "ownerAddress":
        petID = document.getElementById("petIDOA").value;
        oldValue = document.getElementById("oldOwnerAddressValue").value;
        newValue = document.getElementById("newOwnerAddressValue").value;
        break;
    case "carePlan":
        petID = document.getElementById("petIDCarePlan").value;
        oldValue = document.getElementById("oldCarePlanValue").value;
        newValue = document.getElementById("newCarePlanValue").value;
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
      petID,
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
                    <option value="o.contact">Owner Contact</option>
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

async function havingQuery() {
    const tableElement = document.getElementById('havingTable');
    const tableBody = tableElement.querySelector('tbody');
    
    const response = await fetch('/having-query', {
        method: 'GET'
    });

    const responseData = await response.json();
    const havingtableContent = responseData.data;

    const messageElement = document.getElementById('havingResultMsg');

    messageElement.textContent = "Aggregate with having query result:";
        
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (havingtableContent.length == 0) {
        messageElement.textContent += " No results!";
        return;
    }

    havingtableContent.forEach(breed => {
        const row = tableBody.insertRow();
        breed.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function divideQuery() {
    const tableElement = document.getElementById('divideTable');
    const tableBody = tableElement.querySelector('tbody');
    
    const response = await fetch('/divide-query', {
        method: 'GET'
    });

    const responseData = await response.json();
    const dividetableContent = responseData.data;

    const messageElement = document.getElementById('divideResultMsg');

    messageElement.textContent = "Divide query result:";
        
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (dividetableContent.length == 0) {
        messageElement.textContent += " No results!";
        return;
    }

    dividetableContent.forEach(address => {
        const row = tableBody.insertRow();
        address.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


async function deleteTrainer(event) {
    event.preventDefault();

    const selectValue = document.getElementById('trainerContactSelect').value;

    const response = await fetch('/delete-trainer', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainerContact: selectValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteTrainerMsg');

    if (responseData.success) {
        messageElement.textContent = "Trainer deleted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error deleting trainer!";
    }
}

async function avgAgeGroupBySpecies() {
    const tableElement = document.getElementById('speciesAvgAgeTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch("/avg-age-group-by-species", {
        method: 'GET'
    });

    const responseData = await response.json();
    const speciesAvgAgeTableContent = responseData.data;
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        speciesAvgAgeTableContent.forEach(pet => {
            const row = tableBody.insertRow();
            pet.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error in getting the averages!";
    }
}

function displaySelectionSpans() {
    const selectionSpans = document.querySelectorAll('.selectionConditions');

    let spanIdToDisplay;
    switch (attributeSelect.value) {
        case "Pet1.pid":
        case "Pet2.age":
        case "Pet8.lifespan":
            spanIdToDisplay = "intSelection";
            break;
        case "Pet2.species":
            spanIdToDisplay = "speciesSelection";
            break;
        case "Pet5.adoptionDate":
            spanIdToDisplay = "adoptionDateSelection";
            break;
        case "Pet6.arriveDate":
            spanIdToDisplay = "arriveDateSelection";
            break;
        default:
            spanIdToDisplay = "varcharSelection";
            break;
    }

    selectionSpans.forEach(span => {
        span.style.display = 'none';
    });
    const spanToDisplay = document.getElementById(spanIdToDisplay);
    if (spanToDisplay) {
        spanToDisplay.style.display = 'inline-block';
    }
}

function addSelectionClause() {
    if (selectionSQL.textContent != '') {
        selectionSQL.textContent += `${AndOrSelect.value} `;
        selectionText.textContent += `${AndOrSelect.value} `;
    }
    if (leftParenthesis.checked) {
        selectionSQL.textContent += "( "
        selectionText.textContent += "( ";
    }
    selectionSQL.textContent += `${attributeSelect.value} `;
    const selectedText = attributeSelect.options[attributeSelect.selectedIndex].text;
    selectionText.textContent += `${selectedText} `;


    switch (attributeSelect.value) {
        case "Pet1.pid":
        case "Pet2.age":
        case "Pet8.lifespan":
            // innerHTML will change > to &gt;
            selectionSQL.textContent += `${intOperator.value} `;
            selectionSQL.textContent += `${intInput.value} `;

            selectionText.textContent += `${intOperator.value} `;
            selectionText.textContent += `${intInput.value} `;
            break;
        case "Pet2.species":
            selectionSQL.textContent += (speciesSelectRadio.checked) ?
                `${speciesOperator.value} '${speciesSelect.value}' ` :
                `${speciesOperator.value} '${speciesInput.value}' `;

            selectionText.textContent += (speciesSelectRadio.checked) ?
                `${speciesOperator.value} '${speciesSelect.value}' ` :
                `${speciesOperator.value} '${speciesInput.value}' `;
            break;
        case "Pet5.adoptionDate":
            if (adoptionDateNull.checked) {
                selectionSQL.textContent += "IS NULL ";
                selectionText.textContent += "IS NULL ";
            } else if (adoptionDateNotNull.checked) {
                selectionSQL.textContent += "IS NOT NULL ";
                selectionText.textContent += "IS NOT NULL ";
            } else {
                selectionSQL.textContent += `${adoptionDateOperator.value} `;
                selectionSQL.textContent += `TO_DATE('${adoptionDateInput.value}','YYYY-MM-DD') `;

                selectionText.textContent += `${adoptionDateOperator.value} `;
                selectionText.textContent += `'${adoptionDateInput.value}' `;
            }
            break;
        case "Pet6.arriveDate":
            selectionSQL.textContent += `${arriveDateOperator.value} `;
            selectionSQL.textContent += `TO_DATE('${arriveDateInput.value}', 'YYYY-MM-DD')`;

            selectionText.textContent += `${arriveDateOperator.value} `;
            selectionText.textContent += `'${arriveDateInput.value}' `;
            break;
        default:
            selectionSQL.textContent += `${varcharOperator.value} `;
            selectionSQL.textContent += `'${varcharInput.value}' `;

            selectionText.textContent += `${varcharOperator.value} `;
            selectionText.textContent += `'${varcharInput.value}' `;
            break;
    }

    if (rightParenthesis.checked) {
        selectionSQL.textContent += ") ";
        selectionText.textContent += ") ";
    }
}

function shelterAddSelectionClause() {
    if (shelterSelectionSQL.textContent != '') {
        shelterSelectionSQL.textContent += `${shelterAndOrSelect.value} `;
    }
    if (shelterLeftParenthesis.checked) {
        shelterSelectionSQL.textContent += "( ";
    }
    shelterSelectionSQL.textContent += `${shelterAttributeSelect.value} `;

    switch (shelterAttributeSelect.value) {
        case "capacity":
            shelterSelectionSQL.textContent += `${shelterIntOperator.value} `;
            shelterSelectionSQL.textContent += `${shelterIntInput.value} `;
            break;
        default:
            shelterSelectionSQL.textContent += `${shelterVarcharOperator.value} `;
            shelterSelectionSQL.textContent += `'${shelterVarcharInput.value}' `;
            break;
    }

    if (shelterRightParenthesis.checked) {
        shelterSelectionSQL.textContent += ") ";
    }
}

function displayShelterSelectionSpans() {
    const selectionSpans = document.querySelectorAll('.shelterSelectionConditions');

    let spanIdToDisplay;
    switch (shelterAttributeSelect.value) {
        case "capacity":
            spanIdToDisplay = "shelterIntSelection";
            break;
        default:
            spanIdToDisplay = "shelterVarcharSelection";
            break;
    }

    selectionSpans.forEach(span => {
        span.style.display = 'none';
    });
    const spanToDisplay = document.getElementById(spanIdToDisplay);
    if (spanToDisplay) {
        spanToDisplay.style.display = 'inline-block';
    }
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    getElements();
    fetchTableData();
    document.getElementById("insertDocTable").addEventListener("submit", insertDoctable);
    document.getElementById("updatePetTable").addEventListener("submit", updateDemotable);
    document.getElementById("joinTableInput").addEventListener("submit", joinTableSubmitQuery);

    document.getElementById("deleteTrainer").addEventListener("click", deleteTrainer);
    document.getElementById("avgAgeGroupBySpecies").addEventListener("click", avgAgeGroupBySpecies);
    document.getElementById("attributeSelect").addEventListener("change", displaySelectionSpans);
    document.getElementById('addSelectionClause').addEventListener('click', addSelectionClause);
    document.getElementById('resetAllClauses').addEventListener('click', function () {
        selectionSQL.textContent = "";
        selectionText.textContent = "";
    });
    document.getElementById('selectPet').addEventListener('click', fetchAndDisplaySelectedPets);

    document.getElementById("shelterAttributeSelect").addEventListener("change", displayShelterSelectionSpans);
    document.getElementById('shelterAddSelectionClause').addEventListener('click', shelterAddSelectionClause);
    document.getElementById('shelterResetAllClauses').addEventListener('click', function () {
        shelterSelectionSQL.textContent = "";
    });
    document.getElementById('selectShelter').addEventListener('click', fetchAndDisplaySelectedShelters);
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
    fetchAndDisplayTrainers();
    fetchAndDisplayTrainerContacts();
    fetchAndDisplaySelectedPets();
    fetchAndDisplaySelectedShelters();
    fetchAndDisplayPetSpecies();
    displaySelectionSpans();
    displayShelterSelectionSpans();
}

function getElements() {
    const selectionSQL = document.getElementById('selectionSQL');
    const selectionText = document.getElementById('selectionText');
    const AndOrSelect = document.getElementById('AndOrSelect');
    const attributeSelect = document.getElementById('attributeSelect');
    const selectionSpans = document.querySelectorAll('.selectionConditions');

    const intOperator = document.getElementById("intOperator");
    const intInput = document.getElementById("intInput");

    const adoptionDateNull = document.getElementsByName('adoptionDateNull');
    const adoptionDateNotNull = document.getElementsByName('adoptionDateNotNull');
    const adoptionDateOperator = document.getElementById("adoptionDateOperator");
    const adoptionDateInput = document.getElementById("adoptionDateInput");

    const arriveDateOperator = document.getElementById("arriveDateOperator");
    const arriveDateInput = document.getElementById("arriveDateInput");

    const varcharOperator = document.getElementById("varcharOperator");
    const varcharInput = document.getElementById("varcharInput");

    const speciesOperator = document.getElementById("speciesOperator");
    const speciesSelect = document.getElementById("speciesSelect");
    const speciesInput = document.getElementById("speciesInput");

    const speciesSelectRadio = document.getElementById("speciesSelectRadio");

    const leftParenthesis = document.getElementById('leftParenthesis');
    const rightParenthesis = document.getElementById('rightParenthesis');

    const shelterSelectionSQL = document.getElementById('shelterSelectionSQL');
    const shelterSelectionText = document.getElementById('shelterSelectionText');
    const shelterAndOrSelect = document.getElementById('shelterAndOrSelect');
    const shelterAttributeSelect = document.getElementById('shelterAttributeSelect');
    const shelterSelectionSpans = document.querySelectorAll('.shelterSelectionConditions');
    const shelterIntOperator = document.getElementById("shelterIntOperator");
    const shelterIntInput = document.getElementById("shelterIntInput");
    const shelterVarcharOperator = document.getElementById("shelterVarcharOperator");
    const shelterVarcharInput = document.getElementById("shelterVarcharInput");
    const shelterLeftParenthesis = document.getElementById('shelterLeftParenthesis');
    const shelterRightParenthesis = document.getElementById('shelterRightParenthesis');
}
