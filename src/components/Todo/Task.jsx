export default function Task({ task, removeTask, toggleSelected }) {
  return (
    <div className="rounded-md border border-zinc-300 p-4">
      <h4 className="text-lg font-semibold text-zinc-800">{task.title}</h4>{" "}
      {task.description && <p className="text-zinc-600 font-normal mt-1 text-base">{task.description}</p>}
      <div className="flex items-center gap-2 mt-3">
        <input type="checkbox" checked={task.selected} onChange={toggleSelected} className="h-4 w-4" />
        <button onClick={() => removeTask(task.id)} className="bg-red-600 rounded-md px-3 py-0.5 text-white">
          Remove
        </button>
      </div>
    </div>
  );
}
