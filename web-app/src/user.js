import { readConfig } from './utils.js';
const config = await readConfig();

function deleteBuild(buildId) {
    // Send a DELETE request to the backend API
    // This is completely unsafe bc this is client-side code and anyone can send a DELETE request to the API
    const url = `${config.backendUrl}/build/${buildId}`;
    return fetch(url, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
            }
        });
}

function onDeleteButtonClick(event) {
    // Get the buildId from the button's value
    const buildId = this.value;

    // Delete the build
    deleteBuild(buildId).then(() => {
        // Refresh the page
        window.location.reload();
    })
        .catch(error => {
            console.error(error);
            alert(`Failed to delete build: ${error}`);
        });
}

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {

// For all buttons of class "delete-build", set event listener to delete the build
    const deleteButtons = document.getElementsByClassName('delete-build');
    for (const button of deleteButtons) {
        button.addEventListener('click', onDeleteButtonClick);
    }

});
