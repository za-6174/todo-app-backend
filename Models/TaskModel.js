const mongoose = require("mongoose")
const {Schema} = mongoose;

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "Name is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"]
    },
    isReminderSent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date, default: new Date()
    },
    lastUpdatedAt: {
        type: Date, default: new Date()
    },
    user: {
        type: Schema.Types.ObjectId, ref: "Users"
    }
})

taskSchema.pre("save", function (next) {
    this.lastUpdatedAt = new Date();
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

taskSchema.statics.getTasksByUser = async function(userId) {
    const tasks = await this.find({user: userId});
    return tasks;
} 

taskSchema.statics.getTaskById = async function(_id) {
    const task = await this.findOne({_id})
    if (task)
        return task;
    return null;
}

taskSchema.statics.updateReminderForTask = async function(_id) {
    const task = await this.findByIdAndUpdate(_id, { isReminderSent: true })
    return task;
}

taskSchema.statics.getTasksWithoutReminders = async function() {
    const tasks = await this.aggregate([
        {
            $match: {
                isReminderSent: false
            }
        },
        {
            $addFields: {
                adjustedDueDate: { $add: ["$dueDate", 3 * 60 * 60 * 1000] } // Adding 3 hours (in milliseconds)
            }
        },
        {
            $match: {
                adjustedDueDate: { $lt: new Date() } // Compare with current date
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        }
    ]);
    return tasks;
}

taskSchema.statics.setReminderSentForTasks = async function (tasks) {
    const updatePromises = tasks.map(task => task.updateOne({ isReminderSent: true }));
    await Promise.all(updatePromises);
}

module.exports = mongoose.model("Tasks", taskSchema); 