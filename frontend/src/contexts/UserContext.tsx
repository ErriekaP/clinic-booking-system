import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/utilities/fetch/patient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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
              `/appointments`,
              `/admin/appointments/${userInfo.id}`,
              `/admin/appointments/requests`,
              `/admin/appointments`,
              `/queues`,
              `/afterAppointments/student`,
              `/home`,
              `/emergency`,
            ],
            DOCTOR: [
              `/personnel/doctor/${userInfo.id}`,
              `/personnel/doctor/appointments/${userInfo.id}`,
              `/appointments/schedule/date/${userInfo.id}`,
              `/personnel/doctor/appointments/${userInfo.id}`,
              `/appointments/schedule`,
              `/personnel/doctor/appointments/confirmation`,
              `/personnel/doctor/appointment`,
              `/personnel/doctor/appointment/note/`,
              `/personnel/doctor/remove/${userInfo.id}`,
              `/personnel/doctor/queues/${userInfo.id}`,
              `/services`,
              `/home`,
              `/personnel/doctor/queues/afterqueues/`,
            ],
            NURSE: [
              `/personnel/nurse/${userInfo.id}`,
              `/patients`,
              `/appointments`,
              `/personnel/nurse/queues`,
              `/services`,
              `/home`,
              `/admin/appointments/patient`,
              `/afterAppointments/student`,
              `/emergency`,
              `/personnel/nurse/appointments`,
            ],
            STAFF: [
              `/personnel/staff/${userInfo.id}`,
              `/queues`,
              `/services`,
              `/home`,
            ],
            STUDENT: [
              `/date`,
              `/patient/student/${userInfo.id}`,
              `/register/patient/student/${userInfo.id}`,
              `/appointments`,
              `/services`,
              `/patient/student/appointments/${userInfo.id}`,
              `/patient/student/appointments/cancel`,
              `/queue/services`,
              `/queue/confirmation`,
              `/queue`,
              `/unauthorized`,
              `/afterAppointments/student`,
              `/home`,
            ],
            EMPLOYEE: [
              `/patient/employee/${userInfo.id}`,
              `/home`,
              `/register/patient/employees/${userInfo.id}`,
              `/patient/employee/appointments/${userInfo.id}`,
              `/patient/employee/appointments/cancel`,
              `/queue/services`,
              `/queue/confirmation`,
              `/queue`,
              `/unauthorized`,
              `/appointments`,
              `/services`,
              `/afterAppointments/employee`,
            ],
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
        //setLoading(false);
      }
    };

    getUserInfo();
  }, [router, supabase]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAllowed) {
      router.push("/unauthorized");
    }
  }, [loading, isAllowed, router]);

  useEffect(() => {
    // Simulate data loading or any asynchronous operation
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (simulated data loading)
    }, 1000); // Simulate loading for 1 second

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl text-white mb-4 font-bold">Loading...</p>
        <Loading />;
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div>
        <div className="flex flex-row bg-zinc-800/50 border-2-zinc-800/50 p-4 rounded-md items-center">
          <div className="text-white mr-2 ">
            <InfoCircledIcon />
          </div>
          <div className="text-white ">
            <p>You are not Authorized to access this page.</p>
          </div>
        </div>

        {/* <p>Hold Up</p>
    <p>Error 401: Unauthorized</p> */}
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userType, userId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
