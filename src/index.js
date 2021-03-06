// Import our libraries and set up express.
const express = require("express")
const morgan = require("morgan");
const {check, validationResult} = require("express-validator")
const app = express();
const bodyParser = require("body-parser")
const mailgun = require("mailgun-js")
const Recaptcha = require("express-recaptcha").RecaptchaV2




// app.use allows for different middleware to bee brought into Express
// // Morgan: a logger for express so that we hav a record for debugging.
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false }))
app.use(bodyParser.json())


// Create the page router for express that recognizes and directs our URLs.
const indexRoute = express.Router();


const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const validation = [
    check("email", "please provide a valid email").isEmail(),
    check("name", "A valid name is required").not().isEmpty().trim().escape(),
    check("subject").optional().trim().escape(),
    check("message", "A message shorter than 2000 characters is required").not().isEmpty().trim().escape().isLength({max:2000})
]


const handleSendingEmail = (request, response) => {
    response.append("Content-Type", "text/html")
    const errors = validationResult(request)

    if (errors.isEmpty() === false) {
        const currentError = errors.array()[0]

        return response.send(`<div class="alert alert-danger" role='alert'><strong>Oh snap!
        </strong>${currentError.msg}</div>`)
    }

    if (request.recaptcha.error) {
        return response.send(`<div class='alert alert-danger' role='alert'><strong>Oh Snap!</strong>There
was an error with Recaptcha please try again`)
    }

    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})

    const {email, subject, name, message} = request.body

    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${name} - ${email} : ${subject}`,
        text: message
    }

    mg.messages().send(mailgunData, (error) => {
        if (error) {
            return response.send(Buffer.from(`<div class='alert alert-danger' role='alert'><strong>Oh snap!</strong> Unable to send email error with email sender</div>`))
        }
        return response.send(Buffer.from(`<div class='alert alert-success' role='alert'>Email successfully sent.</div>`))
    })
}

    const handleGetRequest = (request, response) => {
        return response.json("The express server is live");
    }


// Example express configuration for our /apis/ route.
    indexRoute.route("/")
        .get(handleGetRequest)
        .post(recaptcha.middleware.verify, validation, handleSendingEmail)


    app.use("/apis", indexRoute);


//app.listen declares what port the Express application is running on
    app.listen(4200);


