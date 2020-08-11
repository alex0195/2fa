const Express = require("express");

const Speakeasy = require("speakeasy");

var app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.get("/", (request, response, next) => {
    //var secret = Speakeasy.generateSecret({ length: 20 });
    response.send({ "secret": 'OQSWI623IBGUSP3LHYXDG2DLJAUW6KCI' });
});

app.post("/totp-secret", (request, response, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    response.send({ "secret": secret.base32 });
});

app.post("/totp-generate", (request, response, next) => {
    response.send({
        "token": Speakeasy.totp({
            secret: request.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});

app.post("/totp-validate", (request, response, next) => {
    response.send({
        "valid": Speakeasy.totp.verify({
            secret: request.body.secret,
            encoding: "base32",
            token: request.body.token,
            window: 0
        })
    });
});

const tiempo = new Date();

app.listen(3002, () => {
    console.log("Listening at :3002... On: ", tiempo);
});