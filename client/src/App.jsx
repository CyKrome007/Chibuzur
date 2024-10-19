import {lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { _404 } from "./pages/_404.jsx";
import { LayoutLoader } from "./components/layout/Loaders.jsx";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement.jsx"));

const user = true;

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<LayoutLoader />}>
                    <Routes>
                        <Route element={<ProtectRoute user={user} />} >
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
            </BrowserRouter>
        </>
    )
}

export default App;
