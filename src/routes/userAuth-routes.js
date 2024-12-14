const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isSignIn');
const userAuth = require('../controllers/userAuth-controller')

// routes untuk register
router.get('/sign-up', userAuth.renderSignUpPage);
router.post('/sign-up', userAuth.SignUpUser);

// routes untuk login
router.get('/sign-in', userAuth.renderSignInPage);
router.post('/sign-in', userAuth.SignInUser);

router.get('/logout', userAuth.logoutUser);

router.get ('/', isLoggedIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;