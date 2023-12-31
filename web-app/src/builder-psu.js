import {config} from './config.js';

//  Get the psuDropdown element
const psuDropdown = document.getElementById('selectPSU');
let selectedPsu = null;

document.addEventListener('DOMContentLoaded', function () {
    // Get the static radio button elements
    const filterRadiosModularity = document.querySelectorAll('input[name="psuModularityFilter"]');
    const filterRadiosFormFactor = document.querySelectorAll('input[name="psuFormFactorFilter"]');
    const filterRadiosEfficiency = document.querySelectorAll('input[name="psuEfficiencyFilter"]');

    // Fetch data from the API endpoint
    var url = config.backendUrl + '/components/psus';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with all options
            populateDropdown(data);

            // Attach event listeners to the modularity filter radios
            filterRadiosModularity.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });

            // Attach event listeners to the form factor filter radios
            filterRadiosFormFactor.forEach(radio => { 
                radio.addEventListener('change', updateDropdown);
            });

            // Attach event listeners to the efficiency filter radios
            filterRadiosEfficiency.forEach(radio => { 
                radio.addEventListener('change', updateDropdown);
            });
            
            // Create filters dynamically
            createManufacturerFilter(data);
            createWattageFilter(data);

            function updateDropdown() {
                // Get the selected values from all filters
                const selectedManufacturer = document.querySelector('input[name="psuManufacturerFilter"]:checked').value;
                const selectedWattage = document.querySelector('input[name="psuWattageFilter"]:checked').value;
                const selectedModularity = document.querySelector('input[name="psuModularityFilter"]:checked').value;
                const selectedFormFactor = document.querySelector('input[name="psuFormFactorFilter"]:checked').value;
                const selectedEfficiency = document.querySelector('input[name="psuEfficiencyFilter"]:checked').value;
            
                // Filter the options based on the selected filters
                const filteredOptions = data.filter(item =>
                    ((selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer)) && 
                    (selectedWattage === 'all' || item.wattage == selectedWattage(selectedWattage,10)) && (selectedModularity === 'all' || item.modularity === selectedModularity) && (selectedEfficiency === 'all' || item.efficiency_certification === selectedEfficiency) && (selectedFormFactor === 'all' || item.form_factor === selectedFormFactor)
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
                const filterRadiosManufacturer = document.getElementById('psuManufacturerFilter');
        
                // Check if the container element exists
                if (!filterRadiosManufacturer) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'psuManufacturerFilter_all';
                allInput.name = 'psuManufacturerFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'psuManufacturerFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosManufacturer.appendChild(allInput);
                filterRadiosManufacturer.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueManufacturers.forEach(manufacturer => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `psuManufacturerFilter_${manufacturer}`;
                    input.name = 'psuManufacturerFilter';
                    input.value = manufacturer;
        
                    const label = document.createElement('label');
                    label.htmlFor = `psuManufacturerFilter_${manufacturer}`;
                    label.textContent = manufacturer;
        
                    filterRadiosManufacturer.appendChild(input);
                    filterRadiosManufacturer.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedManufacturer = document.querySelector('input[name="psuManufacturerFilter"]:checked');
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
                const allManufacturerRadio = document.getElementById('psuManufacturerFilter_all');

                // Add a click event listener to the "All" radio button
                allManufacturerRadio.addEventListener('click', function () {
                    const selectedManufacturer = document.querySelector('input[name="psuManufacturerFilter"]:checked');
                    if (selectedManufacturer) {
                        const filteredOptions = data.filter(item => selectedManufacturer.value === 'all' || item.Manufacturer_name === selectedManufacturer.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no manufacturer is selected
                        populateDropdown(data);
                    }
                });
            }
            
            function createWattageFilter(data) {
                // Check if data is an array and not empty
                if (!Array.isArray(data) || data.length === 0) {
                    console.error('Invalid or empty data array.');
                    return;
                }
        
                // Check if each item in data has the "wattage" property
                if (!data.every(item => 'wattage' in item)) {
                    console.error('Data items should have a "wattage" property.');
                    return;
                }
        
                // Extract unique values for the wattage property
                const uniqueWattages = [...new Set(data.map(item => item.wattage))];
                uniqueWattages.sort((a, b) => a - b);
        
                // Assuming filterRadiosWattages is an existing container element
                const filterRadiosWattages = document.getElementById('psuWattageFilter');
        
                // Check if the container element exists
                if (!filterRadiosWattages) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'psuWattageFilter_all';
                allInput.name = 'psuWattageFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'psuWattageFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosWattages.appendChild(allInput);
                filterRadiosWattages.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueWattages.forEach(wattage => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `psuWattageFilter_${wattage}`;
                    input.name = 'psuWattageFilter';
                    input.value = wattage;
        
                    const label = document.createElement('label');
                    label.htmlFor = `psuWattageFilter_${wattage}`;
                    label.textContent = wattage;
        
                    filterRadiosWattages.appendChild(input);
                    filterRadiosWattages.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedWattage = document.querySelector('input[name="psuWattageFilter"]:checked');
                        if (selectedWattage) {
                            const filteredOptions = data.filter(item => selectedWattage.value === 'all' || item.wattage == selectedWattage.value);
                            populateDropdown(filteredOptions);
                        } else {
                            // Handle case when no wattage is selected
                            populateDropdown(data);
                        }
                    });
                });

                // Find the "All" radio button
                const allWattageRadio = document.getElementById('psuWattageFilter_all');

                // Add a click event listener to the "All" radio button
                allWattageRadio.addEventListener('click', function () {
                    const selectedWattage = document.querySelector('input[name="psuWattageFilter"]:checked');
                    if (selectedWattage) {
                        const filteredOptions = data.filter(item => selectedWattage.value === 'all' || item.wattage === selectedWattage.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no wattage is selected
                        populateDropdown(data);
                    }
                });
            }

        })
        .catch(error => console.error('Error fetching data:', error));
        

    function populateDropdown(options) {
        // Clear existing options
        psuDropdown.innerHTML = '';

        // Add a placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = ''; // You can set this to an empty string or any other value
        placeholderOption.textContent = '-'; // Your desired placeholder text
        psuDropdown.appendChild(placeholderOption);

        // Populate the psuDropdown with values from the "name" key
        options.forEach(item => {
            const option = document.createElement('option');
            //option.value = item.name;
            option.value = item.PSU_id;
            option.textContent = item.name;
            psuDropdown.appendChild(option);
        });
    }
    
});

// Add the event listener directly inside the module
psuDropdown.addEventListener('change', function () {
    selectedPsu = psuDropdown.value;
    console.log(selectedPsu);
});

export { selectedPsu };