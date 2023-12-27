const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
router.use("/public",express.static(__dirname + "/public"));
router.use("/src",express.static(__dirname + "/src"));


// router.use("/", (req, res, next) => {
//     console.log(req.method + " " + req.path + " - " + req.ip);
//     next();
// });


router.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});


router.get('/builds', (req, res) => {
    absolutePath = __dirname + '/views/builds.html';
    res.sendFile(absolutePath);
});

router.get('/components', (req, res) => {
    absolutePath = __dirname + '/views/components.html';
    res.sendFile(absolutePath);
});

router.get('/login', (req, res) => {
    absolutePath = __dirname + '/views/login.html';
    res.sendFile(absolutePath);
});

router.get('/register', (req, res) => {
    absolutePath = __dirname + '/views/register.html';
    res.sendFile(absolutePath);
});

router.get('/builder', (req, res) => {
    absolutePath = __dirname + '/views/builder.html';
    res.sendFile(absolutePath);
});


module.exports = router;