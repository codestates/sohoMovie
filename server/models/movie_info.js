'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie_info.init({
    poster: DataTypes.STRING,
    title: DataTypes.STRING,
    tag: DataTypes.STRING,
    summary: DataTypes.STRING,
    price: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movie_info',
  });
  return movie_info;
};