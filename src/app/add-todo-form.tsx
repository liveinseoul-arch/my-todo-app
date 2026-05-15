"use client";

import { useRef, useTransition } from "react";
import { addTodo } from "./actions";

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(formData) =>
        startTransition(async () => {
          await addTodo(formData);
          formRef.current?.reset();
        })
      }
      className="flex gap-2"
    >
      <input
        name="title"
        type="text"
        required
        placeholder="새 할 일 추가"
        disabled={isPending}
        className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        추가
      </button>
    </form>
  );
}
