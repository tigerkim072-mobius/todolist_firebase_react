import { useState } from 'react';
import { addTodo, fetchTodos } from './services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('newTitle:', newTitle);
    // handleAddTodo(newTitle);

    const title = newTitle.trim();
    if (!title) return;
    setAdding(true);

    try {
      await addTodo(title);
      setNewTitle('');

      const data = await fetchTodos();
      setTodos(data);
      console.log('Fetched todos:', data);
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('할일 추가 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setAdding(false);
    }
  };
  return (
    <main className="min-h-screen flex bg-slate-100  items-center justify-center text-3xl  p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 ">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-800">
          Firebase Todo List App
        </h1>
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="할일을 입력하세요"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 font-medium transition-colors 
              duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? '추가 중...' : '추가'}
          </button>
        </form>
        <ul className="space-y-2 max-h-[400px] overflow-y-auto ">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className="text-sm ${
                    todo.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }"
                >
                  {todo.title}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
