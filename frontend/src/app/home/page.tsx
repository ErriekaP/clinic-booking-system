"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/router'
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
        } else if (userInfo.patientType === "EMPLOYEE") {
          router.push(`/patient/employee/${userInfo.id}`);
        } else if (userInfo.role === "DOCTOR") {
          router.push(`/personnel/doctor/${userInfo.id}`);
        } else if (userInfo.role === "NURSE") {
          router.push(`/personnel/nurse/${userInfo.id}`);
        } else if (userInfo.role === "STAFF") {
          router.push(`/personnel/staff/${userInfo.id}`);
          // } else if (
          //   !router.pathname.includes("/register") &&
          //   !router.pathname.includes("/register/patient/student")
          // ) {
          // If the user is already logged in and is not on the registration page, redirect them accordingly
          router.push("/home");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push("/login");
      }
    };

    getUserInfo();
  }, [router]);

  return null; // Since this component handles redirection, it doesn't render anything
};

export default Home;
