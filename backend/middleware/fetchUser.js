const jwt = require("jsonwebtoken");

const jwtSecret = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, laudantium!";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Auth Token:success");

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();

    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
