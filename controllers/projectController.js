const db = require('../database/database');

exports.getAllProjects = async (req, res) => {
    try {
        const [projects, _] = await db.query('SELECT * FROM projects');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).send('Error retrieving projects');
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const [project, _] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).send('Error retrieving project');
    }
};

exports.createProject = async (req, res) => {
    try {
        const { name, description, created_by } = req.body;
        await db.query('INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)', [name, description, created_by]);
        res.status(201).send('Project created successfully');
    } catch (err) {
        res.status(500).send('Error creating project');
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        await db.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
        res.status(200).send('Project updated successfully');
    } catch (err) {
        res.status(500).send('Error updating project');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.status(200).send('Project deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting project');
    }
};