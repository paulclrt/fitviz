export function extractBearerToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.json({ error: "No token/Invalid Token" });
        return;
    }
    const token = authHeader.slice(7).trim();
    req.token = token;
    next();
}
