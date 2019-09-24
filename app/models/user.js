const logger = require('../logger');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.createModel = user =>
    User.create(user)
      .then(result => {
        logger.info(`The user ${user.firstName} ${user.lastName} was successfully created`);
        return {
          ...result.dataValues,
          name: `${user.firstName} ${user.lastName}`
        };
      })
      .catch(error => logger.error(error.message));

  User.getOne = user =>
    User.findOne({ where: user }).then(userResult => {
      if (!userResult) {
        return null;
      }
      return {
        ...userResult.dataValues,
        name: `${userResult.dataValues.firstName} ${userResult.dataValues.lastName}`
      };
    });

  User.getAll = () =>
    User.findAll().then(user =>
      user.map(item => ({
        ...item.dataValues,
        name: `${item.dataValues.firstName} ${item.dataValues.lastName}`
      }))
    );

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = props => this.update(props);

  return User;
};
