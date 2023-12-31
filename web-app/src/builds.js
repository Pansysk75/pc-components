import { config } from "./config.js";

let _favorites = {};
let _username = "";

function getFavorites(username) {
    return new Promise((resolve, reject) => {
        const backendUrl = config.backendUrl + "/user/" + username + "/favorites";

        // Get favorites from api
        console.log("Fetching favorites from " + backendUrl);
        fetch(backendUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(favorites => {
            resolve(favorites); // Resolve the promise with the favorites
        })
        .catch(error => {
            reject(error); // Reject the promise with the error
        });
    });
}

// Post favorite to api
function postFavorite(username, build_id) {
    return new Promise((resolve, reject) => {
        const backendUrl = config.backendUrl + "/user/" + username + "/favorites";
        let new_favorite = {
            "Build_id": build_id
        }
        console.log("Posting favorite to " + backendUrl);
        fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_favorite)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            resolve(); // Resolve the promise
        })
        .catch(error => {
            reject(error); // Reject the promise with the error
        });
    });
}

// Delete favorite from api
function deleteFavorite(username, build_id) {
    return new Promise((resolve, reject) => {
        const backendUrl = config.backendUrl + "/user/" + username + "/favorites";
        let favorite = {
            "Build_id": build_id
        }
        console.log("Deleting favorite from " + backendUrl);
        fetch(backendUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favorite)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            resolve(); // Resolve the promise
        })
        .catch(error => {
            reject(error); // Reject the promise with the error
        });
    });
}

// When favorite-button is clicked, add/remove build from favorites
function toggleFavorite(build_id) {
    return new Promise((resolve, reject) => {
        if(build_id in _favorites) {
            deleteFavorite(_username, build_id)
                .then(() => {
                    delete _favorites[build_id];
                    console.log(_favorites);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        }
        else {
            postFavorite(_username, build_id)
                .then(() => {
                    _favorites[build_id] = true;
                    console.log(_favorites);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        }
    });    
}

function updateFavoriteButton(button) {
    let build_id = button.value;
    let icon = button.children[0];
    if(build_id in _favorites) {
        icon.style["font-variation-settings"] = '"FILL" 1';
    }else{
        icon.style["font-variation-settings"] = '"FILL" 0';
    }
}


function onFavoriteButtonClick() {

    console.log("Favorite button clicked");
    console.log(_favorites);
    // Get build_id from favorite button
    let build_id = this.value;

    // Toggle favorite
    toggleFavorite(build_id)
        .then(() => {
            // Update favorite button
            updateFavoriteButton(this);
            console.log(_favorites);
        })
        .catch(error => {
            console.error(error);
        });  
}

document.addEventListener("DOMContentLoaded", () => {
    _username = document.getElementById("username").value;
    getFavorites(_username)
        .then(favorites => {
            _favorites = favorites. reduce((map, obj) => {
                map[obj.Build_id] = true;
                return map;
            }, {});
            
            // Update and add event listener to favorite buttons
            let favoriteButtons = document.getElementsByClassName("favorite-button");
            for (let i = 0; i < favoriteButtons.length; i++) {
                updateFavoriteButton(favoriteButtons[i]);
                favoriteButtons[i].addEventListener("click", onFavoriteButtonClick);
            }

            console.log(_favorites);

        })
        .catch(error => {
            console.error(error);
        });



});
