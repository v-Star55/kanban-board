// Event handling module for form submissions and interactions
import { uid } from '../utils/utils.js';

/**
 * Attach submit handler to create new tasks.
 * @param {(task: { id: string, title: string, description: string, status: 'todo'|'in-progress'|'done' }) => void} onCreate
 */
export function bindCreateTaskForm(onCreate) {
  const form = document.getElementById('new-task-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    if (!title) {
      // Basic UX: focus title when empty
      const titleInput = /** @type {HTMLInputElement|null} */ (document.getElementById('task-title'));
      titleInput?.focus();
      return;
    }
    const task = { id: uid(), title, description, status: 'todo' };
    onCreate(task);
    form.reset();
  });
}


