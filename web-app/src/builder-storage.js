import {config} from './config.js';

//  Get the dropdown element
const storageDropdown = document.getElementById('selectStorage');
let selectedStorage = null;

document.addEventListener('DOMContentLoaded', function () {
    // Get the static radio button elements
    const filterRadiosType = document.querySelectorAll('input[name="storageTypeFilter"]');
    const filterRadiosFormFactor = document.querySelectorAll('input[name="storageFormFactorFilter"]');
    const filterRadiosConnectivity = document.querySelectorAll('input[name="storageConnectivityFilter"]');
    

    // Fetch data from the API endpoint
    var url = config.backendUrl + '/components/storages';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the storageDropdown with all options
            populateDropdown(data);

            // Attach event listeners to the storage type filter radios
            filterRadiosType.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });

            // Attach event listeners to the storage form factor filter radios
            filterRadiosFormFactor.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });

            // Attach event listeners to the storage connectivity filter radios
            filterRadiosConnectivity.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });
            
            // Create filters dynamically
            createManufacturerFilter(data);
            createCapacityFilter(data);

            function updateDropdown() {
                // Get the selected values from all filters
                const selectedManufacturer = document.querySelector('input[name="storageManufacturerFilter"]:checked').value;
                const selectedCapacity = document.querySelector('input[name="storageCapacityFilter"]:checked').value;
                const selectedType = document.querySelector('input[name="storageTypeFilter"]:checked').value;
                const selectedFormFactor = document.querySelector('input[name="storageFormFactorFilter"]:checked').value;
                const selectedConnectivity = document.querySelector('input[name="storageConnectivityFilter"]:checked').value;
            
                // Filter the options based on the selected filters
                const filteredOptions = data.filter(item =>
                    (selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer) && (selectedCapacity === 'all' || item.capacity == selectedCapacity) && (selectedType === 'all' || item.type === selectedType) && (selectedFormFactor === 'all' || item.form_factor === selectedFormFactor) && (selectedConnectivity === 'all' || item.connectivity === selectedConnectivity) 
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
                const filterRadiosManufacturer = document.getElementById('storageManufacturerFilter');
        
                // Check if the container element exists
                if (!filterRadiosManufacturer) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'storageManufacturerFilter_all';
                allInput.name = 'storageManufacturerFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'storageManufacturerFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosManufacturer.appendChild(allInput);
                filterRadiosManufacturer.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueManufacturers.forEach(manufacturer => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `storageManufacturerFilter_${manufacturer}`;
                    input.name = 'storageManufacturerFilter';
                    input.value = manufacturer;
        
                    const label = document.createElement('label');
                    label.htmlFor = `storageManufacturerFilter_${manufacturer}`;
                    label.textContent = manufacturer;
        
                    filterRadiosManufacturer.appendChild(input);
                    filterRadiosManufacturer.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedManufacturer = document.querySelector('input[name="storageManufacturerFilter"]:checked');
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
                const allManufacturerRadio = document.getElementById('storageManufacturerFilter_all');

                // Add a click event listener to the "All" radio button
                allManufacturerRadio.addEventListener('click', function () {
                    const selectedManufacturer = document.querySelector('input[name="storageManufacturerFilter"]:checked');
                    if (selectedManufacturer) {
                        const filteredOptions = data.filter(item => selectedManufacturer.value === 'all' || item.Manufacturer_name === selectedManufacturer.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no manufacturer is selected
                        populateDropdown(data);
                    }
                });
            }

            function createCapacityFilter(data) {
                // Check if data is an array and not empty
                if (!Array.isArray(data) || data.length === 0) {
                    console.error('Invalid or empty data array.');
                    return;
                }
        
                // Check if each item in data has the "capacity" property
                if (!data.every(item => 'capacity' in item)) {
                    console.error('Data items should have a "capacity" property.');
                    return;
                }
        
                // Extract unique values for the capacity property
                const uniqueCapacities = [...new Set(data.map(item => item.capacity))];
                uniqueCapacities.sort((a, b) => a - b);
        
                // Assuming filterRadiosCapacity is an existing container element
                const filterRadiosCapacity = document.getElementById('storageCapacityFilter');
        
                // Check if the container element exists
                if (!filterRadiosCapacity) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'storageCapacityFilter_all';
                allInput.name = 'storageCapacityFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'storageCapacityFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosCapacity.appendChild(allInput);
                filterRadiosCapacity.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueCapacities.forEach(capacity => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `storageCapacityFilter_${capacity}`;
                    input.name = 'storageCapacityFilter';
                    input.value = capacity;
        
                    const label = document.createElement('label');
                    label.htmlFor = `storageCapacityFilter_${capacity}`;
                    label.textContent = capacity;
        
                    filterRadiosCapacity.appendChild(input);
                    filterRadiosCapacity.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedCapacity = document.querySelector('input[name="storageCapacityFilter"]:checked');
                        if (selectedCapacity) {
                            const filteredOptions = data.filter(item => selectedCapacity.value === 'all' || item.capacity == selectedCapacity.value);
                            populateDropdown(filteredOptions);
                        } else {
                            // Handle case when no capacity is selected
                            populateDropdown(data);
                        }
                    });
                });

                // Find the "All" radio button
                const allCapacityRadio = document.getElementById('storageCapacityFilter_all');

                // Add a click event listener to the "All" radio button
                allCapacityRadio.addEventListener('click', function () {
                    const selectedCapacity = document.querySelector('input[name="storageCapacityFilter"]:checked');
                    if (selectedCapacity) {
                        const filteredOptions = data.filter(item => selectedCapacity.value === 'all' || item.capacity === selectedCapacity.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no capacity is selected
                        populateDropdown(data);
                    }
                });
            }

            
        })
        .catch(error => console.error('Error fetching data:', error));
        

    function populateDropdown(options) {
        // Clear existing options
        storageDropdown.innerHTML = '';

        // Add a placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = ''; // You can set this to an empty string or any other value
        placeholderOption.textContent = '-'; // Your desired placeholder text
        storageDropdown.appendChild(placeholderOption);

        // Populate the storageDropdown with values from the "name" key
        options.forEach(item => {
            const option = document.createElement('option');
            //option.value = item.name;
            option.value = item.Storage_id;
            option.textContent = item.name;
            storageDropdown.appendChild(option);
        });
    }
    
});

// Add the event listener directly inside the module
storageDropdown.addEventListener('change', function () {
    selectedStorage = storageDropdown.value;
    console.log(selectedStorage);
});

export { selectedStorage };