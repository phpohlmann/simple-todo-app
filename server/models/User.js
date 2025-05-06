const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importa a biblioteca para hash de senha

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Garante que cada email seja único
      lowercase: true, // Armazena o email em caixa baixa
      trim: true, // Remove espaços em branco do início e fim
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, use um email válido',
      ], // Validação básica de formato de email
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
    },
    // Podemos adicionar outros campos depois, como nome, data de criação, etc.
  },
  {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  }
);

// --- MIDDLEWARE para HASH de Senha ---
// Este middleware será executado *antes* de salvar o documento (user) no banco
userSchema.pre('save', async function (next) {
  // 'this' refere-se ao documento atual (o usuário sendo salvo)

  // Só faz o hash da senha se ela foi modificada (ao criar ou atualizar a senha)
  if (!this.isModified('password')) {
    next(); // Se a senha não mudou, passa para o próximo middleware/salvamento
  }

  // Gera um 'salt' (valor aleatório) para misturar com a senha antes do hash
  // O custo (10) define a complexidade do hash
  const salt = await bcrypt.genSalt(10);

  // Faz o hash da senha usando o salt gerado
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Continua o processo de salvamento
});

// --- MÉTODO para Comparar Senhas ---
// Adiciona um método ao schema para comparar a senha informada com a senha hasheada no BD
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compara a senha informada (enteredPassword) com a senha hasheada (this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User; // Exporta o modelo User