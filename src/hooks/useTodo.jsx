import { useCallback, useReducer, useRef } from "react";
import { addTask, removeSelectedTask, removeTask, todoReducer, toggleSelectedTask } from "./todo.reducer";

export default function useTodo() {
  const autoId = useRef(0);
  const [state, dispatch] = useReducer(todoReducer, {
    selectedCount: 0,
    tasks: [],
  });

  const addTaskFunc = useCallback(
    (title, description) => dispatch(addTask({ title, description, selected: false, id: ++autoId.current })),
    []
  );

  return {
    addTask: addTaskFunc,
    removeTask: useCallback((i) => dispatch(removeTask(i)), []),
    task: state.tasks,
    selectedCount: state.selectedCount,
    removeSelectedTask: useCallback(() => dispatch(removeSelectedTask()), []),
    toggleSelectedTask: useCallback((i) => dispatch(toggleSelectedTask(i)), []),
  };
}
