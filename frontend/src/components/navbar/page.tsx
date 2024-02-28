"use client";
import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import "../../components/styles.css";
import * as Avatar from "@radix-ui/react-avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const ToolbarDemo = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <div style={{ display: "flex", gap: 20 }}>
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
        </div>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Button className="ToolbarButton" onClick={handleLogout}>
        Logout
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default ToolbarDemo;
