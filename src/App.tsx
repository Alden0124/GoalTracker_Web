import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://goaltracker-admin.onrender.com/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('獲取todos失敗:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo 列表</h1>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo._id} className="border p-4 rounded-lg">
            <h2 className="font-bold">{todo.title}</h2>
            <p>{todo.description}</p>
            <p>狀態: {todo.completed ? '已完成' : '未完成'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
