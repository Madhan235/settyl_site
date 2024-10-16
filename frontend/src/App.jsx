import { Box, Container, Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import Footer from "./components/Footer";

function App() {
  const user = useRecoilValue(userAtom);

  const { pathname } = useLocation();
  return (
    <Flex direction="column" minH="100vh">
      <Box flex="1">
        <Container
          maxW={
            pathname === "/"
              ? { base: "600px", sm: "1000px", md: "1200px" }
              : "1000px"
          }
        >
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <HomePage />
                    <CreatePost />
                  </>
                ) : (
                  <Navigate to={"/auth"} />
                )
              }
            />
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/update/:id"
              element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/:username"
              element={
                user ? (
                  <>
                    <UserPage />
                    <CreatePost />
                  </>
                ) : (
                  <UserPage />
                )
              }
            />
            <Route path="/:username/post/:pid" element={<PostPage />} />
            <Route
              path="/chat"
              element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/settings"
              element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
            />
          </Routes>
          {pathname !== "/chat" && <Footer />}
        </Container>
      </Box>
    </Flex>
  );
}

export default App;
