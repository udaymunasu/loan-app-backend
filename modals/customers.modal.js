
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        emailAddress: { type: String },
        phoneNumber: { type: String },
        dob: { type: String },
        department: { type: String },
        address: { type: String },
        initial_deposit: { type: Number },
        accountType: { type: String },
        accountNumber: { type: String },
        routingNumber: { type: String },
        identificationType: { type: String },
        identificationNumber: { type: String },
        employmentStatus: { type: String },
        employerName: { type: String },
        occupation: { type: String },
        annualIncome: { type: Number }
    }
);
let customerModal = mongoose.model("customers", schema);
module.exports = customerModal;

