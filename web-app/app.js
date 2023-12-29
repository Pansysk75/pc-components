const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/public",express.static(__dirname + "/public"));
router.use("/src",express.static(__dirname + "/src"));

router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  }));
  
  // This is used only for session management (its a POST so it doesn't need to serve a page)
  router.post('/login', async (req, res) => {
    console.log(req.body);
    let username = req.body.Username;
    const backendUrl = "http://64.226.122.251:81/user/" + username;
    let userData = await fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    if (userData) {
        req.session.Username = username;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }

  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('index', { session: req.session });
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
    
    // Fetch build ratings
    const backendUrl2 = "http://64.226.122.251:81/build/" + id + "/ratings";
    let ratingsData = await fetch(backendUrl2)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // Render template with data
    res.render("build", { session: req.session, build: buildData, ratings: ratingsData });
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
    res.render("components-list", {session: req.session, components: componentsList });
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
    res.render("builds", {session: req.session, builds: buildsData });
        
});


router.get('/components', (req, res) => {
    res.render('components', {session: req.session});
});

router.get('/login', (req, res) => {
    res.render('login', {session: req.session});
});

router.get('/register', (req, res) => {
    res.render('register', {session: req.session});
});

router.get('/builder', (req, res) => {
    res.render('builder', {session: req.session});
});


module.exports = router;