require('dotenv').config();
const Express = require('express');
const db = require('./db');
const app = Express()

const controllers = require('./controllers');
const { validate, cors } = require('./middlewares');

app.use(Express.json())

app.use(cors)

app.use('/user', controllers.usercontroller);
app.use('/pet', validate , controllers.petcontroller)

app.get("/", (req, res) => {
    res.json({
        message: "welcome to app"
    })
})


db.authenticate()
.then(() => db.sync())
// .then(() => db.sync({force: true}))
.then(() => {
    app.listen(8080, () => {
        console.log(`[server]: app listening on ${process.env.PORT}`)
    })
})
.catch((e) => {
    console.log("[server]: server crashed");
    console.log(e)
})