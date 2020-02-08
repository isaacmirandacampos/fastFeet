import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Shipper from '../models/Shipper';
import File from '../models/File';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
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
        { model: Shipper, as: 'shipper', attributes: ['id', 'name', 'email'] },
        { model: File, as: 'file', attributes: ['id', 'name', 'path', 'url'] },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exist' });
    }

    const deliveryman = await Shipper.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exist' });
    }
    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;

    const oldOrder = await Order.findByPk(id);

    if (!oldOrder) {
      return res.status(400).json({ error: 'order not exist' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    oldOrder.signature_id = file.id;

    const newOrder = await oldOrder.save();

    return res.json(newOrder);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exist' });
    }

    await order.destroy();

    return res.json({ Message: 'Success' });
  }
}

export default new OrderController();
