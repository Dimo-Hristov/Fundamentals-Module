const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { v4: uuid } = require('uuid');

const app = express();

app.use(cookieParser());


const session = {};

app.get('/', (req, res) => {
    let id = undefined;

    const userId = req.cookies['userId'];


    if (userId) {
        id = userId;

    } else {
        id = uuid();
        res.cookie('userId', id, { httpOnly: true });
    }

    res.send(`Hello user - ${id}`);
});

app.listen(5000, () => console.log('Server is running'))