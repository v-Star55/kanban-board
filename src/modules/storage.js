// Storage module: wraps localStorage with namespacing and JSON handling

const STORAGE_KEY = 'kanban.tasks.v1';

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {"todo"|"in-progress"|"done"} status
 */

/**
 * Load all tasks from localStorage.
 * @returns {Task[]}
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Persist tasks to localStorage.
 * @param {Task[]} tasks
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    // ignore quota errors for this simple app
    console.error('Failed to save tasks', err);
  }
}


