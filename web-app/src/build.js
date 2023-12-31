import {config} from './config.js';

// Function to submit a rating with comment
function submitRating() {
    var buildId = document.getElementById('buildId').value;
    var username = document.getElementById('username').value;
    var rating = document.getElementById('rating').value;
    var comment = document.getElementById('comment').value;
    var url = config.backendUrl + '/build/' + buildId + '/ratings';
    console.log('Submitting rating for build ' + buildId + ' with rating ' + rating + ' and comment ' + comment);
    console.log('Submitting rating to ' + url);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username: username, rating: rating, comment: comment})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
}

// Function to delete a rating
function deleteRating(username, build_id){
    var url = config.backendUrl + '/build/' + build_id + '/ratings';

    var rating = {
        "Username": username,
    }

    console.log('Deleting rating for build ' + build_id + ' by user ' + username);
    console.log('Url: ' + url);
    console.log('Rating: ' + JSON.stringify(rating));

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rating)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
}

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {

    // Hook submitRating button
    var submitRatingButton = document.getElementById('submitRating');
    submitRatingButton.addEventListener('click', submitRating);

    // Hook deleteRating buttons
    var deleteRatingButtons = document.getElementsByClassName('delete-rating');
    for (const button of deleteRatingButtons) {
        button.addEventListener('click', function() {
            // Parent of "rating" class should have a child with class "username"
            var parent = this.closest('.rating');
            var username = parent.getElementsByClassName('username')[0].value;
            var build_id = document.getElementById('build_id').value;
            deleteRating(username, build_id);
        });
    }
});

