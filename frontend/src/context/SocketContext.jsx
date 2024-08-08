import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";

// intializing context

const SocketContext = createContext();

// exporting SocketContext as useSocket custom hook

export const useSocket = () => {
  return useContext(SocketContext);
};

// intializing contextProvider component and its children

export const SocketContextProvider = ({ children }) => {
  // useState
  const [socket, setSocket] = useState(null);

  // Recoil State

  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: {
        userId: user?._id,
      },
    });

    setSocket(socket);

    // cleaning up socket connection when the component unmounts

    return () => socket && socket.close();
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
