// hooks/useSocket.js
import { useEffect, useRef } from "react";
interface UseSocketProps {
    userId: string;
    onMessage: (message: any) => void;
}
export default function useSocket({ userId, onMessage }: UseSocketProps) {
    const socketRef = useRef<WebSocket | null>(null); //

    useEffect(() => {
        if (!userId) return;

        const socket = new WebSocket("ws://localhost:8386"); // Thay bằng WebSocket server của bạn

        socket.onopen = () => {
            console.log("✅ Connected to WebSocket");
            // Gửi userId để server biết ai đang connect
            socket.send(JSON.stringify({ type: "register", userId }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📩 Received:", data);

            if (onMessage) {
                onMessage(data);
            }
        };

        socket.onclose = () => {
            console.log("❌ WebSocket disconnected");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [userId]);

    return {
        sendMessage: (data:any) => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(data));
            }
        },
    };
}
