const Queue = require('bull');
const sendEmail = require('./mailer');

const emailQueue = new Queue('emailQueue', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});


emailQueue.process(async (job, done) => {
    try {
        const { to } = job.data;
        await sendEmail(to);
        done();
    } catch (error) {
        done(error);
    }

});


emailQueue.on('active', job => {
    console.log(`Job with id ${job.id} has been active`)
    console.log(job.data);
})
emailQueue.on('completed', async (job) => {
    console.log(`Job with id ${job.id} has been completed`)
    let data = {
        job_id: job.id,
        data: job.data,
        status: 'completed',
    }
    //await model.Insert(data)
})

emailQueue.on('failed', async (job, error) => {
    console.log(`Job with id ${job.id} has been failed`)
    console.log(typeof (error), "This is the Error", error);
})


module.exports = emailQueue;
