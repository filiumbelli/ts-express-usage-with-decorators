import bodyParser from "body-parser";
import express from "express";
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";
import "./controllers/HomeController";
import "./controllers/LoginController";
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(cookieSession({
    keys: ["test"]
}));



app.use(AppRouter.getInstance());


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})