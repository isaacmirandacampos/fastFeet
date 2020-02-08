import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Shipper from '../app/models/Shipper';
import File from '../app/models/File';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

require('dotenv/config');

const models = [User, Recipient, Shipper, File, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
