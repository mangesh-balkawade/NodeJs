const redisClient = require('./redisClient');

// Now you can use `redisClient` to interact with Redis in this file
// For example:
module.exports = {

    redisSet() {
        redisClient.set('mykey', 'Mangesh', (err, reply) => {
            if (err) {
                console.error('Error setting key:', err);
            } else {
                console.log('Set key:', reply);
            }
        });
    }
    ,

    redisGet(key) {
        redisClient.get(key, (err, reply) => {
            if (err) {
                console.error('Error getting key:', err);
            } else {
                console.log('get key:', reply);
            }
        });
    }


}
