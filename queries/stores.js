const models = require("../models/models");

const createStores = async () => {
    const categories = await models.Category.findAll()
    const storeOne = await models.Store.create({
        name: "Store 1",
        description: "Store 1 description",
    }, {
        include: [models.Category]
    })
    const storeTwo = await models.Store.create({
        name: "Store 2",
        description: "Store 2 description",
    }, {
        include: [models.Category]
    })
    const storeThree = await models.Store.create({
        name: "Store 3",
        description: "Store 3 description",
    }, {
        include: [models.Category]
    })
    
    await storeOne.setCategories([categories[0], categories[1], categories[2], categories[3], categories[4], categories[5]])
    await storeTwo.setCategories([categories[0], categories[4], categories[6]])
    await storeThree.setCategories([categories[7], categories[8]])
}

module.exports = {
    createStores
}