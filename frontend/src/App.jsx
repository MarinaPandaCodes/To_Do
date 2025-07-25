import './App.css';
import TodoList from './components/TodoList';

import { useState,useEffect } from 'react';
import { get_todos, create_todo, delete_todo} from './api/endpoints';

import AddTodo from './components/AddTodo';

function App(){
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await get_todos();
      setTodos(todos);
    }
    fetchTodos();

  }, [])



  const addTodo = async (todo_name) => {
   const todo = await create_todo(todo_name);
   setTodos([todo, ...todos]);
  }

  const deleteTodo = async (id) => {
    delete_todo(id);
    setTodos(todos.filter((todo) => todo.id !== id))

  }
  return (
    <div className='App'>
      <div className='app-container'>
     <b> <h1 className='title'>ToDo List</h1></b>
     <AddTodo addTodo={addTodo}/>
     <TodoList todos={todos} deleteTodo={deleteTodo}/>
    </div>
    </div>
  );
}

export default App;


