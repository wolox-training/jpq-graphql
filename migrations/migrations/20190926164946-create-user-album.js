'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'userAlbums',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          unique: 'user_album_unique'
        },
        album_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'user_album_unique'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
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
    ),
  down: queryInterface => queryInterface.dropTable('UserAlbums')
};
