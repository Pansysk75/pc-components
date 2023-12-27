import {config} from './config.js';

function fetchBuild() {
    // Clear previous data
    document.getElementById("buildDetails").innerHTML = "";
    document.getElementById("storageDetails").innerHTML = "";

    var buildId = document.getElementById('buildId').value;
    var url = config.backendUrl + '/build/' + buildId;
    console.log('Fetching build from ' + url);
    // If response is successful, parse the JSON and display the build
    // Else, display the error
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('Build not found');
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(build => displayBuild(build))
        .catch(error => displayError(error));
}

// Hook to getBuild button
var getBuildButton = document.getElementById('getBuild');
getBuildButton.addEventListener('click', fetchBuild);


function displayBuild(build) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    // Create header row
    var headerRow = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    th1.textContent = "Component";
    th2.textContent = "Name";
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    tbody.appendChild(headerRow);

    // Create rows for each key-value pair
    for (var key in build) {
      var row = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      
      if(key !== "storage") {
        td1.textContent = key;
        td2.textContent = build[key];
      }  

      
      row.appendChild(td1);
      row.appendChild(td2);
      tbody.appendChild(row);
    }

    // Append the tbody to the table
    table.appendChild(tbody);

    // Append the table to the specified div
    document.getElementById("buildDetails").appendChild(table);

    displayStorage(build);
}

function displayStorage(build) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    // Create header row
    var headerRow = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    th1.textContent = "Storage Component";
    th2.textContent = "Name";
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    tbody.appendChild(headerRow);

    console.log("built is " + typeof(build['storage']));
    console.log(build['storage']);
    // Create rows for each key-value pair
    for (let i=0 ; i<build['storage'].length ; i++){
        for (var key in build['storage'][i]) {
        
            var row = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            
            
            td1.textContent = key;
            td2.textContent = build['storage'][i][key];
              
      
            
            row.appendChild(td1);
            row.appendChild(td2);
            tbody.appendChild(row);
          }
    }

    // Append the tbody to the table
    table.appendChild(tbody);

    // Append the table to the specified div
    document.getElementById("storageDetails").appendChild(table);
}


function displayError(error) {
    var buildDetails = document.getElementById('buildDetails');
    buildDetails.innerHTML = error;
}

