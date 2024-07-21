import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/Loginmodel.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("registration password", password);

        if (!name || !email || !password) {
            return res.status(400).send('Invalid request data');
        }

        const userExist = await Customer.findOne({ email });

        if (!userExist) {
            const hashedPassword = await bcrypt.hash(password, 10); 
            console.log("register hash", hashedPassword);

            const data = new Customer({ name, email, password: hashedPassword });
            await data.save();
            res.status(201).json({ msg: "Register successful", data });
        } else {
            res.status(400).send('User already exists, try to login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password);

        if (!email || !password) {
            return res.status(400).send("Email and password required");
        }

        const userExist = await Customer.findOne({ email });

        if (userExist) {
            try {

                const passCheck = await bcrypt.compare(password , userExist.password);
                console.log("Stored hash:", userExist.password);
                console.log("Password to compare:", password);
                console.log("bycrpt compare", passCheck);
                if (passCheck) {
                    const accessToken = generateToken(userExist);
                    const refreshToken = generateRefreshToken(userExist);
                    userExist.refreshToken = refreshToken;
                    await userExist.save();

                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict'
                    });
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict'
                    });

                    res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
                } else {
                    console.log("incorrect password");
                    res.status(400).send("Incorrect password");
                }
            } catch (err) {
                console.log(err);
                res.send("password comparing failed");
            }
        } else {
            console.log("user does not exist");
            res.status(400).send('User does not exist, try to register');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
export const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        const user = await Customer.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'User logout failed', error });
    }
};

export const token = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await Customer.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });
        const accessToken = generateToken(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token refresh failed', error });
    }
};

export const allUsers = async (req, res) => {
    try {
        const users = await Customer.find();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("There is an error in fetching users");
    }
};
