const TaskModel = require("../Models/TaskModel");

module.exports.getTasksByUser = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        let tasks = await TaskModel.getTasksByUser(userId);
        res.status(200).json({tasks: tasks, created: true})
    }
    catch(err) {
        res.status(200).json({message: "Something went wrong", success: false})
    }
}

module.exports.updateTask = async(req, res, next) => {
    //try {
    const {task, userId} = req.body;
    let isAdd = false;
    let dbTask = null
    if (task._id)
        dbTask = await TaskModel.getTaskById(task._id)
    if (!dbTask) {
        dbTask = await TaskModel.create({taskName: task.taskName, dueDate: task.dueDate, user: userId});
        isAdd = true
    }
    else {
        dbTask.name = task.taskName;
        dbTask.dueDate = task.dueDate;
        await dbTask.save();
    }
    res.status(200).json({ success: true, data: dbTask, created: isAdd });
    // }
    // catch(err) {
    //     res.status(200).json({message: "Something went wrong", success: false})
    // }
}


module.exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.taskId; 
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(400).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task deleted successfully", data: deletedTask });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
}