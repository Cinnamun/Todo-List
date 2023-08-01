import "./Popup.css"
import { useState } from "react"
import { MdError } from "react-icons/md"

function EditTask(props) {
    let data = JSON.parse(localStorage.getItem(props.todoKey))

    const [task, setTask] = useState(data.task)
    const [date, setDate] = useState(data.date)
    const [time, setTime] = useState(data.time)
    const [error, setError] = useState(false)

    // Close edit
    const handleClose = () => {
        data.edit = !data.edit
        localStorage.setItem(props.todoKey, JSON.stringify(data))
        window.location.reload()
    }

    // Edit task
    const handleSubmit = e => {
        if (!task || !date || !time) {
            e.preventDefault()
            setError(true)
        }
        else {
            localStorage.setItem(props.todoKey, JSON.stringify({key:props.todoKey, task:task, date:date, time:time, check:data.check, edit:false}))
        }
    }

    return (
        <div className="popupBg">
            <div className="createPopup">
                {error && <span className="errMsg"><MdError/> Please fill in all fields</span>}
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Task" value={task} onChange={e => setTask(e.target.value)}/>
                    <div>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)}/>
                    </div>
                    <div className="popupBtns">
                        <input type="submit" value="Edit"/>
                        <button className="redBtn" onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask
