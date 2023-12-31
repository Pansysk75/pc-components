import {selectedCpu} from './builder-cpu.js';
import {selectedMobo} from './builder-mobo.js';
import {selectedRam} from './builder-ram.js';
import {selectedGpu} from './builder-gpu.js';
import {selectedStorage} from './builder-storage.js';
import {selectedPsu} from './builder-psu.js';
import {selectedCase} from './builder-case.js';
import {config} from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveBuildButton');
    const buildNameField = document.getElementById('buildName');

    saveButton.addEventListener('click', function () {
        // Access the value of the text area
        const buildName = buildNameField.value;

        // Access selected values
        const newBuild = {
            "name": buildName,
            "Username": usernameFromSession,
            "CPU_id": selectedCpu,
            "MOBO_id": selectedMobo,
            "RAM_id": selectedRam,
            "PSU_id": selectedPsu,
            "Case_id": selectedCase,
            "GPU_id": selectedGpu,
            "storage_ids": [parseInt(selectedStorage, 10)]
        };


        console.log(newBuild);
        
        // URL of the endpoint
        const endpointUrl = config.backendUrl + '/build';
        
        // Configuration for the fetch request
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBuild) // Convert the data to JSON format
        };
        
        // Make the POST request
        fetch(endpointUrl, requestOptions)
            .then(response => {
            // Check if the request was successful (status code in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
            })
            .then(data => {
            // Handle the response data
            console.log('Response data:', data);
            })
            .catch(error => {
            // Handle errors
            console.error('Error:', error);
            });

    });

});
