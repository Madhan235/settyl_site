import {
  Avatar,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";

export default function Comment({
  reply,
  lastReply,
  currentPost,
  handleCommentDeletion,
  handleCommentEdit,
}) {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();

  const [isReplying, setIsReplying] = useState(false);
  const [updateReply, setUpdateReply] = useState(reply?.text);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const replyId = reply?._id;

  const handleCommentDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${currentPost._id}/${replyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      handleCommentDeletion(replyId);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleCommentEditServer = async () => {
    setIsReplying(true);
    try {
      const res = await fetch(`/api/posts/${currentPost._id}/${replyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateReply }),
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      handleCommentEdit(replyId, updateReply);
      onClose();
      showToast("Success", data.success, "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar
          src={reply?.userProfilePic}
          name={reply?.username}
          size={"sm"}
        />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply?.username}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            {/* Edited info  */}
            <Flex flexDirection={"column"}>
              <Text>{reply?.text}</Text>
              <Text opacity={0.6}>{reply?.isEdited && "Edited"}</Text>
            </Flex>
            {/* delete Icon  */}
            {currentUser?._id === reply?.userId && (
              <Flex>
                <Button
                  leftIcon={<EditIcon />}
                  variant="ghost"
                  onClick={onOpen}
                />
                <Button
                  leftIcon={<DeleteIcon />}
                  variant="ghost"
                  onClick={handleCommentDelete}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      {lastReply ? <Divider /> : ""}

      <Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  value={updateReply}
                  onChange={(e) => setUpdateReply(e.target.value)}
                  placeholder="Reply goes here..."
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                size={"sm"}
                onClick={handleCommentEditServer}
                isLoading={isReplying}
              >
                Reply
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
