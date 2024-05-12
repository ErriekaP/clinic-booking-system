"use client";
import { UserProvider } from "@/contexts/UserContext";
import { WebSocketProvider, socket } from "@/contexts/webSocketContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <WebSocketProvider value={socket}>{children}</WebSocketProvider>
    </UserProvider>
  );
}
