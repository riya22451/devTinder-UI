import { io } from "socket.io-client";

export const createSocketConnection = io(
  "https://dev-tinder-backend-taupe.vercel.app",
  {
    withCredentials: true,
    transports: ["polling"] // needed because backend is on Vercel
  }
);
