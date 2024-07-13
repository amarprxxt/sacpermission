const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requestPermission, getbystudent, resolve, getAllPermissions, getStudentIds, updatePermission } = require('../controllers/permissionController');

// @route   POST api/permission/register
// @desc    Register permission
// @access  Public
router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], requestPermission);

// @route   POST api/permission/student
// @desc    Get all permissions by student id
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

/* @route   POST api/permission/resolve
// @desc    Get permission by request id
// @access  Public
router.post('/resolve', [
    check('id', 'Request id is required').not().isEmpty()
], resolve);

*/
router.get('/all', getAllPermissions);

router.get('/students', getStudentIds);

router.put('/update', updatePermission);

module.exports = router;
