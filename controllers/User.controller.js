var mongoose = require('mongoose');
const User = mongoose.model('User');
const Media = mongoose.model('Media');
var Config = require('../config/config');

exports.register = async (req, res) =>  {

    let user = null;
    // user = await User.findOne({ name: req.body.name });
    // if(user) {
    //     return res.json({ success: false, errMessage: 'A user with this user name does already exists.'});
    // }
    
    // user = await User.findOne({ email: req.body.email });
    // if(user) {
    //     return res.json({ success: false, errMessage: 'A user with this email address does already exists.'});
    // }

    // Determine whether creating new media or not
    let newMedia = null, avatar = null;
    if(req.body.media !== null) {        //  create new media
        newMedia = new Media(req.body.media);
        try {
            newMedia = new Media(req.body.media);
            await Media.insertMany(newMedia);
            avatar = newMedia._id;
        } catch (err) {
            console.log("err");
            return res.json({success: false, errMessage: "Unknown errors(1) occurred while adding/registering new user."});
        }
    } else {
        avatar = Config.fake_mongodb_id;
    }


    //Create new user and set password
    let newUser = new User(req.body);
    newUser.avatar = avatar;
    newUser.setPassword(req.body.password);
    try {
        await User.insertMany(newUser);
        user = await User.findById(newUser._id).populate("avatar");
        let token = newUser.generateJwt();
        res.json({success: true, token: token, user: user, media: newMedia});
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors(2) occurred while adding/registering new user."});
    }
};

exports.login = async (req, res) =>  {  
    try {
        await User.findOne({email: req.body.email}).populate("avatar").then(user => {
            if(!user) {
                return res.json({success: false, errMessage: "Email not found. Please confirm your email again!"});
            } else {
                let result = user.validatePassword(req.body.password);
                if(!result) {
                    return res.json({success: false, errMessage: "Password is wrong. Please confirm your password again!"});
                } else {
                    let token = user.generateJwt();
                    res.json({success: true, token: token, user: user});
                }
            }
        })
    } catch(err) {
        console.log("Login Error", err);
        return res.json({success: false, errMessage: "Unknown errors occurred while login(Maybe database error)." });
    }

};


exports.allUsers = async (req, res) =>  {
    User.find().populate("avatar").exec(function(err, users) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole users."});
        } else {
            res.json({success: true, users: users});
        }
    })
}

exports.updateUser = async (req, res) =>  {
    
    // Determine wheter creating new media or not
    let newMedia = null, avatar = null;
    if(req.body.media !== null) {        //  create new media
        newMedia = new Media(req.body.media);
        try {
            await Media.insertMany(newMedia);
            avatar = newMedia._id;
        } catch(err) {
            console.log(err);
            return res.json({success: false, errMessage: "Unknown errors(1) occurred while adding/registering new user."});
        }
    } else {
        avatar = Config.fake_mongodb_id;
    }
    
    let newUser = new User(req.body);
    let existingUser = await User.findById(req.body._id);
    if(!existingUser.validatePassword(req.body.password))
        newUser.setPassword(req.body.password);
    else
        newUser.password = existingUser.password;

    User.findByIdAndUpdate(newUser._id, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        avatar: avatar,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, user) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating user."});
        } else {
            if (user !== null) {
                let token = user.generateJwt();
                res.json({success: true, user: user, token: token, media: newMedia});
            }
            else
                res.json({success: false, errMessage: "User doesn't exist."});
        }
    }).populate("avatar");
}

exports.deleteUser = async (req, res) =>  {
    let id = req.params.id;
    let user = null;
    let media_id = null;
    let media = null;
    
    try {
        user = await User.findByIdAndRemove(id, {
            new: true,
            useFindAndModify: false
        }).populate("avatar");

        if (user !== null) {
            media_id = user.avatar === null || user.avatar === Config.fake_mongodb_id ? null : user.avatar._id;
            res.json({success: true, user: user});
        } else
            res.json({success: false, errMessage: "User doesn't exist."});

    } catch(err) {
        return res.json({success: false, errMessage: "Unknown errors(1) occurred while deleting user."});
    }

    if(media_id !== null) {
        try {
            media = await Media.findByIdAndRemove(media_id, {
                new: true,
                useFindAndModify: false
            });

            // if (media !== null)
            //     res.json({success: true, user: user});
            // else
            //     res.json({success: false, errMessage: "User doesn't exist."});

        } catch(err) {
            return res.json({success: false, errMessage: "Unknown errors(1) occurred while deleting the media related with user."});
        }
    }
}
