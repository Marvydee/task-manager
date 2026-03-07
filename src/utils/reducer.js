function taskReducer(state, action) {
  switch (action.type) {
    // ADD: prepend a new task to the front of the list
    case "ADD":
      return [action.task, ...state];

    // TOGGLE: flip the done boolean on one task by id
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t,
      );

    // DELETE: remove one task by id
    case "DELETE":
      return state.filter((t) => t.id !== action.id);

    // REORDER: move a dragged task to a new position in the array
    case "REORDER": {
      const updated = [...state];
      // splice(from, 1) removes the item at 'from'
      // splice(to, 0, item) inserts it at 'to'
      const [moved] = updated.splice(action.from, 1);
      updated.splice(action.to, 0, moved);
      return updated;
    }

    // CLEAR_DONE: remove all completed tasks at once
    case "CLEAR_DONE":
      return state.filter((t) => !t.done);

    default:
      return state;
  }
}

export default taskReducer;
