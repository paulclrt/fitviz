import {Request, Response, NextFunction } from "express"


declare global {
  namespace Express {
    interface Request {
      token: string;
    }
  }
}

export function extractBearerToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.json({error: "No token/Invalid Token"})
      return
  }

  const token = authHeader.slice(7).trim();
  req.token = token;
  next();
}
