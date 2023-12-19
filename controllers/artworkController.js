const db = require('../config/database');

exports.getAllArtworks = async (req, res) => {
    try {
        const [artworks, _] = await db.query('SELECT * FROM artworks');
        res.status(200).json(artworks);
    } catch (err) {
        res.status(500).send('Error retrieving artworks');
    }
};

exports.getArtworkById = async (req, res) => {
    try {
        const [artwork, _] = await db.query('SELECT * FROM artworks WHERE id = ?', [req.params.id]);
        res.status(200).json(artwork);
    } catch (err) {
        res.status(500).send('Error retrieving artwork');
    }
};

exports.createArtwork = async (req, res) => {
    try {
        const { title, description, created_by, price, is_available } = req.body;
        await db.query('INSERT INTO artworks (title, description, created_by, price, is_available) VALUES (?, ?, ?, ?, ?)', [title, description, created_by, price, is_available]);
        res.status(201).send('Artwork created successfully');
    } catch (err) {
        res.status(500).send('Error creating artwork');
    }
};

exports.updateArtwork = async (req, res) => {
    try {
        const { title, description, price, is_available } = req.body;
        await db.query('UPDATE artworks SET title = ?, description = ?, price = ?, is_available = ? WHERE id = ?', [title, description, price, is_available, req.params.id]);
        res.status(200).send('Artwork updated successfully');
    } catch (err) {
        res.status(500).send('Error updating artwork');
    }
};

exports.deleteArtwork = async (req, res) => {
    try {
        await db.query('DELETE FROM artworks WHERE id = ?', [req.params.id]);
        res.status(200).send('Artwork deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting artwork');
    }
};