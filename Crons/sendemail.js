require('dotenv').config()

const mailjet = require("node-mailjet").apiConnect(
    process.env.PUBLIC_MAIL_KEY,
    process.env.PRIVATE_MAIL_KEY
);

function sendEmail() {
    console.log("sending email?")
    return mailjet
        .post("send", { version: "v3.1" })
        .request({
            Messages: [
                {
                    From: {
                        Email: "zainabapps7@gmail.com",
                        Name: "Todo App Test Zainab",
                    },
                    To: [
                        {
                            Email: "zaina.qazi252@gmail.com",
                        },
                    ],
                    Subject: "Testing email by me",
                    TextPart: "This email is intended for testing pruposes. please ignore",
                    HTMLPart: "",
                },
            ],
        })
        .then((result) => {
            // do something with the send result or ignore
        })
        .catch((err) => {
            // handle an error
        });
}