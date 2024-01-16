const express = require('express');
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require('./dbConnection');
const cors = require('cors');  // Import the cors package
const app = express();
const port = 3000;

// Mongodb connection
let db;
connectToDb((err) => {
    if(!err){
        // listening on port 3000
        app.listen(port, ()=>{
            console.log(`Listening on port ${port}`)
})
    db = getDb()
    }
})

// Use cors middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    // res.send('Hello world');
    res.json({mssg: 'Welcome to crud op'})
})

// insert into mongo db routes
app.post('/addTodo', async (req, res) => {
    try {
      const { todo } = req.body;
  
      if (!todo) {
        return res.status(400).json({ error: 'Todo is required' });
      }
  
      await db.collection('todos').insertOne({ todo });
  
      return res.status(201).json({ success: true, message: 'Todo added successfully' });
    } catch (error) {
      console.error('Error adding todo:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // fetch data and send to client/ user
app.get('/todos', async (req, res) => {
    try {
      const todos = await db.collection('todos').find().toArray();
      res.json({ todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // DELETE route to delete a todo
app.delete('/deleteTodo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.json({ success: true, message: 'Todo deleted successfully' });
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // PUT route to update a todo
app.put('/updateTodo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { updatedTodo } = req.body;
  
      const result = await db.collection('todos').updateOne(
        { _id: new ObjectId(id) },
        { $set: { todo: updatedTodo } }
      );
  
      if (result.matchedCount === 1) {
        res.json({ success: true, message: 'Todo updated successfully' });
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  

