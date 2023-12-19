const db = require('../config/database');

exports.getAllMessages = async (req, res) => {
    try {
        const [messages, _] = await db.query('SELECT * FROM messages');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).send('Error retrieving messages');
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, project_id, message } = req.body;
        await db.query('INSERT INTO messages (sender_id, receiver_id, project_id, message) VALUES (?, ?, ?, ?)', [sender_id, receiver_id, project_id, message]);
        res.status(201).send('Message sent successfully');
    } catch (err) {
        res.status(500).send('Error sending message');
    }
};