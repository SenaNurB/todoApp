import axios from 'axios';

const BASE_URL = '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getTodoList() {
  try {
    const response = await axiosInstance.get('/todoList.json');

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
  } catch (error) {
    console.error('Error fetching todo list:', error);
    throw new Error('Failed to fetch todo list.');
  }
}

export async function storeTodo(todoData) {
  try {
    const response = await axiosInstance.post('/todoList.json', todoData);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.error('Error storing todo:', error);
    throw new Error('Failed to store todo.');
  }
}

export async function updateTodoFunc(id, todoData) {
  try {
    await axiosInstance.put(`/todoList/${id}.json`, todoData);
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw new Error(`Failed to update todo with id ${id}.`);
  }
}

export async function deleteTodo(id) {
  try {
    await axiosInstance.delete(`/todoList/${id}.json`);
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw new Error(`Failed to delete todo with id ${id}.`);
  }
}
