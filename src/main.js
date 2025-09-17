// Main app: ties modules together
import { loadTasks, saveTasks } from './modules/storage.js';
import { renderBoard } from './modules/render.js';
import { bindCreateTaskForm } from './modules/events.js';
import { setupDragAndDrop } from './modules/dnd.js';

/** @type {import('./modules/storage.js').Task[]} */
let tasks = [];

function addTask(task) {
  tasks.push(task);
  saveTasks(tasks);
  renderBoard(tasks);
}

function moveTask(taskId, newStatus) {
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  tasks[idx] = { ...tasks[idx], status: newStatus };
  saveTasks(tasks);
  renderBoard(tasks);
}

function init() {
  tasks = loadTasks();
  renderBoard(tasks);
  bindCreateTaskForm(addTask);
  setupDragAndDrop(moveTask);
}

document.addEventListener('DOMContentLoaded', init);


