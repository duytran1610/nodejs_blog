module.exports = (token) => {
    return (req, res, next) => {
        req.headers.authorization = `Bearer ${token}`;
        next();
    }
}