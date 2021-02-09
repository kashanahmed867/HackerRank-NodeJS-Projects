const Reminders = require('../models/reminders');
const {Op} = require('sequelize');

function findById(req, res){
    Reminders.findByPk(req.params.id).then(reminder => {
        if (reminder) {
            return res.status(200).send(reminder);
        } else {
            return res.status(404).send('ID not found');
        }
    });
}

function find(req, res){
    const user = req.query.user;
    const after = req.query.after;
    if (user && after) {
        Reminders.findAll({ where: { user: user, date: { [Op.gte]: new Date(parseInt(after)).toISOString() } } }).then(reminders => res.status(200).json(reminders));
    } else if (user) {
        Reminders.findAll({ where: { user: user } }).then(reminders => res.status(200).json(reminders));
    } else if (after) {
        Reminders.findAll({ where: { date: { [Op.gte]: new Date(parseInt(after)).toISOString() } } }).then(reminders => res.status(200).json(reminders));
    } else {
        Reminders.findAll().then(reminders => res.status(200).json(reminders));
    }
}

function create(req, res){
    Reminders.create({
        user: req.body.user,
        description: req.body.description,
        date: req.body.date ? req.body.date : '2021-02-15T11:59:59.000Z'
    }).then(reminder => {
        res.status(201).json(reminder);
    });
}

function update(req, res){
    return res.status(405).send();
}

function updatepatch(req, res){
    return res.status(405).send();
}

function remove(req, res){
    return res.status(405).send();
}


module.exports = {
    findById,
    find,
    create,
    update,
    updatepatch,
    remove
}
