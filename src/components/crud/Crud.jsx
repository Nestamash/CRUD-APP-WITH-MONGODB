import { useState, useEffect } from 'react'
import './crud.scss'

function App() {
    const [inputValue, setInputValue] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [todos, setTodos] = useState([]);


    const [editInputValue, setEditInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEditButtonClick = (todo) => {
    setEditInputValue(todo.todo);
    setEditingTodo(todo);
    setIsEditing(true);
  };

  const handleEditInputChange = (event) => {
    setEditInputValue(event.target.value);
  };

  const handleEditSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/updateTodo/${editingTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedTodo: editInputValue }),
      });

      if (response.ok) {
        setSuccessMessage('Todo updated successfully');
        // Fetch updated todos after updating
        setTimeout(() => {
            setSuccessMessage('');
          }, 3000);

        fetchTodos();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to update todo');
        setTimeout(() => {
            setErrorMessage('');
          }, 3000);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setErrorMessage('An unexpected error occurred');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsEditing(false);
      setEditingTodo(null);
      setEditInputValue('');
    }
  };

    // fetch data from the database 
    const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:3000/todos');
          const data = await response.json();
    
          if (response.ok) {
            setTodos(data.todos || []);
          } else {
            console.error('Failed to fetch todos');
          }
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
    
      useEffect(() => {
        fetchTodos();
      }, []); // Fetch todos on component mount

console.log(todos.reverse())
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: inputValue }),
      });

      if (response.ok) {
        console.log('Todo added successfully');
        setSuccessMessage('Todo added successfully');
        setInputValue(''); // Clear the input field
          
        // Fetch updated todos after adding a new one
        fetchTodos();

        // You might want to update the state or perform any other necessary actions.
      
        // Set a timeout to clear the success message after 3 seconds
       setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } else {
        const errorData = await response.json();
        console.error('Failed to add todo');
        setErrorMessage(errorData.error || 'Failed to add todo');

         // Set a timeout to clear the error message after 3 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);

      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setErrorMessage('An unexpected error occurred');

       // Set a timeout to clear the error message after 3 seconds
    setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteTodo/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setSuccessMessage('Todo deleted successfully');
        // Fetch updated todos after deletion
        setTimeout(() => {
            setSuccessMessage('');
          }, 3000);

        fetchTodos();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to delete todo');

        setTimeout(() => {
            setErrorMessage('');
          }, 3000);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setErrorMessage('An unexpected error occurred');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };


  return (
    <div className='container'>
        <h1>Mongodb CRUD</h1>
        {successMessage && (
        <div className='success-message'>{successMessage}</div>
      )}
       {errorMessage && (
        <div className='error-message'>{errorMessage}</div>
      )}
        <form>
        {isEditing ? (
          <>
            <input type='text' value={editInputValue} onChange={handleEditInputChange} />
            <button onClick={handleEditSaveClick}>Save</button>
          </>
        ) : (
          <>
            <input type='text' value={inputValue} onChange={handleInputChange} />
            <button onClick={handleAddButtonClick}>Add</button>
          </>
        )}
        </form>
       
        <ul>
        {todos.slice().reverse().map((todo) => (
        <div className='list-items' key={todo._id}>
        <li>{todo.todo}</li>
        <div className='list-btns'>
        <button onClick={() => handleEditButtonClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteButtonClick(todo._id)}>Delete</button>
        </div>
    </div>
  ))}
        </ul>
    </div>
  )
}

export default App
