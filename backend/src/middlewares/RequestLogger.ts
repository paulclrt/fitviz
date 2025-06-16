import { Request, Response, NextFunction } from "express"

export function RequestLogger(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    next();

}

