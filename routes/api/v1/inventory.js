const express=require('express');
const router =express.Router();

const inventoryApi=require('../../../controller/api/v1/inventory_api')

router.get('/',inventoryApi.index);

router.delete('/:id',inventoryApi.destroy);
router.put('/:id', inventoryApi.update);

module.exports=router;