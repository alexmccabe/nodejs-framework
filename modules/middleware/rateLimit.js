const config = require('config');
const Limiter = require('ratelimiter');
const redis = require('@/database/redis');
const { getRequestIpAddress } = require('@/utilities');

let redisClient;

(async () => {
    redisClient = await redis.connect().catch(err => {
        if (err) {
            console.error(err);
        }
    });
})();

function rateLimitHandler(req, res, next, err, limit) {
    if (err) {
        return next(err);
    }

    res.set('X-RateLimit-Limit', limit.total);
    res.set('X-RateLimit-Remaining', limit.remaining - 1 || 0);
    res.set('X-RateLimit-Reset', limit.reset);

    if (limit.remaining) {
        return next();
    }

    const delta = (limit.reset * 1000 - Date.now()) | 0;
    const after = (limit.reset - Date.now() / 1000) | 0;

    res.set('Retry-After', after);
    res.status(429).json({
        errors: [
            {
                message: `Rate limit exceeded, retry in ${delta}`
            }
        ]
    });
}

exports.rateLimitAPILong = (req, res, next) => {
    if (process.env.ENABLE_API_RATE_LIMIT.toLowerCase() !== 'true') {
        return next();
    }

    const longLimit = new Limiter({
        id: getRequestIpAddress(req) + '-long',
        db: redisClient,
        max: config.get('ratelimit.api.max'),
        duration: config.get('ratelimit.api.duration')
    });

    longLimit.get((err, limit) => rateLimitHandler(req, res, next, err, limit));
};

exports.rateLimitAPIShort = (req, res, next) => {
    if (process.env.ENABLE_API_RATE_LIMIT.toLowerCase() !== 'true') {
        return next();
    }

    const longLimit = new Limiter({
        id: getRequestIpAddress(req) + '-short',
        db: redisClient,
        max: config.get('ratelimit.api.flood'),
        duration: 1000
    });

    longLimit.get((err, limit) => rateLimitHandler(req, res, next, err, limit));
};
