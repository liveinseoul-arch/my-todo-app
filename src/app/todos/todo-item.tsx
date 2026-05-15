"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "./actions";

export type Todo = {
  id: string;
  title: string;
  is_complete: boolean;
  created_at: string;
};

export function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={todo.is_complete}
        disabled={isPending}
        onChange={(e) =>
          startTransition(() => toggleTodo(todo.id, e.target.checked))
        }
        className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
      />
      <span
        className={`flex-1 text-sm ${
          todo.is_complete
            ? "line-through text-zinc-400 dark:text-zinc-500"
            : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        className="text-xs text-zinc-500 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50"
      >
        삭제
      </button>
    </li>
  );
}
