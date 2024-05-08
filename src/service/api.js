import axios from 'axios';

const BASE_URL = '';

export async function getTodoList() {
  const response = await axios.get(BASE_URL + '/todoList.json');

  const todoList = [];

  for (const key in response.data) {
    const todoObj = {
      id: key,
      text: response.data[key].text,
      date: response.data[key].date,
      checked: response.data[key].checked,
    };
    todoList.push(todoObj);
  }

  return todoList;
}

export async function storeTodo(todoData) {
  const response = await axios.post(BASE_URL + '/todoList.json', todoData);
  const id = response.data.name;
  return id;
}

export function updateTodoFunc(id, todoData) {
  return axios.put(BASE_URL + `/todoList/${id}.json`, todoData);
}

export function deleteTodo(id) {
  return axios.delete(BASE_URL + `/todoList/${id}.json`);
}
