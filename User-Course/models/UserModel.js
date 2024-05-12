import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        Student: {
            type: Number,
            default: 2001
        },
        Faculty: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: String,
    modules:{
        type: [String], 
        default: [],     
      },
});

export default mongoose.model('User', userSchema);
