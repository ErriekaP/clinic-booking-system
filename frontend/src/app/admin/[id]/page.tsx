"use client";
import "./styles.css";
import Navbar from "@/app/navbar/page";
import NavigationMenuDemo from "@/app/navigationmenu/page";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";

import { Card, Container, Flex, Inset, Strong, Text } from "@radix-ui/themes";

export default function Page() {
  return (
    <main>
      <NavigationMenuDemo></NavigationMenuDemo>
      <Container>
        <Flex className="CardContainer">
          <Card className="Card">
            <a href="/">
              <Inset clip="padding-box" side="top" pb="current"></Inset>
              <Text as="p" align="center" className="Text">
                <Strong>Patients in Queue</Strong>
              </Text>
            </a>
          </Card>
          <Card className="Card">
            <a href="/">
              <Text as="p" align="center" className="Text">
                <Strong>Doctors on Duty</Strong>
              </Text>
            </a>
          </Card>
          <Card className="Card">
            <a href="/">
              <Text as="p" align="center" className="Text">
                <Strong>Appointments Today</Strong>
              </Text>
            </a>
          </Card>
        </Flex>
      </Container>
    </main>
  );
}
