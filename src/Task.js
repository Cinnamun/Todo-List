import "./Task.css"
import EditTask from "./EditTask"
import { MdMode, MdDelete } from "react-icons/md"

function Task() {
    const data = {...localStorage}
    const todoList = Object.keys(data).map(key => (data[key]))
    
    let newList = todoList.map(todo => (JSON.parse(todo)))
    newList.map(todo => {
        let newDate = new Date(todo.date.replace(/-/g, '\/'))
        todo.date = newDate.toLocaleDateString()
        let newTime = new Date("0000-01-01T" + todo.time + ":00")
        todo.time = newTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    })
    newList.sort((a, b) => (
        new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
    )).reverse()

    // Delete task
    const handleDelete = key => {
        localStorage.removeItem(key)
        window.location.reload()
    }

    // Checkbox
    const handleCheck = key => {
        let data = JSON.parse(localStorage.getItem(key))
        data.check = !data.check
        localStorage.setItem(key, JSON.stringify(data))
        window.location.reload()
    }

    // Edit task
    const handleEdit = key => {
        let data = JSON.parse(localStorage.getItem(key))
        data.edit = !data.edit
        localStorage.setItem(key, JSON.stringify(data))
        window.location.reload()
    }
    
    return (
        <div className="list">
            {newList.map(todo => (
                <div className="task">
                    <div className="taskL">
                        <label className="checkbox">
                            <input type="checkbox" onChange={() => handleCheck(todo.key)} checked={todo.check}/>
                            <span className="checkmark"></span>
                        </label>
                        <div>
                            {!todo.check && <span>{todo.task}</span>}
                            {todo.check && <span id="done">{todo.task}</span>}
                            <br/>
                            {!todo.check && <span className="info">{todo.date}, {todo.time}</span>}
                            {todo.check && <span id="done" className="info">{todo.date}, {todo.time}</span>}
                        </div>
                    </div>
                    <div className="taskR">
                        {!todo.check && <button id="editBtn" onClick={() => handleEdit(todo.key)}><MdMode/></button>}
                        {todo.edit && <EditTask todoKey={todo.key}/>}
                        <button id="delBtn" className="redBtn" onClick={() => handleDelete(todo.key)}><MdDelete/></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Task
