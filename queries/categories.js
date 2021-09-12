const models = require("../models/models");

const createCategories = async () => {
    for (i = 1; i < 11; i++){
        const category = await models.Category.create({
            name: `Category ${i}`,
            description: `Category description no. ${i}`,
        })
    }
}

module.exports = {
    createCategories
}