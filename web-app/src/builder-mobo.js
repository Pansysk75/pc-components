import { readConfig } from './utils.js';
const config = await readConfig();

//  Get the dropdown element
const moboDropdown = document.getElementById('selectMOBO');
let selectedMobo = null;

// Get the static radio button elements
const filterRadiosMemory = document.querySelectorAll('input[name="moboSlotsFilter"]');
const filterRadiosDDR = document.querySelectorAll('input[name="moboDDRFilter"]');
const filterRadiosFormFactor = document.querySelectorAll('input[name="moboFormFactorFilter"]');

// Fetch data from the API endpoint
var url = config.backendUrl + '/components/mobos';
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Populate the moboDropdown with all options
        populateDropdown(data);

        // Attach event listeners to the memory slots filter radios
        filterRadiosMemory.forEach(radio => {
            radio.addEventListener('change', updateDropdown);
        });

        // Attach event listeners to the ddr generation filter radios
        filterRadiosDDR.forEach(radio => { 
            radio.addEventListener('change', updateDropdown);
        });

        // Attach event listeners to the form factor filter radios
        filterRadiosFormFactor.forEach(radio => { 
            radio.addEventListener('change', updateDropdown);
        });
        
        
        // Create filters dynamically
        createSocketFilter(data);
        createManufacturerFilter(data);

        function updateDropdown() {
            // Get the selected values from all filters
            const selectedManufacturer = document.querySelector('input[name="MoboManufacturerFilter"]:checked').value;
            const selectedSocket = document.querySelector('input[name="MoboSocketFilter"]:checked').value;
            const selectedMemorySlots = document.querySelector('input[name="moboSlotsFilter"]:checked').value;
            const selectedDDR = document.querySelector('input[name="moboDDRFilter"]:checked').value;
            const selectedFormFactor = document.querySelector('input[name="moboFormFactorFilter"]:checked').value;
        
            // Filter the options based on the selected filters
            const filteredOptions = data.filter(item =>
                ((selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer)) &&
                (selectedSocket === 'all' || item.socket == selectedSocket) &&
                (selectedMemorySlots === 'all' || item.num_memory_slots === parseInt(selectedMemorySlots, 10)) && (selectedDDR === 'all' || item.ddr_generation === selectedDDR) && (selectedFormFactor === 'all' || item.form_factor === selectedFormFactor)
            );
        
            populateDropdown(filteredOptions);
        }

        
        function createManufacturerFilter(data) {
            // Check if data is an array and not empty
            if (!Array.isArray(data) || data.length === 0) {
                console.error('Invalid or empty data array.');
                return;
            }
    
            // Check if each item in data has the "Manufacturer_name" property
            if (!data.every(item => 'Manufacturer_name' in item)) {
                console.error('Data items should have a "Manufacturer_name" property.');
                return;
            }
    
            // Extract unique values for the Manufacturer_name property
            const uniqueManufacturers = [...new Set(data.map(item => item.Manufacturer_name))];
    
            // Assuming filterRadiosManufacturer is an existing container element
            const filterRadiosManufacturer = document.getElementById('moboManufacturerFilter');
    
            // Check if the container element exists
            if (!filterRadiosManufacturer) {
                console.error('Container element not found.');
                return;
            }
    
            // Create "All" option
            const allInput = document.createElement('input');
            allInput.type = 'radio';
            allInput.id = 'MoboManufacturerFilter_all';
            allInput.name = 'MoboManufacturerFilter';
            allInput.value = 'all';
            allInput.checked = true; // default to "All" selected
    
            const allLabel = document.createElement('label');
            allLabel.htmlFor = 'MoboManufacturerFilter_all';
            allLabel.textContent = 'All';
    
            filterRadiosManufacturer.appendChild(allInput);
            filterRadiosManufacturer.appendChild(allLabel);
    
            // Create radio buttons dynamically
            uniqueManufacturers.forEach(manufacturer => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = `MoboManufacturerFilter_${manufacturer}`;
                input.name = 'MoboManufacturerFilter';
                input.value = manufacturer;
    
                const label = document.createElement('label');
                label.htmlFor = `MoboManufacturerFilter_${manufacturer}`;
                label.textContent = manufacturer;
    
                filterRadiosManufacturer.appendChild(input);
                filterRadiosManufacturer.appendChild(label);
    
                // Attach event listener to each radio button
                input.addEventListener('change', function () {
                    const selectedManufacturer = document.querySelector('input[name="MoboManufacturerFilter"]:checked');
                    if (selectedManufacturer) {
                        const filteredOptions = data.filter(item => selectedManufacturer.value === 'all' || item.Manufacturer_name === selectedManufacturer.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no manufacturer is selected
                        populateDropdown(data);
                    }
                });
            });

            // Find the "All" radio button
            const allManufacturerRadio = document.getElementById('MoboManufacturerFilter_all');

            // Add a click event listener to the "All" radio button
            allManufacturerRadio.addEventListener('click', function () {
                const selectedManufacturer = document.querySelector('input[name="MoboManufacturerFilter"]:checked');
                if (selectedManufacturer) {
                    const filteredOptions = data.filter(item => selectedManufacturer.value === 'all' || item.Manufacturer_name === selectedManufacturer.value);
                    populateDropdown(filteredOptions);
                } else {
                    // Handle case when no manufacturer is selected
                    populateDropdown(data);
                }
            });
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
            const filterRadiosSocket = document.getElementById('MoboSocketFilter');

            filterRadiosSocket.addEventListener('change', function (event) {
                const selectedSocket = document.querySelector('input[name="MoboSocketFilter"]:checked');
        
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
            allInput.id = 'MoboSocketFilter_all';
            allInput.name = 'MoboSocketFilter';
            allInput.value = 'all';
            allInput.checked = true; // default to "All" selected
        
            const allLabel = document.createElement('label');
            allLabel.htmlFor = 'MoboSocketFilter_all';
            allLabel.textContent = 'All';
        
            filterRadiosSocket.appendChild(allInput);
            filterRadiosSocket.appendChild(allLabel);
        
            // Create radio buttons dynamically
            uniqueSockets.forEach(socket => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = `MoboSocketFilter_${socket}`;
                input.name = 'MoboSocketFilter';
                input.value = socket;
        
                const label = document.createElement('label');
                label.htmlFor = `MoboSocketFilter_${socket}`;
                label.textContent = socket;
        
                filterRadiosSocket.appendChild(input);
                filterRadiosSocket.appendChild(label);
            });
        }

    })
    .catch(error => console.error('Error fetching data:', error));
    

function populateDropdown(options) {
    // Clear existing options
    moboDropdown.innerHTML = '';

    // Add a placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = ''; // You can set this to an empty string or any other value
    placeholderOption.textContent = '-'; // Your desired placeholder text
    moboDropdown.appendChild(placeholderOption);

    // Populate the moboDropdown with values from the "name" key
    options.forEach(item => {
        const option = document.createElement('option');
        //option.value = item.name;
        option.value = item.MOBO_id;
        option.textContent = item.name;
        moboDropdown.appendChild(option);
    });
}

// Add the event listener directly inside the module
moboDropdown.addEventListener('change', function () {
    selectedMobo = moboDropdown.value;
    //console.log(selectedMobo);
});

export { selectedMobo };