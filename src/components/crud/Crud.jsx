import { useState } from 'react'
import './crud.scss'

function App() {

  return (
    <div className='container'>
        <h1>Mongodb CRUD</h1>
        <form>
            <input type='text' />
            <button>Add</button>
        </form>
        <ul>
            <div className='list-items'>
                <li>First item</li>
                <div className='list-btns'>
                <button>Edit</button>
                <button>Delete</button>
                </div>
                
            </div>
            <div className='list-items'>
                <li>Second item 2</li>
                <div className='list-btns'>
                <button>Edit</button>
                <button>Delete</button>
                </div>
                
            </div>
        </ul>
    </div>
  )
}

export default App
