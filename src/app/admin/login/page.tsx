import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-2xl text-espresso">Admin Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
