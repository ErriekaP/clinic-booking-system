"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/appointments/schedule`);
  };

  return (
    <div>
      <h1>Your appointments here!</h1>
      <div className="flex mt-20 justify-end">
        <button
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleClick()}
        >
          Schedule Appointments
        </button>
      </div>
    </div>
  );
}
