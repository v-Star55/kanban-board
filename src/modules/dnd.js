// Drag & Drop module using HTML5 DnD API

/**
 * Wire drag events on task cards and dropzones.
 * @param {(taskId: string, newStatus: 'todo'|'in-progress'|'done') => void} onDropChange
 */
export function setupDragAndDrop(onDropChange) {
  const dropzones = Array.from(document.querySelectorAll('[data-dropzone]'));

  // Delegate dragstart on the board for dynamic cards
  document.addEventListener('dragstart', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains('card')) return;
    target.classList.add('ghost');
    const id = target.dataset.id;
    if (!id) return;
    e.dataTransfer?.setData('text/plain', id);
    e.dataTransfer?.setDragImage(target, 10, 10);
  });

  document.addEventListener('dragend', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement) target.classList.remove('ghost');
  });

  for (const zone of dropzones) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('is-over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('is-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('is-over');
      const id = e.dataTransfer?.getData('text/plain');
      const newStatus = zone.getAttribute('data-dropzone');
      if (!id || !newStatus) return;
      onDropChange(id, /** @type {'todo'|'in-progress'|'done'} */ (newStatus));
    });
  }
}


