import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.STRING,
        end_date: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Shipper, {
      foreignKey: 'deliveryman_id',
      as: 'shipper',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'file',
    });
  }
}

export default Order;
