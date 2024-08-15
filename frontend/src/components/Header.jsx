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
import { AiFillHome, AiOutlineSetting } from "react-icons/ai";
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
  const setAuthScreen = useSetRecoilState(authScreenAtom); // Corrected typo
  const [showFriends, setShowFriends] = useState(false);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")} // Corrected typo
        >
          Login
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
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
              cursor={"pointer"}
              onClick={() => setShowFriends(true)}
            />
          </Box>
          {showFriends && (
            <Flex
              position="absolute"
              top="100%"
              left={0}
              flexDirection="column"
              transform={"translateX(-50%)"}
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
              zIndex={1000}
              p={4}
              w={{ base: "50%", sm: "230px" }}
              display={{ base: "block", md: "none" }}
              borderRadius={"5%"}
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
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <AiOutlineSetting size={20} />
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
          onClick={() => setAuthScreen("signup")} // Corrected typo
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
}
