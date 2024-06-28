import {createContext, useReducer, useMemo, useCallback} from 'react';

// Action types
const SET = 'SET';
const ADD = 'ADD';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';

// Initial context
export const TodoContext = createContext({
  todoList: [],
  setTodoList: todoList => {},
  addTodo: text => {},
  deleteTodo: id => {},
  updateTodo: (id, {text, checked, date}) => {},
});

// Reducer function
const todoListReducer = (state, action) => {
  switch (action.type) {
    case SET:
      return action.payload.reverse();
    case ADD:
      return [action.payload, ...state];
    case DELETE:
      return state.filter(todo => todo.id !== action.payload);
    case UPDATE:
      const updatedIndex = state.findIndex(
        todo => todo.id === action.payload.id,
      );
      const updatedItem = {...state[updatedIndex], ...action.payload.data};
      return [
        ...state.slice(0, updatedIndex),
        updatedItem,
        ...state.slice(updatedIndex + 1),
      ];
    default:
      return state;
  }
};

// Context provider component
const TodoContextProvider = ({children}) => {
  const [todoListState, dispatch] = useReducer(todoListReducer, []);

  const setTodoList = useCallback(todoList => {
    dispatch({type: SET, payload: todoList});
  }, []);

  const addTodo = useCallback(todoData => {
    dispatch({type: ADD, payload: todoData});
  }, []);

  const deleteTodo = useCallback(id => {
    dispatch({type: DELETE, payload: id});
  }, []);

  const updateTodo = useCallback((id, todoData) => {
    dispatch({type: UPDATE, payload: {id, data: todoData}});
  }, []);

  const value = useMemo(
    () => ({
      todoList: todoListState,
      setTodoList,
      addTodo,
      deleteTodo,
      updateTodo,
    }),
    [todoListState, setTodoList, addTodo, deleteTodo, updateTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
