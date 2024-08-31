import { cn } from "../../utils/cn";
import Task from "./Task";

export default function TodoList({ task, removeTask, toggleSelectedTask, className, ...props }) {
  return (
    <div className={cn(className, { "mt-4 flex flex-col gap-2": task.length > 0 })} {...props}>
      {task.map((item) => (
        <Task key={item.id} task={item} toggleSelected={() => toggleSelectedTask(item.id)} removeTask={removeTask} />
      ))}
    </div>
  );
}
