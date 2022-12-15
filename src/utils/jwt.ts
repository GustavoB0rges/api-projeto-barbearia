import * as jwt from 'jsonwebtoken';

export function createToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}