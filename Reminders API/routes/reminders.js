const router = require('express').Router();
const controller = require('../controllers/reminders');
const Reminders = require('../models/reminders');
const { Op } = require('sequelize');

router
    .get('/:id', controller.findById)
    .get('/:user?/:after?', controller.find)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .patch('/:id', controller.updatepatch)
    .delete('/:id', controller.remove);

module.exports = router;
