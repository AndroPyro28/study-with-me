import jwt from 'jsonwebtoken'
import { env } from "~/env.mjs";

export const assignToken = (id: number) => {
// const maxAge = 24 * 60 * 60;
return jwt.sign({id}, `${process.env.NEXT_JWTSECRET}`, {
    expiresIn: '1d'
})
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.NEXT_JWTSECRET}`) as {id: number, iat: number, exp: number};
};
