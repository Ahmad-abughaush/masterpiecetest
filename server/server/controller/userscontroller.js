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

        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        await newUser.save();

        const token = jwtGenerator(newUser);

        res.json({ token });
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

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    signup,
    login
};