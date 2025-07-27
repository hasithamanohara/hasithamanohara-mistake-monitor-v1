const Employee = require('../models/Employee');

exports.createEmployee = async (data) => {
  return Employee.create(data);
};

exports.getEmployees = async (search) => {
  const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { employeeId: new RegExp(search, 'i') }] } : {};
  return Employee.find(query);
};

exports.updateEmployee = async (id, data) => {
  return Employee.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteEmployee = async (id) => {
  return Employee.findByIdAndDelete(id);
};