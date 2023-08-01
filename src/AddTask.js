import "./Popup.css"
import { useState } from "react"
import { MdError } from "react-icons/md"

function AddTask(props) {
    const [task, setTask] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [error, setError] = useState(false)

    // Add new task
    const handleSubmit = e => {
        if (!task || !date || !time) {
            e.preventDefault()
            setError(true)
        }
        else {
            let key = Math.floor(Math.random() * 10000)
            localStorage.setItem(key, JSON.stringify({key:key, task:task, date:date, time:time, check:false, edit:false}))
        }
    }

    return (props.trigger) ? (
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
                        <input type="submit" value="Add"/>
                        <button className="redBtn" onClick={() => {props.setTrigger(false); setError(false)}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    ) : ""
}

export default AddTask
