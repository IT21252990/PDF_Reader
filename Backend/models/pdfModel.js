const mongoose = require('mongoose');

const PDFSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    title:{
        type: String,
        required: true
    },

    filename: { 
        type: String, 
        required: true 
    },

    path: { 
        type: String, 
        required: true 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }
    
});

module.exports = mongoose.model('PDF', PDFSchema);
