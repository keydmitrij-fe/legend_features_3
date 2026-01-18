const API = 'https://easydev.club/api/v1/todos';

export async function getTodos(status) {
  const response = await fetch(`${API}?filter=${status}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return data;
}

export async function addTodo(title) {
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDone: false, title }),
  });

  if (!response.ok) {
    throw new Error('Error adding a task');
  }
}

export async function deleteTodo(id) {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error when deleting task');
  }
}

export async function editTodo(id, editedTodo) {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedTodo),
  });

  if (!response.ok) {
    throw new Error('Error editing task');
  }
}
