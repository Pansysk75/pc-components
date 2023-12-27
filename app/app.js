const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');

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


// Create html for build, based on id
router.get('/build/:id', async (req, res) => {

    // Get id from url
    let id = req.params.id;

    // Fetch build from backend
    const backendUrl = "http://64.226.122.251:81/build/" + id;
    let buildData = await fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // EJS templates are in /templates
    let templatePath = __dirname + '/templates/build.ejs';

    // Render template with data
    res.render(templatePath, { build: buildData });
});


router.get('/builds', async (req, res) => {

    // Fetch builds from backend
    const backendUrl = "http://64.226.122.251:81/builds";

    let buildsData = await fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // EJS templates are in /templates
    let templatePath = __dirname + '/templates/builds.ejs';

    // Render template with data
    res.render(templatePath, { builds: buildsData });
        
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