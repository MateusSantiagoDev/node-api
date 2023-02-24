export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 't3p@fg45!'
}
