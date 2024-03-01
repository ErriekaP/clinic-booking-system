"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/utilities/fetch/patient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Home = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error || !sessionData || !sessionData.session) {
          // Error or no session data, redirect to login page
          router.push("/login");
          return;
        }
        const userInfo = await fetchUserInfo(sessionData.session.user.id);
        console.log("user", userInfo);
        if (userInfo.role === "ADMIN") {
          router.push(`/admin/${userInfo.id}`);
        } else if (userInfo.patientType === "STUDENT") {
          router.push(`/patient/student/${userInfo.id}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push("/login");
      }
    };

    getUserInfo();
  }, [router]);
};

export default Home;
