import jwt from 'jsonwebtoken';

export const CheckToken = (req, res, next) => {
  try {
    const token = req.headers.cookie.split('=')[1];

    const isToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.body = {
      user: isToken._doc,
    };

    next();
  } catch (error) {
    res.status(304).send({ error: 'Invalid token' });
  }
};
