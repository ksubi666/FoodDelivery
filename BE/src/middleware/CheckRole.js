export const Checkrole = (req, res, next) => {
  const { user } = req.body;

  if (user.role != 'admin') {
    return res.status(403).send('permission denied');
  }
  next();
};
