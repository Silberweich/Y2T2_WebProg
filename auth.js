const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        // const token = req.headers.authorization.split(" ")[1];
        // Getting token token from the cookie (require cookie-parser to do so)
        const token = req.cookies.token;
        var decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        next();
    } catch (e) {
        //just clear the cookie if there is an error when verifying
        res.clearCookie("token");
        res.status(401).json({error: true, message: "Authorization failed!"});
    }
}