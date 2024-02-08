"use client";
import { Button, Card, Container, Flex, Heading, Select, Tabs, Text, TextArea, TextField } from "@radix-ui/themes";
import './styles.css';

export default function Page(){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
           <Flex display="flex" direction="column" align="center" justify="center" >        
            <h1>Clinic Booking System</h1>
            <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Login
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Register
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                <p className="Text">Login your account here!</p>
                <fieldset className="Fieldset">
                <label className="Label" htmlFor="email">
                    Email
                </label>
                <input className="Input" id="email" />
                </fieldset>
                <fieldset className="Fieldset">
                <label className="Label" htmlFor="password">
                    Password
                </label>
                <input className="Input" id="password" type="password" />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button brown">Login</button>
                </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                <p className="Text">Register your account here!</p>
                <fieldset className="Fieldset">
                <label className="Label" htmlFor="email">
                    Email
                </label>
                <input className="Input" id="email" />
                </fieldset>
                <fieldset className="Fieldset">
                <label className="Label" htmlFor="password">
                    Password
                </label>
                <input className="Input" id="password" type="password" />
                </fieldset>

                <fieldset className="Fieldset">
                <label className="Label" htmlFor="role">
                    Role
                </label>
                <Select.Root defaultValue="student" >
                <Select.Trigger/>
                <Select.Content >
                    <Select.Group >
                    <Select.Label >Role</Select.Label>
                    <Select.Item className='SelectTrigger' value="student">Student</Select.Item>
                    <Select.Item className='SelectTrigger' value="teacher">Teacher</Select.Item>
                    <Select.Item className='SelectTrigger' value="staff">Staff</Select.Item>
                    </Select.Group>
                </Select.Content>
                </Select.Root>
                </fieldset>
                
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button brown">Register</button>
                </div>
            </Tabs.Content>
            </Tabs.Root>
            </Flex>
        </main>
    )
}