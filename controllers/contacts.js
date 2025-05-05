const {
  getAll,
  getSingle,
  insertData,
  updateData,
  deleteData,
} = require('../data/database');

const index = async (req, res) => {
  try {
    //#swagger.tags = ['Contacts']
    const result = await getAll('contacts');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    //#swagger.tags = ['Contacts']
    const userId = req.params.id;
    const result = await getSingle('contacts', userId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    //#swagger.tags = ['Contacts']
    const { firstName, lastName, phone, email, favoriteColor, birthday } =
      req.body;
    const user = { firstName, lastName, phone, email, favoriteColor, birthday };
    await insertData('contacts', user);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
};

const update = async (req, res) => {
  try {
    //#swagger.tags = ['Contacts']
    const userId = req.params.id;
    const { firstName, lastName, phone, email, favoriteColor, birthday } =
      req.body;
    const user = { firstName, lastName, phone, email, favoriteColor, birthday };

    const result = await updateData('contacts', userId, user);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    //#swagger.tags = ['Contacts']
    const userId = req.params.id;
    const result = await deleteData('contacts', userId);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
