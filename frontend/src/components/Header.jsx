import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { HiMiniBellSnooze } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogOut from "../hooks/useLogOut";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { useState } from "react";
import SuggestedUsers from "./SuggestedUsers";
import { CloseIcon } from "@chakra-ui/icons";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogOut();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [showFriends, setShowFriends] = useState(false);

  return (
    <Flex
      justifyContent={"space-between"}
      mt={1}
      mb={8}
      p={3}
      bg="rgb(32, 32, 148)"
    >
      <Image
        cursor={"pointer"}
        alt="logo"
        src="https://settyl.com/wp-content/uploads/2022/04/settyl.logo_.svg"
        className="flex justify-center items-center"
      />
      {user && (
        <Box display="flex" justifyContent="center">
          <Link as={RouterLink} to="/">
            <AiFillHome size={24} color="white" style={{ marginTop: "7px" }} />
          </Link>
        </Box>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          color={"white"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}
      {user && (
        <Flex alignItems={"center"} gap={4} position="relative">
          {" "}
          {/* Added relative position */}
          <Link as={RouterLink} to={`/${user.username}`}>
            <Avatar src={user.profilePic} h={6} w={6} name={user.username} />
          </Link>
          <Box display={{ base: "block", md: "none" }}>
            <FaUserFriends
              size={24}
              color="white"
              cursor={"pointer"}
              onClick={() => setShowFriends(true)}
            />
          </Box>
          {showFriends && (
            <Flex
              position="absolute"
              top="100%"
              left={"20%"}
              transform="translateX(-50%)"
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
              zIndex={1000}
              p={4}
              minW={{ base: "90%", sm: "230px" }} // Adjust the width based on screen size
              maxW="400px" // Set a maximum width to prevent it from growing too large
              borderRadius="lg" // Smoother border radius for better visuals
              display="block"
            >
              <Flex justify="flex-end">
                <IconButton
                  icon={<CloseIcon />}
                  onClick={() => setShowFriends(false)}
                  variant="ghost"
                  colorScheme={colorMode === "dark" ? "white" : "blue"}
                  aria-label="Close"
                />
              </Flex>

              <SuggestedUsers />
            </Flex>
          )}
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} color="white" />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <HiMiniBellSnooze size={20} color="white" />
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
          color={"white"}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
}
