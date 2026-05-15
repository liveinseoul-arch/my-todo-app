"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addTodo(formData: FormData) {
  const title = formData.get("title");
  if (typeof title !== "string" || !title.trim()) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("todos").insert({ title: title.trim(), user_id: user.id });
  revalidatePath("/todos");
}

export async function toggleTodo(id: string, isComplete: boolean) {
  const supabase = await createClient();
  await supabase.from("todos").update({ is_complete: isComplete }).eq("id", id);
  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();
  await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/todos");
}
