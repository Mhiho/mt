export default function errorHandler(err, req, res) {
  const is404 = err.toLowerCase().endsWith('not found');
  const statusCode = is404 ? 404 : 400;
  switch (true) {
    case typeof err === 'string':
      // custom application error
      return res.status(statusCode).json({ message: err });
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' });
    default:
      return res.status(500).json({ message: err.message });
  }
}
