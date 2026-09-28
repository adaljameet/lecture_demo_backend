const user = require('../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Createuser = async (req, res) => {
    const { fullName, email, password } = req.body;

    var profilename = "";
    const hashpassword = await bcrypt.hash(password, 10);
    if (req.file) {
        profilename = req.file.filename;
    }

    const data = await user.create({ fullName, email, password: hashpassword, ProfileImage: profilename });
    return res.status(200).json({
        message: "user add Successfully",
        data
    })
}

exports.AllUser = async (req, res) => {
    const data = await user.find()
    return res.status(200).json({
        message: "All Users List",
        data
    })
}

exports.Loginuser = async (req, res) => {
    const { email, password } = req.body;
    const finduser = await user.findOne({ email });
    if (!finduser) {
        return res.status(401), json({
            message: "Invalid Email or password"
        })
    }
    const passwordmatch = await bcrypt.compare(password, finduser.password);
    if (!passwordmatch) {
        return res.status(401).json({
            message: "Invalid Email or password"
        })
    }
    const token = jwt.sign(
        {
            userId: finduser._id,
            email: finduser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
    return res.status(200).json({
        message: "Login Successful.",
        token: token
    })
}