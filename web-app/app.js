const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const backendUrl = require('./config.json').backendUrl;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/public", express.static(__dirname + "/public"));
router.use("/src", express.static(__dirname + "/src"));

router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// This is used only for session management (its a POST so it doesn't need to serve a page)
router.post('/login', async (req, res) => {
    let username = req.body.Username;
    let userData = await fetch(backendUrl + "user/" + username)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    if (!userData.error) {
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

router.get('/user/:username', async (req, res) => {
    let username = req.params.username;
    let userData = await fetch(backendUrl + "user/" + username)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    if(userData == undefined || userData.error != undefined) {
        res.send("User not found");
        return;
    }

    console.log(userData);
    
    res.render("user", { session: req.session, user: userData });
});


// Create html for build, based on id
router.get('/build/:id', async (req, res) => {

    // Get id from url
    let id = req.params.id;

    console.log("Backend url: " + backendUrl);

    // Fetch build from backend
    let buildData = await fetch(backendUrl + "build/" + id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // Fetch build ratings
    let ratingsData = await fetch(backendUrl + "build/" + id + "/ratings")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    console.log("Build data:");
    console.log(buildData);
    console.log("Ratings data:");
    console.log(ratingsData);

    // Render template with data
    res.render("build", { session: req.session, build: buildData, ratings: ratingsData });
});

// Create html for components, based on component type
router.get('/components/:type', async (req, res) => {

    // Get id from url
    let type = req.params.type;

    // Fetch components from backend
    let componentsList = await fetch(backendUrl + "components/" + type)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // Render template with data
    res.render("components-list", { session: req.session, components: componentsList });
});

router.get('/builds', async (req, res) => {

    // Fetch builds from backend
    let buildsData = await fetch(backendUrl + "builds")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    // Render template with data
    res.render("builds", { session: req.session, builds: buildsData });

});

router.get('/components', (req, res) => {
    res.render('components', { session: req.session });
});

router.get('/login', (req, res) => {
    res.render('login', { session: req.session });
});

router.get('/register', (req, res) => {
    res.render('register', { session: req.session });
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    let username = req.body.Username;
    let email = req.body.email;

    let userData = await fetch(backendUrl + "user",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Username: username, email: email }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    console.log("User data:");
    console.log(userData);

    if (userData == undefined) {
        res.send("There was an error with your registration");
    }
    else if (userData.error == undefined) {
        req.session.Username = username;
        res.redirect('/');
    }
    else if (userData.error == "Username already taken") {
        res.send("Username already taken");
    }
    else {
        res.send("There was an error with your registration");
    }
});

router.get('/builder', (req, res) => {
    res.render('builder', { session: req.session });
});

router.get('/config.json', (req, res) => {
    res.sendFile(__dirname + '/config.json');
});

module.exports = router;