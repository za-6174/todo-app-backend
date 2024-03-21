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
    
module.exports = mongoose.model("Tasks", taskSchema); 