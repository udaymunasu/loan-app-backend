var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

const customerModal = require("../modals/customers.modal");

/* POST/CREATE Customers listing. */
// Create a customer route
router.post('/save', async (req, res) => {
  const customerData = req.body;

  try {
    // Check if the required fields are present
    // const requiredFields = [
    //   'firstName',
    //   'lastName',
    //   'emailAddress',
    //   'phoneNumber',
    //   'dob',
    //   'department',
    //   'address',
    //   'initial_deposit',
    //   'accountType',
    //   'accountNumber',
    //   'routingNumber',
    //   'identificationType',
    //   'identificationNumber',
    //   'employmentStatus',
    //   'employerName',
    //   'occupation',
    //   'annualIncome'
    // ];
    // const missingFields = requiredFields.filter(field => !customerData[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).json({ error: 'Missing required fields', missingFields });
    // }

    // Create a new customer
    const customer = new customerModal(customerData);
    const savedCustomer = await customer.save();

    return res.status(201).json({
      message: 'Customer created successfully',
      status: 'success',
      data: savedCustomer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create customer' });
  }
});


/* GET All Customers listing. */

router.get('/list', async (req, res) => {
  try {
    const customers = await customerModal.find();
    const totalCustomers = customers.length;

    const responseData = {
      totalCustomers: totalCustomers,
      customers: customers
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }


});


// get customers by Id

router.get('/view/:id', async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await customerModal.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



/* GET details of specific particular Customers listing. */
router.get("/view/id", function (req, res, next) {

  const userId = req.params.id;

  customerModal.findById(userId, function (err, customerListRespose) {
    if (err) {
      res.send({ status: 500, messaage: "UNABLE TO Find CUSTOMER" });
    } else {
      //  const recordCount = customerListRespose.length;
      res.send({ status: 200, customerDetails: customerListRespose });
    }
  });
});

/* Update Customers listing. */
router.put("/update/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let phoneNumber = req.body.phoneNumber;
    let dob = req.body.dob;
    let department = req.body.department;

    let customerObj = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      dob: dob,
      department: department,
    };

    const updatedCustomer = await customerModal.findByIdAndUpdate(userId, customerObj, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ status: 404, message: 'Customer not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Customer updated successfully',
      customerDetails: updatedCustomer
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ status: 500, message: 'Unable to update customer' });
  }
});

/* Delete Customers listing. */
router.delete('/delete/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const deletedCustomer = await customerModal.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ status: 404, message: 'Customer not found' });
    }

    return res.status(200).json({ status: 200, message: 'Customer deleted successfully', result: deletedCustomer });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return res.status(500).json({ status: 500, message: 'Unable to delete customer' });
  }
});


/* search Customers listing. */
router.get("/search", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
