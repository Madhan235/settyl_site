import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useHandleFollowUnfollow from "../hooks/useHandleFollowUnfollow";

//
export default function SuggestedUser({ user }) {
  const { handleFollowUnfollow, updating, following } =
    useHandleFollowUnfollow(user);

  return (
    <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
      {/* left side  */}

      <Flex gap={2} as={Link} to={`${user.username}`}>
        <Avatar src={user.profilePic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Text color={"gray.light"} fontSize={"sm"}>
            {user.name}
          </Text>
        </Box>
      </Flex>

      {/* right side  */}

      <Button
        size={"sm"}
        color={following ? "black" : "white"}
        bg={following ? "white" : "blue.400"}
        isLoading={updating}
        _hover={{
          cover: following ? "black" : "white",
          opacity: ".8",
        }}
        onClick={handleFollowUnfollow}
      >
        {following ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
}
