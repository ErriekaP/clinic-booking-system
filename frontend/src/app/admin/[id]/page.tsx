"use client";
import "./styles.css";
import NavMenu from "@/components/navigationmenu/page";
import { WebSocketContext } from "@/contexts/webSocketContext";

import { Card, Container, Flex, Inset, Strong, Text } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
interface Queue {
  id: number;
  queueID: number;
}
const AdminPage = () => {
  const [queueOngoingData, setQueueOngoingData] = useState<Queue[]>([]);
  //Websocket
  const socket = useContext(WebSocketContext);

  const getQueueData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/allOngoing`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch queue data");
      }
      const data = await response.json();
      setQueueOngoingData(data);
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected!");
      getQueueData();
    };

    // Check if the socket is already connected
    if (socket.connected) {
      // If already connected, manually call the connect handler
      handleConnect();
    } else {
      // If not connected, listen for the connect event
      socket.on("connect", handleConnect);
    }

    socket.on("justEmitting", (data) => {
      console.log("justEmitting event received!");
      console.log(data);
      setQueueOngoingData(data);
    });

    // Clean up event listeners
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect", handleConnect);
      socket.off("justEmitting");
    };
  }, [socket]);

  return (
    <div>
      <NavMenu />
      <div>
        {/* Display Queue Number */}

        <div className="flex items-center justify-center mt-20 text-white">
          <div className=" text-center ">
            <p className="text-lg font-bold">Current Queue Numbers:</p>
            {queueOngoingData.map((queue) => (
              <h1 className="text-9xl font-bold ml-2">{queue.queueID}</h1>
            ))}
          </div>
        </div>
      </div>
      {/* <Container>
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
      </Container> */}
    </div>
  );
};
export default AdminPage;
