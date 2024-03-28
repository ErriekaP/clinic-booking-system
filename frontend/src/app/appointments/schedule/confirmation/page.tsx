"use client";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  return <h1>confirmed!</h1>;
};

export default Page;
