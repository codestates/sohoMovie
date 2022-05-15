'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class showing_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  showing_info.init({
    movie_num: DataTypes.INTEGER,
    showing_date: DataTypes.STRING,
    showing_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'showing_info',
  });
  return showing_info;
};