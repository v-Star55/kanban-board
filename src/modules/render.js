// Rendering module: creates DOM for tasks and columns
import { createElement } from '../utils/utils.js';

/**
 * @param {import('./storage.js').Task} task
 * @returns {HTMLElement}
 */
export function renderTaskCard(task) {
  const title = createElement('h4', {}, [task.title]);
  const desc = createElement('p', {}, [task.description || '']);
  const badge = createElement('span', { className: 'badge', dataset: { status: task.status } }, [
    task.status === 'todo' ? 'To Do' : task.status === 'in-progress' ? 'In Progress' : 'Done',
  ]);
  const meta = createElement('div', { className: 'meta' }, [badge]);

  const card = createElement('article', {
    className: 'card',
    draggable: true,
    dataset: { id: task.id },
    role: 'article'
  }, [title, desc, meta]);
  return card;
}

/**
 * Render all tasks into their respective columns.
 * @param {import('./storage.js').Task[]} tasks
 */
export function renderBoard(tasks) {
  const zones = {
    'todo': document.querySelector('[data-dropzone="todo"]'),
    'in-progress': document.querySelector('[data-dropzone="in-progress"]'),
    'done': document.querySelector('[data-dropzone="done"]'),
  };
  Object.values(zones).forEach(zone => { if (zone) zone.innerHTML = ''; });

  for (const task of tasks) {
    const card = renderTaskCard(task);
    const zone = zones[task.status] || zones['todo'];
    zone.appendChild(card);
  }
}


