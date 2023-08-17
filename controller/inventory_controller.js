const Inventory=require('../models/inventory')

module.exports.create = async function(req, res) {
    try {
        const inventory = await Inventory.create({
            name: req.body.product,
            quantity: req.body.quantity
        });
        console.log('inventory created successfully:', inventory);
        return res.redirect('/'); // Redirect to the home page
    } catch (err) {
        console.error('Error in creating a Inventory:', err);
        // You can send an error response or perform error handling here.
    }
};

module.exports.home = async function(req, res) {
    try {
        const inventoryItems = await Inventory.find({}).sort('-createdAt'); // Fetch all inventory items
        return res.render('home', { inventoryItems }); // Pass the inventory data to the template
    } catch (err) {
        console.error('Error in fetching inventory:', err);
        // Handle the error and send an error response
    }
};


module.exports.destroy = async function(req, res) {
    try {
        const inventoryItemId = req.params.id; // Assuming you pass the inventory item ID as a URL parameter
        const inventoryItem = await Inventory.findByIdAndDelete(inventoryItemId);
        
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        console.log('Inventory item deleted successfully:', inventoryItem);
        return res.redirect('/'); // Redirect to the home page or send a JSON response
    } catch (err) {
        console.error('Error in deleting inventory item:', err);
        // Handle the error and send an error response
    }
};