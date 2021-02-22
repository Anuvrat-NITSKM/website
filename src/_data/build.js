module.exports = {
    env: process.env.ELEVENTY_ENV,
    isDev: process.env.ELEVENTY_ENV === 'development',
    timestamp: new Date()
}
