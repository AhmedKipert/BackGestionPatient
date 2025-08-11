const express = require('express');
const adminController = require('../controllers/adminController')
const adminRoute = express.Router();

adminRoute.post('/admin/login', adminController.adminLogin);
adminRoute.post('/admin/signup', adminController.adminSignup);
module.exports = adminRoute;