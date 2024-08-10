import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";

export default function Message({ ownMessage, message }) {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {/* check tick  */}

          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>{message.text}</Text>
            <Box
              alignSelf={"flex-end"}
              ml={1}
              color={message.seen ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
          </Flex>
          <Avatar src={user.profilePic} w={7} h={7} name={user.username} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />

          <Text
            maxW={"350px"}
            bg={"rgb(0, 68, 94,.4)"}
            p={1}
            borderRadius={"md"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
}
