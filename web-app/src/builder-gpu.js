import {config} from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    // Get the dropdown element and the static radio button elements
    const dropdown = document.getElementById('selectGPU');
    const filterRadiosMemory = document.querySelectorAll('input[name="gpuGDDRFilter"]');
    const filterRadiosPCIE = document.querySelectorAll('input[name="gpuPCIEFilter"]');
    

    // Fetch data from the API endpoint
    var url = config.backendUrl + '/components/gpus';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with all options
            populateDropdown(data);

            // Attach event listeners to the memory type filter radios
            filterRadiosMemory.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });

            // Attach event listeners to the pcie filter radios
            filterRadiosPCIE.forEach(radio => {
                radio.addEventListener('change', updateDropdown);
            });
            
            // Create filters dynamically
            createWattageFilter(data);
            createManufacturerFilter(data)

            function updateDropdown() {
                // Get the selected values from all filters
                const selectedManufacturer = document.querySelector('input[name="gpuManufacturerFilter"]:checked').value;
                const selectedWattage = document.querySelector('input[name="gpuWattageFilter"]:checked').value;
                const selectedMemory = document.querySelector('input[name="gpuGDDRFilter"]:checked').value;
                const selectedPCIE = document.querySelector('input[name="gpuPCIEFilter"]:checked').value;
            
                // Filter the options based on the selected filters
                const filteredOptions = data.filter(item =>
                    (selectedManufacturer === 'all' || item.Manufacturer_name === selectedManufacturer) && (selectedWattage === 'all' || item.min_psu_wattage == selectedWattage) && (selectedMemory === 'all' || item.memory_type === selectedMemory) && (selectedPCIE === 'all' || item.pcie_gen === selectedPCIE) 
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
                const filterRadiosManufacturer = document.getElementById('gpuManufacturerFilter');
        
                // Check if the container element exists
                if (!filterRadiosManufacturer) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'gpuManufacturerFilter_all';
                allInput.name = 'gpuManufacturerFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'gpuManufacturerFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosManufacturer.appendChild(allInput);
                filterRadiosManufacturer.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueManufacturers.forEach(manufacturer => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `gpuManufacturerFilter_${manufacturer}`;
                    input.name = 'gpuManufacturerFilter';
                    input.value = manufacturer;
        
                    const label = document.createElement('label');
                    label.htmlFor = `gpuManufacturerFilter_${manufacturer}`;
                    label.textContent = manufacturer;
        
                    filterRadiosManufacturer.appendChild(input);
                    filterRadiosManufacturer.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedManufacturer = document.querySelector('input[name="gpuManufacturerFilter"]:checked');
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
                const allManufacturerRadio = document.getElementById('gpuManufacturerFilter_all');

                // Add a click event listener to the "All" radio button
                allManufacturerRadio.addEventListener('click', function () {
                    const selectedManufacturer = document.querySelector('input[name="gpuManufacturerFilter"]:checked');
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
        
                // Check if each item in data has the "min_psu_wattage" property
                if (!data.every(item => 'min_psu_wattage' in item)) {
                    console.error('Data items should have a "min_psu_wattage" property.');
                    return;
                }
        
                // Extract unique values for the min_psu_wattage property
                const uniqueWattages = [...new Set(data.map(item => item.min_psu_wattage))];
                uniqueWattages.sort((a, b) => a - b);
        
                // Assuming filterRadiosWattages is an existing container element
                const filterRadiosWattages = document.getElementById('gpuWattageFilter');
        
                // Check if the container element exists
                if (!filterRadiosWattages) {
                    console.error('Container element not found.');
                    return;
                }
        
                // Create "All" option
                const allInput = document.createElement('input');
                allInput.type = 'radio';
                allInput.id = 'gpuWattageFilter_all';
                allInput.name = 'gpuWattageFilter';
                allInput.value = 'all';
                allInput.checked = true; // default to "All" selected
        
                const allLabel = document.createElement('label');
                allLabel.htmlFor = 'gpuWattageFilter_all';
                allLabel.textContent = 'All';
        
                filterRadiosWattages.appendChild(allInput);
                filterRadiosWattages.appendChild(allLabel);
        
                // Create radio buttons dynamically
                uniqueWattages.forEach(min_psu_wattage => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `gpuWattageFilter_${min_psu_wattage}`;
                    input.name = 'gpuWattageFilter';
                    input.value = min_psu_wattage;
        
                    const label = document.createElement('label');
                    label.htmlFor = `gpuWattageFilter_${min_psu_wattage}`;
                    label.textContent = min_psu_wattage;
        
                    filterRadiosWattages.appendChild(input);
                    filterRadiosWattages.appendChild(label);
        
                    // Attach event listener to each radio button
                    input.addEventListener('change', function () {
                        const selectedWattage = document.querySelector('input[name="gpuWattageFilter"]:checked');
                        if (selectedWattage) {
                            const filteredOptions = data.filter(item => selectedWattage.value === 'all' || item.min_psu_wattage == selectedWattage.value);
                            populateDropdown(filteredOptions);
                        } else {
                            // Handle case when no wattage is selected
                            populateDropdown(data);
                        }
                    });
                });

                // Find the "All" radio button
                const allWattageRadio = document.getElementById('gpuWattageFilter_all');

                // Add a click event listener to the "All" radio button
                allWattageRadio.addEventListener('click', function () {
                    const selectedWattage = document.querySelector('input[name="gpuWattageFilter"]:checked');
                    if (selectedWattage) {
                        const filteredOptions = data.filter(item => selectedWattage.value === 'all' || item.min_psu_wattage === selectedWattage.value);
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
        dropdown.innerHTML = '';

        // Populate the dropdown with values from the "name" key
        options.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            dropdown.appendChild(option);
        });
    }
    
});