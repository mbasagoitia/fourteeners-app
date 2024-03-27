const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
}

export default isAdmin;