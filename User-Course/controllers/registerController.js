import User from '../models/UserModel.js';
import bcrypt from 'bcrypt'

const handleNewUser = async (req, res) => {
    const { user, pwd, email } = req.body;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required' });

    // check duplicate usernames in the database
    try {
        const duplicate = await User.findOne({ username: user });
        if (duplicate) return res.sendStatus(409);

        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "email": email
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

export { handleNewUser };
