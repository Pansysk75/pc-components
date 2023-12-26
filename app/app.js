let express = require('express');
let router = express.Router();

router.use("/public",express.static(__dirname + "/public"));


router.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});


router.get('/builds.html', (req, res) => {
    absolutePath = __dirname + '/views/builds.html';
    res.sendFile(absolutePath);
});

router.get('/components.html', (req, res) => {
    absolutePath = __dirname + '/views/components.html';
    res.sendFile(absolutePath);
});

router.get('/login.html', (req, res) => {
    absolutePath = __dirname + '/views/login.html';
    res.sendFile(absolutePath);
});

router.get('/register.html', (req, res) => {
    absolutePath = __dirname + '/views/register.html';
    res.sendFile(absolutePath);
});

router.get('/builder.html', (req, res) => {
    absolutePath = __dirname + '/views/builder.html';
    res.sendFile(absolutePath);
});




// // Example of another route
// router.get('/api/data', (req, res) => {
//   // Handle data retrieval logic
//   res.json({ message: 'Data from the server' });
// });

module.exports = router;