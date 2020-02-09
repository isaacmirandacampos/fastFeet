import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, res) {
    const { description } = req.body;
    const { deliveryId } = req.params;

    const deliveryProblem = await DeliveryProblem.create({
      description,
      delivery_id: deliveryId,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
