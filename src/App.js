import { useEffect, useState } from 'react';

import ToDo from './components/ToDo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from './utils/HandleApi';

function App() {

  const [toDo, setToDo] = useState ([])
  const [text,setText] = useState ("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
  return (
    <div className="App">
      <div className='container'> 
        <h1> ToDo List For Your Daily Routine</h1>
        <h2> Enter the task you want complete and Click "Add" </h2>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <h3>API Endpoints</h3>
              <p>Use the following endpoints in Postman for testing:</p>
              <ul>
                <li><strong>Get All To-Do Items</strong> (GET): <a href="http://localhost:5119/" target="_blank" rel="noopener noreferrer">http://localhost:5119/</a></li>
                <li><strong>Add a New To-Do Item</strong> (POST): <code>http://localhost:5119/save</code></li>
                <li><strong>Update a To-Do Item</strong> (POST): <code>http://localhost:5119/update</code></li>
                <li><strong>Delete a To-Do Item</strong> (POST): <code>http://localhost:5119/delete</code></li>
              </ul>
        </div>

        <div className='top'>
          <input 
          type="text" 
          placeholder='Add ToDos...' 
          value={text}
          onChange={(e) => setText(e.target.value)} />
          <div className='add' onClick={ isUpdating ?
            () => updateToDo(toDoId,text,setToDo,setText,setIsUpdating) 
            :() => addToDo(text,setText,setToDo)}> {isUpdating ? "Update" : "Add" } </div>
        </div>
        <div className='list'> 
          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text}
          updateMode = {() => updateMode(item._id, item.text)} 
          
          deleteToDo = {() => deleteToDo(item._id, setToDo)} />)}
          
      </div>
      </div>

    </div>
  );
}

export default App;
