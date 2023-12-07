const db = require('../database/database');

exports.getAllTransactions = async (req, res) => {
    try {
        const [transactions, _] = await db.query('SELECT * FROM transactions');
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).send('Error retrieving transactions');
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const { artwork_id, buyer_id, sale_price } = req.body;
        await db.query('INSERT INTO transactions (artwork_id, buyer_id, sale_price) VALUES (?, ?, ?)', [artwork_id, buyer_id, sale_price]);
        res.status(201).send('Transaction completed successfully');
    } catch (err) {
        res.status(500).send('Error creating transaction');
    }
};