import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Shipper from '../models/Shipper';
import File from '../models/File';

class DeliveryProblemController {
  async index(req, res) {
    const { deliveryId } = req.params;
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: deliveryId },
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
          include: [
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
            {
              model: Shipper,
              as: 'shipper',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { description } = req.body;
    const { deliveryId } = req.params;

    const deliveryProblem = await DeliveryProblem.create({
      description,
      delivery_id: deliveryId,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { deliveryId } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(deliveryId);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery not exist' });
    }

    const order = await Order.findByPk(deliveryProblem.delivery_id);
    order.canceled_at = new Date();
    order.save();
    return res.json(order);
  }
}

export default new DeliveryProblemController();
