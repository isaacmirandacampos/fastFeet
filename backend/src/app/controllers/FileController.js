import File from '../models/File';
import Shipper from '../models/Shipper';

class FileController {
  // CONTINUE

  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    const { id } = req.params;
    const shipper = await Shipper.findByPk(id);

    shipper.avatar_id = file.id;

    await shipper.save();

    return res.json(file);
  }
}

export default new FileController();
