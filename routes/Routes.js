const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // saves files to 'uploads' directory

// Get all projects
app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (error, results) => {
      if (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });
  
  // Get a specific project by ID
  app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    db.query('SELECT * FROM projects WHERE id = ?', [projectId], (error, results) => {
      if (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
      } else {
        if (results.length === 0) {
          res.status(404).send('Project not found');
        } else {
          res.json(results[0]);
        }
      }
    });
  });
  
  // Create a new project
  app.post('/projects', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description], (error, results) => {
      if (error) {
        console.error('Error creating project:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).json({ id: results.insertId });
      }
    });
  });
  
  // Update a project by ID
  app.put('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const { name, description } = req.body;
    db.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, projectId], (error) => {
      if (error) {
        console.error('Error updating project:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  // Delete a project by ID
  app.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    db.query('DELETE FROM projects WHERE id = ?', [projectId], (error) => {
      if (error) {
        console.error('Error deleting project:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(204);
      }
    });
  });
  
  // ... (additional routes as needed)
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });