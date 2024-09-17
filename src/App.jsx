import React, { useState, useCallback } from 'react';
import './App.css'; 

function App() {
  const [todos, setTodos] = useState({
    backlog: [],
    inProgress: [],
    done: []
  });
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback(() => {
    if (inputValue.trim() !== '') {
      setTodos((prevTodos) => ({
        ...prevTodos,
        backlog: [...prevTodos.backlog, { text: inputValue, completed: false }]
      }));
      setInputValue('');
    }
  }, [inputValue]);

  const moveTodo = (index, from, to) => {
    const todo = todos[from][index];
    const newFromTodos = todos[from].filter((_, i) => i !== index);
    const newToTodos = [...todos[to], todo];
    setTodos({ ...todos, [from]: newFromTodos, [to]: newToTodos });
  };

  const TodoColumn = ({ title, todos, from, to }) => (
    <div className="todo-column">
      <h3>{title}</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo.text}
            {to && (
              <button onClick={() => moveTodo(index, from, to)}>Move</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="todo-container">
      <div className="input-section">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="todo-columns">
        <TodoColumn 
          title="Backlog" 
          todos={todos.backlog} 
          from="backlog" 
          to="inProgress" 
        />
        <TodoColumn 
          title="In Progress" 
          todos={todos.inProgress} 
          from="inProgress" 
          to="done" 
        />
        <TodoColumn 
          title="Done" 
          todos={todos.done} 
          from="done"
        />
      </div>
    </div>
  );
}

export default App;
