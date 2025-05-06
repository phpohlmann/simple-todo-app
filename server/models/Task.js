const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Tipo especial para referenciar outro documento
      required: true,
      ref: 'User', // Especifica que este ObjectId refere-se a um documento no modelo 'User'
    },
    title: {
      type: String,
      required: [true, 'Por favor, adicione um título para a tarefa'], // Mensagem customizada de erro
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      // required: false por padrão
    },
    completed: {
      type: Boolean,
      required: true,
      default: false, // Por padrão, a tarefa não está concluída
    },
  },
  {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // Exporta o modelo Task