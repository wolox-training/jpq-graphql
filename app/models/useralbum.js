'use strict';
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
          fields: ['userId', 'albumId']
        }
      }
    }
  );

  UserAlbum.associate = models => {
    UserAlbum.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  };

  UserAlbum.createModel = userAlbum => UserAlbum.create(userAlbum);

  return UserAlbum;
};
