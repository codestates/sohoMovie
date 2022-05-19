'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  carts.init({
    user_id: DataTypes.STRING,
    b_title: DataTypes.STRING,
    b_date: DataTypes.STRING,
    b_time: DataTypes.STRING,
    b_quantity: DataTypes.STRING,
    b_price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'carts',
  });
  return carts;
};