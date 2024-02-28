import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/utilities/fetch/patient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

export const UserContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const pathname: string = usePathname();
  const router = useRouter();
  const [userType, setUserType] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [isAllowed, setIsAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Retrieve the session from Supabase
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          throw new Error("Failed to fetch session");
        }
        console.log("sess", session);

        if (session && session.user) {
          const userInfo = await fetchUserInfo(session.user.id);
          console.log(userInfo);
          let newUserType;

          if (userInfo.role != null) {
            newUserType = userInfo.role;
          } else {
            newUserType = userInfo.patientType;
          }

          setUserType(newUserType);
          setUserId(userInfo.id);

          if (newUserType === "ADMIN") {
            if (
              !pathname.startsWith(`/admin`) ||
              pathname === `/admin/${userInfo.id}`
            ) {
              setIsAllowed(true);
            } else {
              setIsAllowed(false);
            }
          } else if (
            newUserType === "DOCTOR" &&
            pathname.startsWith(`/personnel/doctor/${userInfo.id}`)
          ) {
            setIsAllowed(true);
          } else if (
            newUserType === "NURSE" &&
            pathname.startsWith(`/personnel/nurse/${userInfo.id}`)
          ) {
            setIsAllowed(true);
          } else if (
            newUserType === "STAFF" &&
            pathname.startsWith(`/personnel/staff/${userInfo.id}`)
          ) {
            setIsAllowed(true);
          } else if (
            newUserType === "STUDENT" &&
            pathname.startsWith(`/patient/student/${userInfo.id}`)
          ) {
            setIsAllowed(true);
          } else if (
            newUserType === "EMPLOYEE" &&
            pathname.startsWith(`/patient/employee/${userInfo.id}`)
          ) {
            setIsAllowed(true);
          } else {
            setIsAllowed(false);
          }
        } else {
          throw new Error("Session or user not found");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [router, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //Return unauthorized page if not allowed
  if (!isAllowed) {
    router.push("/unauthorized");
  }

  return (
    <UserContext.Provider value={{ user: "" }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
