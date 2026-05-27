import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("A variável MONGODB_URI não foi definida.");

        await mongoose.connect(uri);
        console.log('📦 MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error);
        process.exit(1); // Derruba a aplicação se o banco não conectar
    }
};