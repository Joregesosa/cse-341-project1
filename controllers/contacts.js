const {getAll, getSingle} = require('../data/database'); 

const index = async (req, res) => {
    try {
        const result = await getAll('contacts'); 
        res.status(200).json(result);
    } catch (error) { 
        res.status(500).json({message: error.message});
    }
}

const show = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await getSingle('contacts', userId); 
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) { 
        res.status(500).json({message: error.message});
    }
}

const create = async (req, res) => {
    const user = req.body; 
    try {
        const result = await insertData('contacts', user); 
        res.status(201).json(result);
    } catch (error) { 
        res.status(500).json({message: error.message});
    }
}

const update = async (req, res) => {
    const userId = req.params.id; 
    const user = req.body; 
    try {
        const result = await updateData('contacts', userId, user); 
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) { 
        res.status(500).json({message: error.message});
    }
}

const remove = async (req, res) => {
    const userId = req.params.id; 
    try {
        const result = await deleteData('contacts', userId); 
        if (result) {
            res.status(200).json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) { 
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    index,
    show,
    create,
    update,
    remove
}

