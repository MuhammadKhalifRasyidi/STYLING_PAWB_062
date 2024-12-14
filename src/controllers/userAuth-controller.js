const database = require('../configs/database');

// Controller to register user
const SignUpUser = (req, res) => {
    const { username, password } = req.body; // Destructure username and password from req.body
    const sql = `INSERT INTO user (username, password) VALUES (?, ?)`;

    database.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error: ', err);
            return res.status(500).send('Gagal mendaftarkan user');
        }
        res.status(200).send('User berhasil didaftarkan');
    });
};

// Controller to render sign-up page
const renderSignUpPage = (req, res) => {
    res.render('sign-up', {
        layout: 'layouts/main-layouts',
        title: 'Sign Up',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller to render sign-in page
const renderSignInPage = (req, res) => {
    res.render('sign-in', {
        layout: 'layouts/main-layouts',
        title: 'Sign In',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller to login user
const SignInUser = (req, res) => {
    const { username, password } = req.body;

    // Correct SQL query to fetch user by username and password
    database.query('SELECT * FROM user WHERE username = ? AND password = ?',
        [username, password], (err, result) => {
            if (err) {
                console.error('Database Error: ', err);
                return res.status(500).send('Error fetching user');
            }
            if (result.length === 0) {
                console.log('User not found:', username, password);
                return res.status(400).send('User not found');
            }

            req.session.userId = result[0].id;
            console.log('Login Success');
            res.redirect('/');
        }
    );
};

// Controller to logout user
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/sign-in');
    });
};

// Export all controllers
module.exports = {
    SignUpUser,
    renderSignUpPage,
    renderSignInPage,
    SignInUser,
    logoutUser,
};
