import { readConfig } from './utils.js';
const config = await readConfig();

//  Get the dropdown element
const cpuDropdown = document.getElementById('selectCPU');
let selectedCpu = null;

// Get the static radio button elements
const filterRadiosManufacturers = document.querySelectorAll('input[name="cpuManufacturerFilter"]');
const filterRadiosIntegrated = document.querySelectorAll('input[name="cpuIntegratedFilter"]');
const filterRadiosCores = document.querySelectorAll('input[name="cpuCoresFilter"]');

// Fetch data from the API endpoint
var url = config.backendUrl + '/components/cpus';
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Populate the cpuDropdown with all options
        populateDropdown(data);

        // Attach event listeners to the manufacturer filter radios
        filterRadiosManufacturers.forEach(radio => {
            radio.addEventListener('change', updateDropdown);
        });

        // Attach event listeners to the generation filter radios
        filterRadiosIntegrated.forEach(radio => {
            radio.addEventListener('change', updateDropdown);
        });

        // Attach event listeners to the cores filter radios
        filterRadiosCores.forEach(radio => {
            radio.addEventListener('change', updateDropdown);
        });

        // Create socket filter dynamically
        createSocketFilter(data);

        function updateDropdown() {
            // Get the selected values from all filters
            const selectedManufacturer = document.querySelector('input[name="cpuManufacturerFilter"]:checked').value;
            const selectedIntegrated = document.querySelector('input[name="cpuIntegratedFilter"]:checked').value;
            const selectedCores = document.querySelector('input[name="cpuCoresFilter"]:checked').value;
            const selectedSocket = document.querySelector('input[name="cpuSocketFilter"]:checked').value;

            // Filter the options based on the selected filters
            const filteredOptions = data.filter(item =>
                (selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer) &&
                (selectedIntegrated === 'all' || item.has_integrated_graphics.toString() === selectedIntegrated) &&
                (selectedCores === 'all' || (selectedCores === 'moreThan8' ? item.num_physical_cores > 8 : item.num_physical_cores === parseInt(selectedCores, 10))) &&
                (selectedSocket === 'all' || item.socket == selectedSocket)
            );

            populateDropdown(filteredOptions);
        }

        function createSocketFilter(data) {
            // Check if data is an array and not empty
            if (!Array.isArray(data) || data.length === 0) {
                console.error('Invalid or empty data array.');
                return;
            }
        
            // Check if each item in data has the "socket" property
            if (!data.every(item => 'socket' in item)) {
                console.error('Data items should have a "socket" property.');
                return;
            }
        
            // Extract unique values for the socket property
            const uniqueSockets = [...new Set(data.map(item => item.socket))];
        
            // Assuming filterRadiosSocket is an existing container element
            const filterRadiosSocket = document.getElementById('cpuSocketFilter');

            filterRadiosSocket.addEventListener('change', function (event) {
                const selectedSocket = document.querySelector('input[name="cpuSocketFilter"]:checked');
        
                if (selectedSocket) {
                    const filteredOptions = data.filter(item => selectedSocket.value === 'all' || item.socket === selectedSocket.value);
                    populateDropdown(filteredOptions);
                } else {
                    // Handle case when no socket is selected, perhaps revert to the original data
                    populateDropdown(data);
                }
            });
            
            // Check if the container element exists
            if (!filterRadiosSocket) {
                console.error('Container element not found.');
                return;
            }
        
            // Create "All" option
            const allInput = document.createElement('input');
            allInput.type = 'radio';
            allInput.id = 'cpuSocketFilter_all';
            allInput.name = 'cpuSocketFilter';
            allInput.value = 'all';
            allInput.checked = true; // default to "All" selected
        
            const allLabel = document.createElement('label');
            allLabel.htmlFor = 'cpuSocketFilter_all';
            allLabel.textContent = 'All';
        
            filterRadiosSocket.appendChild(allInput);
            filterRadiosSocket.appendChild(allLabel);
        
            // Create radio buttons dynamically
            uniqueSockets.forEach(socket => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = `cpuSocketFilter_${socket}`;
                input.name = 'cpuSocketFilter';
                input.value = socket;
        
                const label = document.createElement('label');
                label.htmlFor = `cpuSocketFilter_${socket}`;
                label.textContent = socket;
        
                filterRadiosSocket.appendChild(input);
                filterRadiosSocket.appendChild(label);
            });
        }

    })
    .catch(error => console.error('Error fetching data:', error));
    

function populateDropdown(options) {
    // Clear existing options
    cpuDropdown.innerHTML = '';

    // Add a placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = ''; // You can set this to an empty string or any other value
    placeholderOption.textContent = '-'; // Your desired placeholder text
    cpuDropdown.appendChild(placeholderOption);

    // Populate the cpuDropdown with values from the "name" key
    options.forEach(item => {
        const option = document.createElement('option');
        //option.value = item.name;
        option.value = item.CPU_id;
        option.textContent = item.name;
        cpuDropdown.appendChild(option);
    });
}

// Add the event listener directly inside the module
cpuDropdown.addEventListener('change', function () {
    selectedCpu = cpuDropdown.value;
    //console.log(selectedCpu);
});

export { selectedCpu };