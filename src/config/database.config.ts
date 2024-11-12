export const mongooseConfig = {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/barber_finance',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };