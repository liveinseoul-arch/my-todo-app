"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/todos");
      router.refresh();
    } else {
      setMessage("확인 이메일을 보냈습니다. 이메일에서 링크를 클릭해 인증을 완료하세요.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">회원가입</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            새 계정을 만들어 할 일을 관리하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호 (6자 이상)
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          {message && (
            <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "처리 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-medium underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
