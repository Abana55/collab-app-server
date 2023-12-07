const db = require('../database/database');

exports.getAllCollaborations = async (req, res) => {
    try {
        const [collaborations, _] = await db.query('SELECT * FROM collaborations');
        res.status(200).json(collaborations);
    } catch (err) {
        res.status(500).send('Error retrieving collaborations');
    }
};

exports.getCollaborationById = async (req, res) => {
    try {
        const [collaboration, _] = await db.query('SELECT * FROM collaborations WHERE id = ?', [req.params.id]);
        res.status(200).json(collaboration);
    } catch (err) {
        res.status(500).send('Error retrieving collaboration');
    }
};

exports.createCollaboration = async (req, res) => {
    try {
        const { project_id, user_id, role } = req.body;
        await db.query('INSERT INTO collaborations (project_id, user_id, role) VALUES (?, ?, ?)', [project_id, user_id, role]);
        res.status(201).send('Collaboration created successfully');
    } catch (err) {
        res.status(500).send('Error creating collaboration');
    }
};

exports.deleteCollaboration = async (req, res) => {
    try {
        await db.query('DELETE FROM collaborations WHERE id = ?', [req.params.id]);
        res.status(200).send('Collaboration deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting collaboration');
    }
};