import {config} from './config.js';

function fetchBuild() {
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
        .then(build => displayBuild(build, "", document.getElementById("buildDetails")))
        .catch(error => displayError(error));
}

// Hook to getBuild button
var getBuildButton = document.getElementById('getBuild');
getBuildButton.addEventListener('click', fetchBuild);

// function displayBuild(build) {
//     console.log(typeof(build));
//     var buildDetails = document.getElementById('buildDetails');
//     buildDetails.innerHTML = JSON.stringify(build, null, 2);
// }


// function displayBuild(build, parentKey = "", container) {
//     var table = document.createElement("table");
//     var tbody = document.createElement("tbody");

//     // Create header row
//     var headerRow = document.createElement("tr");
//     var th1 = document.createElement("th");
//     var th2 = document.createElement("th");
//     th1.textContent = "Key";
//     th2.textContent = "Value";
//     headerRow.appendChild(th1);
//     headerRow.appendChild(th2);
//     tbody.appendChild(headerRow);

//     console.log(typeof(build));
//     for (var key in build) {
//         var row = document.createElement("tr");
//         var td1 = document.createElement("td");
//         var td2 = document.createElement("td");
//         td1.textContent = key;
//         // td2.textContent = build[key];
//         if (typeof build[key] === 'object' && build[key] !== null) {
//             var nestedDiv = document.getElementById("storageDetails");
//             nestedDiv.classList.add("nested-table"); // Add a class for styling
//             td2.appendChild(nestedDiv);
//             displayBuild(build[key], parentKey + key + ".", nestedDiv);
//         } else {
//             td2.textContent = build[key];
//         }
//         row.appendChild(td1);
//         row.appendChild(td2);
//         tbody.appendChild(row);
//     }

//     table.appendChild(tbody);
//     container.appendChild(table);

//     // Append the table to the specified div
//     document.getElementById('buildDetails').appendChild(table);

//     // var buildDetails = document.getElementById('buildDetails');
//     // buildDetails.innerHTML = JSON.stringify(build, null, 2);
// }

function displayBuild(build, parentKey = "", container) {
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
        td1.textContent = parentKey + key; // Display nested key with its parent key
        // Check if the value is an object (nested object)
        if (typeof build[key] === 'object' && build[key] !== null) {
          // If it's an object, create a new container (div) for the nested table
          var nestedDiv = document.createElement("div");
          nestedDiv.classList.add("nested-table"); // Add a class for styling
          td2.appendChild(nestedDiv);
          // Recursively call the displayBuild function with the new container
          displayBuild(build[key], parentKey + key + ".", nestedDiv);
        } else {
          td2.textContent = build[key];
        }
        row.appendChild(td1);
        row.appendChild(td2);
        tbody.appendChild(row);
      }
    
      // Append the tbody to the table
      table.appendChild(tbody);
    
      // Append the table to the specified container
      container.appendChild(table);
  }


function displayError(error) {
    var buildDetails = document.getElementById('buildDetails');
    buildDetails.innerHTML = error;
}

