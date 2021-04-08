const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors')

const userController = Router();


userController.post('/register', async (req, res) => {
    let { username, password } = req.body;
    try {
        await User.create({
            username,
            password: bcrypt.hashSync(password, 12)
        });
        res.status(201).json({
            message: "user registered"
        });
    } catch (e) {
        if(e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'email already in use'
            });
        } else {
            res.status(500).json({
                message: 'failed to register user'
            })
        }
    }
});

userController.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        let loggingIn = await User.findOne({
            where: {
                username
            }
        })

        if( loggingIn && await bcrypt.compare(password, loggingIn.password)) {
            const token = jwt.sign({ id: loggingIn.id }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: 'login success',
                        token
                    })
        } else {
            res.status(401).json({
                message: 'login failed'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'error logging in'
        })
    }
})

module.exports = userController;

