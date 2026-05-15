import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AddTodoForm } from "./add-todo-form";
import { TodoItem, type Todo } from "./todo-item";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: todos } = await supabase
    .from("todos")
    .select("id, title, is_complete, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">할 일</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              로그아웃
            </button>
          </form>
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
