const models = require("../models/models")

const createProducts = async () => {
    // store one products
    const storeOne = await models.Store.findOne({where: {id: 1}, include: [models.Category, models.Product]})
    const categoriesStoreOne = await storeOne.getCategories()
    const productOne = await models.Product.create({
        name: "Product 1",
        description: "Product 1 description",
        price: 2.99,
    }, {
        include: [models.Category, models.Store]
    })
    const productTwo = await models.Product.create({
        name: "Product 2",
        description: "Product 2 description",
        price: 4.99,
    }, {
        include: [models.Category, models.Store]
    })
    const productThree = await models.Product.create({
        name: "Product 3",
        description: "Product 3 description",
        price: 6.99,
    }, {
        include: [models.Category, models.Store]
    })
    const productFour = await models.Product.create({
        name: "Product 4",
        description: "Product 4 description",
        price: 5.99,
    }, {
        include: [models.Category, models.Store]
    })

    await productOne.addCategories([categoriesStoreOne[0], categoriesStoreOne[1]])
    await productTwo.addCategories([categoriesStoreOne[1], categoriesStoreOne[2]])
    await productThree.addCategories([categoriesStoreOne[2]])
    await productFour.addCategories([categoriesStoreOne[5]])

    await storeOne.addProducts([productOne, productTwo, productThree, productFour])

    //store two products
    const storeTwo = await models.Store.findOne({where: {id: 2}, include: [models.Category, models.Product]})
    const categoriesStoreTwo = await storeTwo.getCategories()
    const productFive = await models.Product.create({
        name: "Product 5",
        description: "Product 5 description",
        price: 2.99,
    }, {
        include: [models.Category, models.Store]
    })
    const productSix = await models.Product.create({
        name: "Product 6",
        description: "Product 6 description",
        price: 4.99,
    }, {
        include: [models.Category, models.Store]
    })
    const productSeven = await models.Product.create({
        name: "Product 7",
        description: "Product 7 description",
        price: 6.99,
    }, {
        include: [models.Category, models.Store]
    })

    await productFive.addCategories([categoriesStoreTwo[0], categoriesStoreTwo[1]])
    await productSix.addCategories([categoriesStoreTwo[1], categoriesStoreTwo[2]])
    await productSeven.addCategories([categoriesStoreTwo[2]])

    await storeTwo.addProducts([productFive, productSix, productSeven])

    //store three products
    const storeThree = await models.Store.findOne({where: {id: 3}, include: [models.Category, models.Product]})
    const categoriesStoreThree = await storeThree.getCategories()
    const productEight = await models.Product.create({
        name: "Product 8",
        description: "Product 8 description",
        price: 2.99,
    }, {
        include: [models.Category, models.Store]
    })
    
    await productEight.setCategories([categoriesStoreThree[0]])
    
    await storeThree.addProducts([productEight])
}

module.exports = {
    createProducts
}

