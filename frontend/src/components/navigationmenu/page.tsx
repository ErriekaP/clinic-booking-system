import React, { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import "../../components/styles.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/utilities/fetch/patient";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  patientType: "STUDENT" | "EMPLOYEE";
  role: "ADMIN" | "DOCTOR" | "NURSE" | "STAFF";
  email: string;
}

const NavMenu = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userType, setUserType] = useState<string>();
  const [user, setUser] = useState<User | undefined>();

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
          // Fetch user info from your API using the user ID
          const userInfo = await fetchUserInfo(session.user.id);

          let newUserType;
          if (userInfo.role != null) {
            newUserType = userInfo.role;
          } else {
            newUserType = userInfo.patientType;
          }

          // Set user type and ID in state
          setUserType(newUserType);
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error or show error message to the user
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="CenteredContainer">
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item className="NavigationMenuItem">
            <Avatar.Root className="AvatarRoot">
              <Avatar.Image
                className="AvatarImage"
                src="https://www.addu.edu.ph/wp-content/uploads/2020/08/UniversitySeal480px.png"
                alt="Colm Tuite"
              />
              <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                CT
              </Avatar.Fallback>
            </Avatar.Root>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="/patients"
            >
              Patients
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Personnel <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <a href="/register/personnel" className="ListItemLink">
                  <p className="ListItemHeading">Add Personnel</p>
                </a>
                <a href="/personnels" className="ListItemLink">
                  <p className="ListItemHeading">View Personnel</p>
                </a>
                <a href="/schedules" className="ListItemLink">
                  <p className="ListItemHeading">Work Schedules</p>
                </a>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="/services/admin"
            >
              Services
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Appointment <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <a href="/appointments" className="ListItemLink">
                  <p className="ListItemHeading">View Appointments</p>
                </a>
                <a href="/appointments/requests" className="ListItemLink">
                  <p className="ListItemHeading">Appointment Requests</p>
                </a>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {/* <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="/queues/services"
            >
              Queue
            </NavigationMenu.Link>
          </NavigationMenu.Item> */}
          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Queues <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <a href="/queues/services" className="ListItemLink">
                  <p className="ListItemHeading">Queues</p>
                </a>
                <a href={`/queues/afterQueues`} className="ListItemLink">
                  <p className="ListItemHeading">All Queues</p>
                </a>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <Separator.Root
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: "0 15px" }}
            />
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <p>
              Hi, {user?.firstName} {user?.lastName}
            </p>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="NavigationMenuItem">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                  <PersonIcon />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="DropdownMenuContent"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Profile
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="DropdownMenuSeparator" />

                  <DropdownMenu.Item
                    className="DropdownMenuItem"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default NavMenu;
