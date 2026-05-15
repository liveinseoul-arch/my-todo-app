import { createClient } from "@/lib/supabase/server";
import { AddTodoForm } from "./add-todo-form";
import { TodoItem, type Todo } from "./todo-item";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select("id, title, is_complete, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">나의 할 일</h1>
        </header>

        <div className="space-y-6 rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <AddTodoForm />

          {todos && todos.length > 0 ? (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {(todos as Todo[]).map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-zinc-500">
              아직 할 일이 없습니다. 위에서 추가해보세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
