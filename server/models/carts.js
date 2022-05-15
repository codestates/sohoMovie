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
    movie_num: DataTypes.INTEGER,
    b_date: DataTypes.DATE,
    b_time: DataTypes.STRING,
    b_quantity: DataTypes.INTEGER,
    b_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'carts',
  });
  return carts;
};