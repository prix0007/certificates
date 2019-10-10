const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in User Modal
let User = require('../modals/user');

//Register Form for Certificate
router.get('/dab4d9be2b32001e0d2ba234689b9e33', function (req, res) {
    res.render('register');
});

//Register Post Certificate
router.post('/dab4d9be2b32001e0d2ba234689b9e33', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const t_o_c = req.body.t_o_c;
    const event_name = req.body.event_name;
    const event_pos = req.body.event_pos;
    const password = req.body.password;
    const designation = req.body.designation;

    req.checkBody('name', 'Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Email is Not Valid').isEmail();
    req.checkBody('t_o_c', 'Type of Certificate is Required').notEmpty();
    req.checkBody('event_name', 'Event Name is Required').notEmpty();
    req.checkBody('event_pos', 'Event Position is Required').notEmpty();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('designation', 'Desigantion is Required').notEmpty();

    let errors = req.validationErrors();
    let current_date = new Date();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {

        let newUser = new User({
            name: name,
            email: email,
            t_o_c: t_o_c,
            event_name: event_name,
            event_pos: event_pos,
            password: password,
            timestamp: current_date,
            designation: designation
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'Certificate is Successfully Registered.');
                        res.redirect('/tantrafiesta/login');
                    }
                });
            });
        });

    }
});

//Login Form
router.get('/login', function (req, res) {
    res.render('login');
});

//Login Process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/tantrafiesta/certificate',
        failureRedirect: '/tantrafiesta/login',
        failureFlash: "Invalid Password"
    })(req, res, next);
});

//Render Certificate Request
router.get('/certificate', function(req, res){
    //console.log(req.user._id);
    // res.render('certificate', {
    //     _id: req.user._id
    // });
    var red_link = "/tantrafiesta/certificate/"+req.user._id;
    res.redirect(red_link);
}); 

//Function for String Check
function str_check(string){
    var v = "Volunteer"
    var p = "Participation"
    var e = "Excellence"
    var a = "Appreciation"
    var c = "Contribution"
    var counterp=0;
    var counterv=0;
    var countere=0;
    var countera=0;
    var counterc=0;
    for (i =0;i<p.length;++i){
        // console.log(string)
        // console.log(p)
        if(string[i]==p[i]){
            counterp++;
        }
    }
    if(counterp==p.length){
        return 1;
    }
    //For Volunteering
    for (i =0;i<v.length;++i){ 
        // console.log(string)
        // console.log(p)
        if(string[i]==v[i]){
            counterv++;
        }
    }
    if(counterv==v.length){
        return 2;
    }
    //For Excellence
    for (i =0;i<e.length;++i){
        // console.log(string)
        // console.log(p)
        if(string[i]==e[i]){
            countere++;
        } 
    }
    if(countere==e.length){ 
        return 3;
    }
    //For Appreciation
    for (i =0;i<a.length;++i){
        // console.log(string)
        // console.log(p)
        if(string[i]==a[i]){
            countera++;
        }
    }
    if(countera==a.length){
        return 4;
    }
    //For Contribution
    for (i =0;i<c.length;++i){
        // console.log(string)
        // console.log(p)
        if(string[i]==c[i]){
            counterc++;
        }
    }
    if(counterc==c.length){
        return 5;
    }
    //Error
    return 0;

}
//Certificate Api Node
router.get('/certificate/:id', function(req, res){
    User.findById(req.params.id, function (err, user) {
        var cert_type;
        cert_type = str_check(user.t_o_c)
        res.render('certificate',{
            _id: user._id,
            name: user.name,
            toc: user.t_o_c,
            certs: cert_type,
            event_name: user.event_name,
            event_pos: user.event_pos,
            time: user.timestamp,
            designation: user.designation
        })
    });
})

// //Logout 
// router.get('/logout', function (req, res) {
//     req.logout();
//     req.flash('success', 'You are Logout Now');
//     res.redirect('/users/login');
// });
module.exports = router;