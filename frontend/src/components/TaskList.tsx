import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  //Estado para gerenciar o filtro
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error: any) {
      if (error.response && error.response.status !== 401) {
        console.error('Erro ao carregar tarefas:', error);
        setErrorMessage(`Erro ao carregar tarefas: ${error.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || newTaskTitle.length < 3) {
      setErrorMessage('O título da tarefa é obrigatório e deve ter no mínimo 3 caracteres.');
      return;
    }
    setErrorMessage('');

    try {
      await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false, 
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks();
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(`Erro ao criar tarefa: ${error.response.data.message}`);
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !newTaskTitle) return;
    setErrorMessage('');

    try {
      await api.put(`/tasks/${editingTask.id}`, {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: editingTask.completed,
      });
      setEditingTask(null);
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks();
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(`Erro ao atualizar tarefa: ${error.response.data.message}`);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error: any) {
        if (error.response) {
          setErrorMessage(`Erro ao deletar tarefa: ${error.response.data.message}`);
        } else {
          console.error('Erro de rede ao deletar tarefa:', error);
          setErrorMessage('Erro de rede ao deletar tarefa. Tente novamente.');
        }
      }
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    try {
      await api.put(`/tasks/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(`Erro ao atualizar status: ${error.response.data.message}`);
      }
    }
  };

  // NOVO: Lógica para filtrar as tarefas
  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'completed') {
      return task.completed;
    }
    if (filterStatus === 'pending') {
      return !task.completed;
    }
    return true; // 'all'
  });

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Minhas Tarefas</h2>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="task-form">
        <h3>{editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</h3>
        <input 
          type="text" 
          placeholder="Título da tarefa" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Descrição da tarefa (opcional)" 
          value={newTaskDescription} 
          onChange={(e) => setNewTaskDescription(e.target.value)} 
        />
        {errorMessage && (
          <p className="form-error-message">{errorMessage}</p>
        )}
        <div className="form-buttons">
          <button type="submit">{editingTask ? 'Salvar Edição' : 'Adicionar'}</button>
          {editingTask && <button type="button" onClick={() => { setEditingTask(null); setNewTaskTitle(''); setNewTaskDescription(''); }}>Cancelar</button>}
        </div>
      </form>
      
      {/* NOVO: UI para o filtro */}
      <div className="filter-container">
        <label htmlFor="filter">Filtrar por:</label>
        <select id="filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}>
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      <div className="task-list">
        {/* NOVO: Renderiza a lista filtrada */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span className="task-status">{task.completed ? 'Concluída' : 'Pendente'}</span>
              </div>
              <div className="task-actions">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task.id, task.completed)} 
                />
                <button onClick={() => handleEditTask(task)}>Editar</button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;