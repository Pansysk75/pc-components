const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');

router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
router.use("/public",express.static(__dirname + "/public"));
router.use("/src",express.static(__dirname + "/src"));


router.get('/', (req, res) => {
    res.render('index');
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

    // Render template with data
    res.render("build", { build: buildData });
});

// Create html for components, based on component type
router.get('/components/:type', async (req, res) => {

    // Get id from url
    let type = req.params.type;

    // Fetch components from backend
    const backendUrl = "http://64.226.122.251:81/components/" + type;
    let componentsList = await fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // Render template with data
    res.render("components-list", { components: componentsList });
});

// router.get('/components/cpus', async (req, res) => {

    // Get id from url
    // let type = req.params.type;

    // Fetch components from backend
    // const backendUrl = "http://64.226.122.251:81/components/cpus" 
    // // + type;
    // let components = await fetch(backendUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         return data;
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    // Render template with data
    // res.render("components-list", { componentType: components });
    // res.render("components-list");
// });


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

    // Render template with data
    res.render("builds", { builds: buildsData });
        
});


router.get('/components', (req, res) => {
    res.render('components');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/builder', (req, res) => {
    res.render('builder');
});


module.exports = router;