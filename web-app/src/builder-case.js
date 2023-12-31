import {config} from './config.js';

//  Get the dropdown element
const caseDropdown = document.getElementById('selectCase');
let selectedCase = null;

document.addEventListener('DOMContentLoaded', function () {
    // Get the static radio button elements
    const filterRadiosFormFactor = document.querySelectorAll('input[name="caseFormFactorFilter"]');

    // Fetch data from the API endpoint
    var url = config.backendUrl + '/components/cases';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the caseDropdown with all options
            populateDropdown(data);

            // Attach event listeners to the form factor filter radios
            filterRadiosFormFactor.forEach(radio => { 
                radio.addEventListener('change', updateDropdown);
            });
            
            
            // Create filters dynamically
            createManufacturerFilter(data);

            function updateDropdown() {
                // Get the selected values from all filters
                const selectedManufacturer = document.querySelector('input[name="caseManufacturerFilter"]:checked').value;
                const selectedFormFactor = document.querySelector('input[name="caseFormFactorFilter"]:checked').value;
            
                // Filter the options based on the selected filters
                const filteredOptions = data.filter(item =>
                    ((selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer)) && (selectedFormFactor === 'all' || item.mobo_form_factor === selectedFormFactor)
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
                const filterRadiosManufacturer = document.getElementById('caseManufacturerFilter');
        
                // Check if the container element exists
                if (!filterRadiosManufacturer) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'caseManufacturerFilter_all';
                allInput.name = 'caseManufacturerFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'caseManufacturerFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosManufacturer.appendChild(allInput);
                filterRadiosManufacturer.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueManufacturers.forEach(manufacturer => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `caseManufacturerFilter_${manufacturer}`;
                    input.name = 'caseManufacturerFilter';
                    input.value = manufacturer;
        
                    const label = document.createElement('label');
                    label.htmlFor = `caseManufacturerFilter_${manufacturer}`;
                    label.textContent = manufacturer;
        
                    filterRadiosManufacturer.appendChild(input);
                    filterRadiosManufacturer.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedManufacturer = document.querySelector('input[name="caseManufacturerFilter"]:checked');
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
                const allManufacturerRadio = document.getElementById('caseManufacturerFilter_all');

                // Add a click event listener to the "All" radio button
                allManufacturerRadio.addEventListener('click', function () {
                    const selectedManufacturer = document.querySelector('input[name="caseManufacturerFilter"]:checked');
                    if (selectedManufacturer) {
                        const filteredOptions = data.filter(item => selectedManufacturer.value === 'all' || item.Manufacturer_name === selectedManufacturer.value);
                        populateDropdown(filteredOptions);
                    } else {
                        // Handle case when no manufacturer is selected
                        populateDropdown(data);
                    }
                });
            }

        })
        .catch(error => console.error('Error fetching data:', error));
        

    function populateDropdown(options) {
        // Clear existing options
        caseDropdown.innerHTML = '';

        // Add a placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = ''; // You can set this to an empty string or any other value
        placeholderOption.textContent = '-'; // Your desired placeholder text
        caseDropdown.appendChild(placeholderOption);

        // Populate the caseDropdown with values from the "name" key
        options.forEach(item => {
            const option = document.createElement('option');
            //option.value = item.name;
            option.value = item.Case_id;
            option.textContent = item.name;
            caseDropdown.appendChild(option);
        });
    }
    
});

// Add the event listener directly inside the module
caseDropdown.addEventListener('change', function () {
    selectedCase = caseDropdown.value;
    //console.log(selectedCase);
});

export { selectedCase };