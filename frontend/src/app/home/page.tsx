"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/utilities/fetch/patient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@radix-ui/themes";

const Home = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo("supabaseUserId");
        switch (userInfo.patientType) {
          case "ADMIN":
            router.push(`/admin/${userInfo.id}`);
            break;
          case "STUDENT":
            router.push(`/patient/stident/${userInfo.id}`);
            break;
          default:
            router.push("/");
            break;
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push("/login");
      }
    };

    getUserInfo();
  }, [router]);

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Home;
