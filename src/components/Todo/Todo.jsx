import { useCallback, useRef } from "react";
import useTodo from "../../hooks/useTodo";
import { cn } from "../../utils/cn";
import TodoList from "./TodoList";

export default function Todo({ displayName, description, className, ...props }) {
  const { task, addTask, removeTask, removeSelectedTask, toggleSelectedTask, selectedCount } = useTodo();
  const input = useRef(null);
  const textarea = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const title = formData.get("title")?.trim();
      if (title?.length === 0) return;
      const description = formData.get("description")?.trim();
      addTask(title, description);
      input.current.value = "";
      input.current.focus();
      textarea.current.value = "";
    },
    [addTask]
  );

  return (
    <div {...props} className={cn("bg-white rounded-md shadow-lg p-8 border border-zinc-300 w-[480px]", className)}>
      <h1 className="mb-3 text-3xl font-extrabold text-zinc-700">{displayName}</h1>
      <p className="mb-4 font-medium text-zinc-600">{description}</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          ref={input}
          className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 focus:border-blue-500 focus:outline-none"
          name="title"
          type="text"
          placeholder="Add a task"
        />
        <textarea
          ref={textarea}
          name="description"
          placeholder="Add a description"
          className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white outline-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:bg-blue-600/90"
        >
          Add to list
        </button>
      </form>
      <h2 className="mt-4 text-base font-medium text-zinc-600">
        {task.length} task{task.length > 1 ? "s" : ""}
      </h2>
      {selectedCount > 0 && (
        <button className="mt-2 rounded-md bg-red-600 px-4 py-2 text-white" onClick={removeSelectedTask}>
          Remove selected ({selectedCount})
        </button>
      )}
      <TodoList task={task} removeTask={removeTask} toggleSelectedTask={toggleSelectedTask} />
    </div>
  );
}
