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

// Hook to submitRating button
var submitRatingButton = document.getElementById('submitRating');
submitRatingButton.addEventListener('click', submitRating);
