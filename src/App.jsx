import { useState } from 'react';
import { addTodo } from './services/todoService';

function App() {
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
      addTodo(title);
      setNewTitle('');
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
      </div>
    </main>
  );
}

export default App;
