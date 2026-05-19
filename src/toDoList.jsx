import { useState } from 'react';
import React from "react"
import './index.css'

function ToDoList(){

    const [tasks, setTasks] = useState(['Eat Breakfast', 'Workout']);
    const [newTask, setNewTask] = useState([]);

    function handleInputChange(event){
        setNewTask(event.target.value);
        

    }

    function addTask(){
        if (newTask.trim() !== ''){
            setTasks(t => [...t,newTask]);
            setNewTask('');
        }


    }

    function deleteTask(index){
        

    }

    function moveTaskeUp(index){

    }

    function moveTaskDown(index){

    }

    

    return  (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text" 
                    placeholder='Enter a Task....'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button 
                    className = 'add-btn' 
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task,index) =>
                    <li key = {index} >
                        <span className='text' >{task}</span>
                        <button
                           className='dlt-btn'
                           onClick={() => deleteTask(index)}>                
                           Delete
                        </button>
                        <button
                           className='move-btn'
                           onClick={() => moveTaskeUp(index)}>
                           ☝️
                        </button>
                        <button
                           className='move-btn'
                           onClick={() => moveTaskDown(index)}>
                           👇
                        </button>
                    </li>
                )}
            </ol>

        </div>
    )
}

export default ToDoList