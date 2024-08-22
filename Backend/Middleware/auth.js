const jwt = require("jsonwebtoken");
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    console.log("im body", req.body);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret);
            if (decoded) {
                console.log("im decoded", decoded)
                req.body.user = decoded.userName
                req.body.userID = decoded.userID
                next();
            }
            else {
                res.json({ msg: "Not Authorized" })
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    }
    else {
        res.json({ msg: "Please Login.....!" })
    }
}

module.exports = {
    auth
}