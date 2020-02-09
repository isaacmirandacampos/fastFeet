import Order from '../models/Order';
import Shipper from '../models/Shipper';
import Recipient from '../models/Recipient';

class DeliveryOrderController {
  async index(req, res) {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: { deliveryman_id: id, canceled_at: null, end_date: null },
      attributes: ['id', 'product'],
      include: [
        { model: Shipper, as: 'shipper', attributes: ['id', 'name', 'email'] },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'city',
            'state',
            'zip_code',
            'complement',
          ],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new DeliveryOrderController();
