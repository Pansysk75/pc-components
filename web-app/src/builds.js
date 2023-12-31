import { config } from "./config.js";

class FavoritesManager {
    constructor() {
        this.favorites = {};
        this.username = "";
    }

    async fetchAPI(endpoint, options = {}) {
        const url = `${config.backendUrl}/user/${this.username}/${endpoint}`;
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error(`Error during API request to ${url}:`, error);
            throw error;
        }
    }

    getFavorites() {
        return this.fetchAPI('favorites')
            .then(favoritesArray => {
                this.favorites = favoritesArray.reduce((map, { Build_id }) => {
                    map[Build_id] = true;
                    return map;
                }, {});
            });
    }

    postFavorite(buildId) {
        return this.fetchAPI('favorites', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Build_id: buildId })
        });
    }

    deleteFavorite(buildId) {
        return this.fetchAPI('favorites', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Build_id: buildId })
        });
    }

    toggleFavorite(buildId) {
        const action = buildId in this.favorites ? this.deleteFavorite(buildId) : this.postFavorite(buildId);

        return action.then(() => {
            if (buildId in this.favorites) {
                delete this.favorites[buildId];
            } else {
                this.favorites[buildId] = true;
            }
        });
    }

    updateFavoriteButton(button) {
        const buildId = button.value;
        const icon = button.children[0];
        icon.style["font-variation-settings"] = `"FILL" ${buildId in this.favorites ? 1 : 0}`;
    }

    updateFavoriteCount(button) {
        const build_id = button.value;
        const parent = button.closest(".builds-element");
        const favoriteCount = parent.querySelector(".times_added_to_favorites");
        const current_count = favoriteCount.innerHTML;
        // If not in users favorites, value must have been decremented
        if (build_id in this.favorites) {
            favoriteCount.innerHTML = parseInt(current_count) + 1;
        } else {
            favoriteCount.innerHTML = parseInt(current_count) - 1;
        }
    }
}

function onFavoriteButtonClick(event) {
    const buildId = this.value;

    favoritesManager.toggleFavorite(buildId)
        .then(() => {
            favoritesManager.updateFavoriteButton(this);
            favoritesManager.updateFavoriteCount(this);
        })
        .catch(error => {
            console.error(`Error toggling favorite for buildId ${buildId}:`, error);
        });
}

const favoritesManager = new FavoritesManager();

document.addEventListener("DOMContentLoaded", () => {
    favoritesManager.username = document.getElementById("username").value;

    if (!favoritesManager.username) {
        return;
    }
    
    favoritesManager.getFavorites()
        .then(() => {
            const favoriteButtons = document.getElementsByClassName("favorite-button");
            Array.from(favoriteButtons).forEach(button => {
                favoritesManager.updateFavoriteButton(button);
                button.addEventListener("click", onFavoriteButtonClick);
            });
        })
        .catch(error => {
            console.error("Error fetching favorites:", error);
        });
});
