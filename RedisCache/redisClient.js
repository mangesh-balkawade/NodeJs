const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379, // Default Redis port
});

// Handle errors
redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

// Export the Redis client instance
module.exports = redisClient;
