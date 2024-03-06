"use client";
import { Flex, Select, Tabs, Text } from "@radix-ui/themes";
import "../../components/styles.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formRegisterData, setFormRegisterData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      if (response.ok) {
        console.log("Login successfully");
        const user = await response.json();
        console.log(user.id);
        if (user.role === "ADMIN") {
          router.push(`/admin/${user.id}`);
        } else if (user.role === "DOCTOR") {
          router.push(`/doctor/${user.id}`);
        } else if (user.role === "NURSE") {
          router.push(`/nurse/${user.id}`);
        } else if (user.patientType === "STUDENT") {
          router.push(`/patient/student/${user.id}`);
        } else if (user.patientType === "EMPLOYEE") {
          router.push(`/patient/employee/${user.id}`);
        } else {
          router.push("/default");
        }
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Flex className="TabsContainer">
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <form onSubmit={handleSubmit}>
          <Tabs.Content className="TabsContent" value="tab1">
            <p className="Text">Login your account here!</p>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="email">
                Email
              </label>
              <input
                className="Input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="password">
                Password
              </label>
              <input
                className="Input"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button className="Button brown" type="submit">
                Login
              </button>
            </div>
          </Tabs.Content>
        </form>
      </Tabs.Root>
    </Flex>
  );
}
