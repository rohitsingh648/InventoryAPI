const Inventory=require('../../../models/inventory')
module.exports.index= async function(req,res){
    const inventoryItems = await Inventory.find({}).sort('-createdAt');
    return res.json(200,{message:"Inventory list",
inventory: inventoryItems
})

}



module.exports.destroy = async function(req, res) {
    try {
        const inventoryItemId = req.params.id; // Assuming you pass the inventory item ID as a URL parameter
        const inventoryItem = await Inventory.findByIdAndDelete(inventoryItemId);
        
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        console.log('Inventory item deleted successfully:', inventoryItem);
        return res.json(200,{message:"Inventory deleted successfuly"}); // Redirect to the home page or send a JSON response
    } catch (err) {
        console.error('Error in deleting inventory item:', err);
        // Handle the error and send an error response
    }
};


module.exports.update = async function(req, res) {
    try {
        const inventoryItemId = req.params.id; // Assuming you pass the inventory item ID as a URL parameter
        console.log("req.params.id",inventoryItemId);
        const updatedData = {
            name: req.body.name, // Use "name" from the request body
            quantity: req.body.quantity
            
        };
        console.log("req body is",req.body);
        
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(inventoryItemId, updatedData, { new: true });
        
        if (!updatedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        
        console.log('Inventory item updated successfully:', updatedInventoryItem);
        
        return res.redirect('/'); // Redirect to the home page or send a JSON response
    } catch (err) {
        console.error('Error in updating inventory item:', err);
        // Handle the error and send an error response
    }
};
