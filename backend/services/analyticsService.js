const Employee = require('../models/Employee');
const User = require('../models/User');
const Mistake = require('../models/Mistake');

exports.getAnalytics = async (role) => {
  const totalEmployees = await Employee.countDocuments();
  const totalMistakes = await Mistake.countDocuments();
  const solvedMistakes = await Mistake.countDocuments({ solved: true });
  const unsolvedMistakes = totalMistakes - solvedMistakes;

  const base = { totalEmployees, totalMistakes, solvedMistakes, unsolvedMistakes };

  if (role === 'admin') {
    const totalSupervisors = await User.countDocuments({ role: 'supervisor' });
    return { ...base, totalSupervisors };
  }
  return base;
};

exports.getChartData = async (type) => {
  if (type === 'byType') {
    return Mistake.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]);
  } else if (type === 'byShift') {
    return Mistake.aggregate([{ $group: { _id: '$shift', count: { $sum: 1 } } }]);
  }
  throw new Error('Invalid chart type');
};