'use strict';

const { databaseError } = require('../errors');
const logger = require('../logger');

module.exports = (sequelize, DataTypes) => {
  const UserAlbum = sequelize.define(
    'userAlbum',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        unique: 'user_album_unique'
      },
      album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'user_album_unique'
      }
    },
    {
      uniqueKeys: {
        user_album_unique: {
          name: 'Unique value per user and album',
          singleField: false,
          fields: ['user_id', 'album_id']
        }
      }
    }
  );

  UserAlbum.associate = models => {
    UserAlbum.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  };

  UserAlbum.createModel = userAlbum =>
    UserAlbum.create(userAlbum)
      .then(newUserAlbum => newUserAlbum)
      .catch(error => {
        logger.error(error.message);
        throw databaseError(error.message);
      });

  UserAlbum.getOne = userAlbum => UserAlbum.findOne({ where: userAlbum });

  return UserAlbum;
};
