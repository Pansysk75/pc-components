async function readConfig() {
    // (This could be cached, since it's not supposed to change during runtime)
    // Fetch config from backend
    let config = await fetch('/config.json')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log("Error fetching config: ");
            console.log(error);
        });

    return config;
}

// Export functions
export { readConfig };