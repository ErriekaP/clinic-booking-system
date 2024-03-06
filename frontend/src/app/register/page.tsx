import { Flex, Text } from "@radix-ui/themes";
import RegisterForm from "@/components/register/RegisterForm";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-5xl text-white">Clinic Booking System</p>
      <RegisterForm />
    </div>
  );
}
