import './App.css';
import TodoList from './components/TodoList';

function App(){
  return (
    <div className='App'>
      <div className='app-container'>
     <b> <h1 className='title'>ToDo App</h1></b>
     <TodoList />
    </div>
    </div>
  );
}

export default App;


