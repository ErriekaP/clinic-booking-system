import LoginForm from "@/components/login/LoginForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex">
        <p className="text-5xl text-white text-center">Clinic Booking System</p>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
