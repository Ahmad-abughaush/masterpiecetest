const User = require("../models/usermodel");
const express = require('express');
const bcrypt = require('bcrypt');
const { jwtGenerator } = require('../utils/jwtGenerator');
const jwt = require('jsonwebtoken');

// Register route
const signup = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).send('User already exists. Please log in.');
        }

        const newUser = new User({
            username,
            email,
            password,
            phone,
            role,
        });
        const user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        await newUser.save();

        const token = jwtGenerator(newUser);

        res.json({
            token, 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login route
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json('Email or password is incorrect');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json('Email or password is incorrect');
        }

        const token = jwtGenerator(user);

        // Include the role in the response
        res.json({
            token, role: user.role, user_id: user._id,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



const oneUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const body = req.body;

        const fillable = [
            'username',
            'email',
            'password',
            'phone'
        ];

        const data = {};

        fillable.forEach(field => {
            if (body[field]) {
                data[field] = body[field];
            }
        });

        if (Object.keys(data).length < 1) {
            return res.json({ message: "Nothing to update" });
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (e) {
        return res.status(500).json({ message: "Error updating user", error: e.message });
    }
};





module.exports = {
    signup,
    login,
    oneUser,
    updateUser
};