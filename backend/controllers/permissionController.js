const { validationResult } = require('express-validator');
const Permission = require('../models/Permission');
const Student = require('../models/Student');

// @route   Register api/permission/register
// @desc    Register permission
// @access  Public
exports.requestPermission = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, type, title, description } = req.body;
    try {
        const newPermission = new Permission({
            student,
            type,
            title,
            description
        });
        await newPermission.save();
        success = true;
        res.json({ success, msg: 'Permission request successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/permission/student
// @desc    Get all permissions by student id
// @access  Public
exports.getbystudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        const permissions = await Permission.find({ student });
        success = true;
        res.json({ success, permissions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/permission/resolve
// @desc    Resolve permission by permission id
// @access  Public
exports.resolve = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { id } = req.body;
    try {
        const permission = await Permission.findById(id);
        permission.status = "solved";
        await permission.save();
        success = true;
        res.json({ success });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getStudentIds = async (req, res) => {
    try {
      const students = await Student.find().select('_id'); // fetch only the _id field
      res.json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching students' });
    }
  };


  exports.updatePermission = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { permissionId, status } = req.body;

    // console.log(req.body);

    // console.log(permissionId);
    try {
        let permission = await Permission.findByIdAndUpdate(permissionId, {status}, {new:true});

       console.log(permission);

        if (!permission) {
            return res.status(404).json({ errors: [{ msg: 'Permission not found' }] });
        }
      //  console.log('Updated permission:', permission);

        res.json({ success: true, msg: 'Permission status updated successfully', permission });
    } catch (err) {
        console.error(err);
    const errorMessage = err.response ? err.response.text : 'Server error';
    res.status(500).send(errorMessage);
    }
};
 /* exports.updatePermission = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { id, status } = req.body;
    try {
        let permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({ success, message: 'Permission not found' });
        }
        permission.status = status;
        await permission.save();
        success = true;
        res.json({ success });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
*/