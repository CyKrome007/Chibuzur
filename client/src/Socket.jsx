import {io} from "socket.io-client";
import {serverBase} from "./constants/config.js";
import {createContext, useContext, useMemo} from "react";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {

    const socket = useMemo(
        () => io(serverBase, { withCredentials: true }),
        []
    );

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider, getSocket};