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

        if (session && session.user) {
          const userInfo = await fetchUserInfo(session.user.id);
          let newUserType;

          if (userInfo.role != null) {
            newUserType = userInfo.role;
          } else {
            newUserType = userInfo.patientType;
          }

          setUserType(newUserType);
          setUserId(userInfo.id);

          // Define routes and permissions
          const routesPermissions = {
            ADMIN: [
              `/admin/${userInfo.id}`,
              `/patients`,
              `/personnels`,
              `/register`,
              `/services`,
              `/schedules`,
            ],
            DOCTOR: [`/personnel/doctor/${userInfo.id}`],
            NURSE: [`/personnel/nurse/${userInfo.id}`],
            STAFF: [`/personnel/staff/${userInfo.id}`],
            STUDENT: [
              `/date`,
              `/patient/student/${userInfo.id}`,
              `/register/patient/student/${userInfo.id}`,
              `/appointments`,
              `/services`,
            ],
            EMPLOYEE: [`/patient/employee/${userInfo.id}`],
          };

          let allowed = false;
          const allowedRoutes = routesPermissions[newUserType];

          if (allowedRoutes) {
            allowed = allowedRoutes.some((route) => pathname.startsWith(route));
          }

          setIsAllowed(allowed);
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

  // Return unauthorized page if not allowed
  if (!isAllowed) {
    router.push("/unauthorized");
    return null;
  }

  return (
    <UserContext.Provider value={{ user: "" }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
