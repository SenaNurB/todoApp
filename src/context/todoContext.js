import {createContext, useReducer} from 'react';

export const TodoContext = createContext({
  todoList: [],
  setTodoList: todoList => {},
  addTodo: text => {},
  deleteTodo: id => {},
  updateTodo: (id, {text, checked, date}) => {},
});

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      const reversedData = action.payload.reverse();
      return reversedData;
    case 'ADD':
      return [action.payload, ...state];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'UPDATE':
      const updateTodoIndex = state.findIndex(
        todo => todo.id === action.payload.id,
      ); // Hangi elemansa index'ini buluyoruz
      const updateTodo = state[updateTodoIndex]; // elemanı bulup değişkene atıyoruz. Güncellenecek kurs.
      const updateItem = {...updateTodo, ...action.payload.data}; // güncelleme işlemi
      const updateTodoList = [...state];
      updateTodoList[updateTodoIndex] = updateItem; // Liste içerisinde güncelleme yaptık
      return updateTodoList;
    default:
      return state;
  }
};

const TodoContextProvider = ({children}) => {
  const [todoListState, dispatch] = useReducer(todoListReducer, []);

  const setTodoList = todoList => {
    dispatch({type: 'SET', payload: todoList});
  };

  const addTodo = todoData => {
    dispatch({type: 'ADD', payload: todoData});
  };

  const deleteTodo = id => {
    dispatch({type: 'DELETE', payload: id});
  };

  const updateTodo = (id, todoData) => {
    dispatch({type: 'UPDATE', payload: {id: id, data: todoData}});
  };

  const value = {
    todoList: todoListState,
    setTodoList: setTodoList,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
