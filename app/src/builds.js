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
        .then(build => displayBuild(build))
        .catch(error => displayError(error));
}

// Hook to getBuild button
var getBuildButton = document.getElementById('getBuild');
getBuildButton.addEventListener('click', fetchBuild);

function displayBuild(build) {
    console.log(typeof(build));
    var buildDetails = document.getElementById('buildDetails');
    buildDetails.innerHTML = JSON.stringify(build, null, 2);
}

function displayError(error) {
    var buildDetails = document.getElementById('buildDetails');
    buildDetails.innerHTML = error;
}

