'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require(`bcrypt`);
const { SALT } = require(`../config/serverConfig`);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role , {
        through: `User_Roles`,
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,100],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user)=>{
    
    const encryptedPassword = bcrypt.hashSync(user.password , SALT);
    //console.log("Generated Hash for password ", user.password , " Is ", encryptedPassword );
    user.password = encryptedPassword;
  })

  return User;
};