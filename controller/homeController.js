

const User = require('../models/user');
const Inventory = require('../models/inventory');

module.exports.home = async function(req, res) {
    try {
        const inventoryItems = await Inventory.find({}).sort('-createdAt');
        const user = req.user;

        return res.render('home', { inventoryItems, user });
    } catch (err) {
        console.error('Error loading home Page Data', err);
        // Handle the error and send an error response
    }
};