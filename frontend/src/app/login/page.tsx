import { Flex, Text } from "@radix-ui/themes";
import LoginForm from "@/components/login/LoginForm";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-5xl text-white">Clinic Booking System</p>
      <LoginForm />
    </div>
  );
}
