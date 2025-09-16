import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data));
  }, []);

  // Add task
  const addTask = async () => {
    const res = await axios.post("http://localhost:5000/api/tasks", { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  // Toggle complete
  const toggleTask = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="p-4">
      <h1>✅ Task Manager</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span style={{ textDecoration: t.completed ? "line-through" : "" }}
                  onClick={() => toggleTask(t._id, t.completed)}>
              {t.title}
            </span>
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

