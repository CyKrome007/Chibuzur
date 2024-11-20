import {lazy, Suspense, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { _404 } from "./pages/_404.jsx";
import { LayoutLoader } from "./components/layout/Loaders.jsx";
import axios from "axios";
import {server} from "./constants/config.js";
import {useDispatch, useSelector} from "react-redux";
import {userExists, userNotExists} from "./redux/reducers/auth.js";
import {Toaster} from "react-hot-toast";
import {SocketProvider} from "./Socket.jsx";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement.jsx"));

const App = () => {

    const { user, loader } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${server}/user/profile`, {
            withCredentials: true
        })
            .then((res) => dispatch(userExists(res.data.data)))
            .catch(() => dispatch(userNotExists()));
    }, [dispatch]);

    return loader ? (
        <LayoutLoader />
    ) : (
        <>
            <BrowserRouter>
                <Suspense fallback={<LayoutLoader />}>
                    <Routes>
                        <Route element={
                            <SocketProvider>
                                <ProtectRoute user={user} />
                            </SocketProvider>
                        } >
                            <Route path="/" element={<Home />} />
                            <Route path="/chat/:chatId" element={<Chat />} />
                            <Route path="/groups" element={<Groups />} />
                        </Route>
                        <Route
                            path="/auth"
                            element={
                                <ProtectRoute user={!user} redirect={'/'} >
                                    <Login />
                                </ProtectRoute>
                            }
                        />

                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/users" element={<UserManagement />} />
                        <Route path="/admin/chats" element={<ChatManagement />} />
                        <Route path="/admin/messages" element={<MessageManagement />} />

                        <Route path={'*'} element={<_404 />} />
                    </Routes>
                </Suspense>
                <Toaster position="bottom-center" />
            </BrowserRouter>
        </>
    )
}

export default App;
