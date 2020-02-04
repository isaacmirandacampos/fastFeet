import * as Yup from 'yup';
import Shipper from '../models/Shipper';

class ShipperController {
  async index(req, res) {
    const shippers = await Shipper.findAll();

    return res.json(shippers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    const shipperExist = await Shipper.findOne({ where: { email } });

    if (shipperExist) {
      return res.status(400).json({ error: 'email already registered' });
    }

    await Shipper.create({ name, email });

    return res.json({ Shipper: { name, email } });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const oldShipper = await Shipper.findByPk(id);

    const newShipper = await oldShipper.update(req.body);

    return res.json(newShipper);
  }

  async delete(req, res) {
    const { id } = req.params;

    const shipper = await Shipper.findByPk(id);

    shipper.destroy();

    return res.status(200).json({ success: 'Complete Delete' });
  }
}

export default new ShipperController();
