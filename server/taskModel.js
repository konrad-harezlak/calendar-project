const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id: {
        type: String,
        require:true,
        unique: true,
    },
    title: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: false,
    },
    status:{
      type: Number,
      default:'0',  
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
