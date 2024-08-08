import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
// import { useNavigate } from "react-router-dom";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";

export default function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useRecoilState(postsAtom);
  let maxChar = 500;
  const [remainingCharacter, setRemainingCharacter] = useState(maxChar);
  const user = useRecoilValue(userAtom);
  const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();
  const imageRef = useRef(null);
  const showToast = useShowToast();
  const [posting, setPosting] = useState(false);
  const { username } = useParams();

  // const navigate = useNavigate();

  //   functions

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setPostText(inputText);
    setRemainingCharacter(maxChar - inputText.length);
  };

  const handleCreatePost = async () => {
    setPosting(true);
    try {
      const res = await fetch(`/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imageUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Posted Successfully", "success");

      if (username === user.username) {
        setPosts([data, ...posts]);
      }

      onClose();

      setPostText("");
      setImageUrl("");

      //   navigate(`/${user.username}/post/${data.newPost._id}`);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        <AddIcon />
      </Button>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here..."
                onChange={handleTextChange}
                value={postText}
                maxLength={500}
              />

              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.white"}
              >
                {remainingCharacter}/500
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imageUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageUrl} alt="selected img" />
                <CloseButton
                  onClick={() => setImageUrl("")}
                  bg={"gray.dark"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={posting}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
