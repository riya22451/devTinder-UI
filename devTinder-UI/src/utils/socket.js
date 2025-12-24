import io  from "socket.io-client";

export const createSocketConnection = io(
  "https://dev-tinder-backend-taupe.vercel.app",
 
);
