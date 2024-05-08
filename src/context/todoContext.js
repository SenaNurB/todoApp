import {createContext, useReducer} from 'react';

const todoData = [
  {
    id: '1',
    text: 'asjkdhjksahdksajdhkas klasjdklsajdlsakdja ksajdlskajdlasjdla dkjfklsdjflajflsdfjakldjfaklfjaljfalslkadjlasjdalskdjal',
    checked: false,
  },
  {
    id: '2',
    text: 'asjkdhjksahdksajdhkas klasjdklsajdlsakdja ksajdlskajdlasjdla asjdnksadnsak kjasdhksahkdsa',
    checked: true,
  },
  {
    id: '3',
    text: 'asjkdhjksahdksajdhkas klasjdklsajdlsakdja ksajdlskajdlasjdla asjdnksadnsak kjasdhksahkdsa askjdksadlksajdsaljdaslhsajkbdjk ksajhdksahdkjsa kjsahdksahdkas askjdhksahdkjsa sakjdhksahdkjsa sakjdhksahdkjas ajkshdksahdksa kjsahdksahdkjas kajshdkshdka',
    checked: false,
  },
];

export const TodoContext = createContext({
  todoList: [],
  addTodo: text => {},
  deleteTodo: id => {},
  updateTodo: (id, {text, checked, date}) => {},
});

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString;
      return [
        {...action.payload, id: id, checked: false, date: new Date()},
        ...state,
      ];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'UPDATE':
      const updateTodoIndex = state.findIndex(
        todo => todo.id === action.payload.id,
      ); // Hangi elemansa index'ini buluyoruz
      const updateTodo = state[updateTodoIndex]; // elemanı bulup değişkene atıyoruz. Güncellenecek kurs.
      console.log(updateTodo);
      const updateItem = {...updateTodo, ...action.payload.data}; // güncelleme işlemi
      const updateTodoList = [...state];
      updateTodoList[updateTodoIndex] = updateItem; // Liste içerisinde güncelleme yaptık
      return updateTodoList;
    default:
      return state;
  }
};

const TodoContextProvider = ({children}) => {
  const [todoListState, dispatch] = useReducer(todoListReducer, todoData);

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
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
  };

  console.log(todoListState);

  // console.log(value.todoList);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
