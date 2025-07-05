export function RequestLogger(req, res, next) {
    console.log(req);
    next();
}
