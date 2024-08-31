const TODO_ADD_TASK = "TODO/ADD_TASK";
const TODO_REMOVE_TASK = "TODO/REMOVE_TASK";
const TODO_REMOVE_SELECTED_TASK = "TODO/REMOVE_SELECTED_TASK";
const TODO_TOGGLE_SELECTED_TASK = "TODO/TOGGLE_SELECTED_TASK";

export const removeTask = (id) => ({ type: TODO_REMOVE_TASK, payload: id });
export const addTask = (task) => ({ type: TODO_ADD_TASK, payload: task });
export const removeSelectedTask = () => ({ type: TODO_REMOVE_SELECTED_TASK });
export const toggleSelectedTask = (id) => ({ type: TODO_TOGGLE_SELECTED_TASK, payload: id });

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case TODO_REMOVE_TASK:
      let selectedCount = state.selectedCount;
      const tasks = state.tasks.filter((task) => {
        const toRemove = task.id === action.payload;
        if (toRemove && task.selected) selectedCount--;
        return !toRemove;
      });
      return { ...state, tasks: tasks, selectedCount };

    case TODO_REMOVE_SELECTED_TASK:
      return {
        ...state,
        selectedCount: 0,
        tasks: state.tasks.filter((task) => !task.selected),
      };

    case TODO_TOGGLE_SELECTED_TASK:
      let selected = false;
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            selected = !task.selected;
            return { ...task, selected: selected };
          }
          return task;
        }),
        selectedCount: state.selectedCount + (selected ? 1 : -1),
      };

    default:
      return state;
  }
};
