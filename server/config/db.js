const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // Remover esta linha
      // useUnifiedTopology: true, // Remover esta linha
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);

  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;