const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db')

const Product = db.sequelize.define("Product", {
   name: {
       type: DataTypes.TEXT('tiny'),
       allowNull: false
   },
   description: {
       type: DataTypes.TEXT('tiny'),
       allowNull: false
   },
   price: {
       type: DataTypes.DOUBLE,
       allowNull: false,
   },
})

const Store = db.sequelize.define("Store", {
   name: {
       type: DataTypes.TEXT('tiny'),
       allowNull: false
   },
   description: {
       type: DataTypes.TEXT('tiny'),
       allowNull: false
   }
})

const Category = db.sequelize.define('Category', {
   name: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false 
   },
   description: {
       type: DataTypes.TEXT('tiny'),
       allowNull: false
   },
   icon: {
        type: DataTypes.BLOB,
        allowNull: true
   }
})

const syncDB = async () => {
    await db.sequelize.sync()
}

Store.hasMany(Product, {constraints: false})
Product.belongsTo(Store, {constraints: false})

Product.belongsToMany(Category, {through: "ProductCategory", foreignKey: "Product_productID", constraints: false})
Category.belongsToMany(Product, {through: "ProductCategory", foreignKey: "Category_productID", constraints: false})

Category.belongsToMany(Store, {through: "CategoryStore", foreignKey: "Category_categoryID", constraints: false})
Store.belongsToMany(Category, {through: "CategoryStore", foreignKey: "Store_storeID", constraints: false})

module.exports = {
   Category,
   Store,
   Product,
   syncDB
}