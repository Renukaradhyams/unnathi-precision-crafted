// Rate limiter stubbed out to fix Node 10 incompatibility in cPanel
const mockRateLimiter = (req, res, next) => next();

const apiRateLimiter = mockRateLimiter;
const formRateLimiter = mockRateLimiter;

module.exports = {
  apiRateLimiter,
  formRateLimiter,
};
