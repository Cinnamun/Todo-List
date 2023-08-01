import "./App.css"
import { useState } from "react"
import AddTask from "./AddTask"
import Task from "./Task"

function App() {
  const [addBtn, setAddBtn] = useState(false)

  // Delete done tasks
  const handleDelete = () => {
    let data = {...localStorage}
    data = Object.keys(data).map(key => (data[key]))
    data = data.map(todo => (JSON.parse(todo)))
    data.map(todo => {
      if (todo.check == true) {
        localStorage.removeItem(todo.key)
      }
    })
    window.location.reload()
  }

  // Clear list
  const handleClear = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="app">
      <div className="clip"></div>
      <div className="top">
        <span className="title">To-Do List</span>
        <button className="addTaskBtn" onClick={() => setAddBtn(true)}>Add Task</button>
        <AddTask trigger={addBtn} setTrigger={setAddBtn}/>
      </div>
      <Task/>
      <div>
        <button id="delDoneBtn" className="redBtn" onClick={handleDelete}>Delete Done Tasks</button>
        <button className="redBtn" onClick={handleClear}>Clear List</button>
      </div>
    </div>
  )
}

export default App
