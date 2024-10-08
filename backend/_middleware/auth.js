import jwt from 'jsonwebtoken';
const secret = process.env('secret');
import db from '../db/db';

export function authorize() {
  return async (req, res, next) => {
    // authenticate JWT token and attach decoded token to request as req.user
    try {
      const authHeader = await req.headers.authorization;
      if (!!authHeader === true) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        const user = await db.User.findOne({ userID: decoded.userID, 'tokens.token': token }).catch(
          (e) => console.log(e),
        );
        if (!user) {
          throw new Error();
        }
        req.user = user;
        next();
      }
    } catch (e) {
      res.status(401).send({ error: `${e} Please authenticate.` });
    }
  };
}
