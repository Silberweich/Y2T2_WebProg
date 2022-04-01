const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.cookies.token;
        var decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        next();
    } catch (e) {
        res.clearCookie("token");
        res.status(401).json({error: true, message: "Authorization failed!"});
    }
}