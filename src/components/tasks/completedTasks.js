import React, { useState, useEffect } from 'react';
import CompletedTaskCard from './completedTaskCard';
import ApiManager from '../../modules/ApiManager';


const activeUserId = sessionStorage.getItem("credentials")
console.log("hello! from CompletedtaskList", activeUserId)

const CompletedTaskList = (props) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
        return ApiManager.getByUserId("tasks", activeUserId).then(tasksFromAPI => {
            setTasks(tasksFromAPI)
        });
    };
    const deleteTask = id => {
        ApiManager.deleteObject("tasks", id)
            .then(() => getTasks());
    };
    const editTask = editedTask => {
        ApiManager.editObject("tasks", editedTask)
            //.then(() => props.history.push("/tasks"))
            .then(() => getTasks());
            console.log("editing", editedTask)
    };
    
    useEffect(() => {
            getTasks();    
    }, []);

  
    return (
        <>
            <div className="container-cards">
                <button type="button"
                    className="btn"
                    onClick={() => { props.history.push("/tasks/new") }}>
                    Add Task
                </button>
                <button type="button"
                    className="btn"
                    onClick={() => { props.history.push("/tasks") }}>
                    view incomplete tasks
                </button>
                {tasks.map(task => task.complete && <CompletedTaskCard key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} activeUserId={activeUserId} {...props} />)}
            </div>
            <section className="section-content">

            </section>
        </>
    );
};
export default CompletedTaskList