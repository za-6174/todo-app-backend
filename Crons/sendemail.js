require('dotenv').config()
const { getTasksWithoutReminders } = require('../Controllers/TaskController');

const Mailjet = require('node-mailjet');
const TaskModel = require('../Models/TaskModel');

const mailjet = Mailjet.apiConnect(
    process.env.PUBLIC_MAIL_KEY,
    process.env.PRIVATE_MAIL_KEY,
);

function SendEmail(email, userName, task) {
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "zainabapps7@gmail.com",
                        Name: "Todo App Test"
                    },
                    To: [
                        {
                            Email: email,
                            Name: userName
                        }
                    ],
                    Subject: `Todo App Task Reminder Notification - ${task.taskName}`,
                    HTMLPart: getReminderHtmlTemplate(task)
                }
            ]
        })

    request
        .then((result) => { console.log(result)})
        .catch((err) => { console.log(err)})
}

function getReminderHtmlTemplate(task) {
    let content = `
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f5f5f5">
            <div style="text-align: center;">
                <h1>Todo App</h1>
                <h2>Task Reminder Notification</h2>
            </div>
            <p>Hi ${task.user[0].name},</p>
            <p>This is a friendly reminder that your task,<strong> "${task.taskName}"</strong>, has been overdued!</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>We hope this helps you stay on top of your schedule!</p>
            <p>Sincerely,</p>
            <p>The Todo App Team</p>
            <div class="footer" style="color: #fff; background-color: #7d31a6; width: 100%; height: 50px; margin: auto">
                <p style="padding: 10px; text-align: center;">&copy; ${new Date().getFullYear()} Todo App. All rights reserved.</p>
            </div>
        </div>
    `
    return content;
}

async function checkForOverDues() {
    var tasks = await getTasksWithoutReminders();
    for (const task of tasks) {
        const user = task.user[0];
        const isOverdue = task.adjustedDueDate < new Date()
        if (isOverdue) {
            await TaskModel.updateReminderForTask(task._id)
            SendEmail(user.email, user.name, task);
        }
    }
}

module.exports = checkForOverDues;