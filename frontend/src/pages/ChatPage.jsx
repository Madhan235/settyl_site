import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

export default function ChatPage() {
  // states

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [refreshConversation, setRefreshConversation] = useState(false);
  const [isMessageContainerOpen, setIsMessageContainerOpen] = useState(true);

  // recoil states

  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const currentUser = useRecoilValue(userAtom);

  // coustomhooks

  const showToast = useShowToast();
  const { socket, onlineUsers } = useSocket();

  //catching the newMessage event from socket server and adding it to the messages state and conversation state

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: { text: message.text, sender: message.sender },
            };
          }
          return conversation;
        });

        return updatedConversations;
      });
      setRefreshConversation(true);
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation._id, setConversations]);

  // catching the messagesSeen event with conversationId, and updating the converstaionsAtom form recoil

  useEffect(() => {
    socket?.on("messagesSeen", (conversationId) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: { ...conversation.lastMessage, seen: true },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  // Fetch conversations on component did mount

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");

        const data = await res.json();

        if (data.error) return showToast("Error", data.error, "error");

        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
        setRefreshConversation(false); // Reset the refresh state
      }
    };
    getConversations();
  }, [setConversations, showToast, refreshConversation]);

  // Handle user search

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();

      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }

      // if user is trying to message themselves

      if (searchedUser._id === currentUser._id) {
        showToast("Error", "You can't message yourself", "error");

        return;
      }

      //if currentUser is already in a conversation with the searched user

      let existingConversation = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id
      );

      if (existingConversation) {
        setSelectedConversation({
          _id: existingConversation._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        });

        return;
      }

      // Searching user in the site not in the conversations

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };

      // adding mocked conversation in the end of the conversations array

      setConversations((prevConvs) => [...prevConvs, mockConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={{ base: "98%", md: "80%", lg: "750px" }}
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{
            sm: "250px",
            md: "full",
          }}
          mx={"auto"}
        >
          {" "}
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversation
          </Text>
          {/* inputform */}
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder="Search user..."
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={handleConversationSearch}
                isLoading={searchingUser}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {/* converstation skeleton */}
          {loadingConversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation?._id}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
                setIsMessageContainerOpen={setIsMessageContainerOpen}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a converstation to start messaging</Text>
          </Flex>
        )}

        {selectedConversation?._id && isMessageContainerOpen && (
          <MessageContainer
            setIsMessageContainerOpen={setIsMessageContainerOpen}
          />
        )}
      </Flex>
    </Box>
  );
}
