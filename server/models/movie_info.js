'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_info.init({
    poster: DataTypes.STRING,
    title: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie_info',
  });
  return Movie_info;
};