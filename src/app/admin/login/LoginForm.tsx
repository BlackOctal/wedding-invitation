"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <input
        type="password"
        name="password"
        required
        placeholder="Admin password"
        autoFocus
        className="rounded border border-divider px-4 py-3 text-sm text-espresso outline-none"
      />
      {state.error && <div className="text-sm text-red-700">{state.error}</div>}
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-sm border-none bg-gold py-3 text-sm tracking-[0.08em] text-espresso uppercase disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
