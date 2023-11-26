const mongoose = require('mongoose');


const loanSchema = mongoose.Schema({
    loanName: String,
    loanType: String,
    loanAmount: Number,
    loanIssueDate: Date,
    loanStatus: String,
    
});

const loanModal = mongoose.model('Loans', loanSchema);

module.export = loanModal