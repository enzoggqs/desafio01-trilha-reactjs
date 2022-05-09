import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  let tasksID: number[] = [];
  tasks.forEach((task: Task) => {
    tasksID.push(task.id)
  })

  function generateTaskId(): number {
    let newTaskID: number = Math.random();
    
    if(tasksID.includes(newTaskID)){
      return generateTaskId()
    }
    else{
      return newTaskID;
    }
  }

  function handleCreateNewTask() {
    newTaskTitle && setTasks([...tasks, 
      {
        id: generateTaskId(), 
        title: newTaskTitle, 
        isComplete: false
      }
    ])
  }

  function handleToggleTaskCompletion(id: number) {
    let auxArr: Task[] = tasks;
    const taskIndex: number = auxArr.findIndex(task => {
      return task.id === id;  
    })

    if(taskIndex !== -1){
      auxArr[taskIndex].isComplete = !auxArr[taskIndex].isComplete
    }
    
    setTasks([...auxArr])
    }

  function handleRemoveTask(id: number) {
    let auxArr: Task[] = tasks;
    auxArr = auxArr.filter(element => element.id != id);
    setTasks([...auxArr])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}