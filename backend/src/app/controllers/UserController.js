import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = await User.create(req.body);

    return res.json(newUser);
  }
}

export default new UserController();
