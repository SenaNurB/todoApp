import {useState, useEffect, useContext} from 'react';
import {TodoContext} from '../context/todoContext';
import {getTodoList, storeTodo, updateTodoFunc} from '../service/api';

const useTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const todoContext = useContext(TodoContext);
  const {todoList, setTodoList, addTodo, updateTodo} = todoContext;

  useEffect(() => {
    const fetchTodos = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const todos = await getTodoList();
        setTodoList(todos);
      } catch (e) {
        setError('Failed to fetch todos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [setTodoList]);

  const addOrUpdateTodo = async (todoData, isEditing, updateTodoItem) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateTodoFunc(updateTodoItem.id, todoData);
        updateTodo(updateTodoItem.id, todoData);
      } else {
        const id = await storeTodo(todoData);
        addTodo({...todoData, id});
      }
    } catch (e) {
      setError('Failed to add or update todo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  const filteredTodoList = todoList.filter(todo =>
    todo.text.toLowerCase().includes(searchText.toLowerCase()),
  );

  return {
    todoList,
    filteredTodoList,
    isLoading,
    error,
    searchText,
    setSearchText,
    handleSearch,
    addOrUpdateTodo,
  };
};

export default useTodos;
