import { Button } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

export default function OAuth() {
  const showToast = useShowToast();
  const handleGoogleClick = async () => {
    try {
      ("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Button
        loadingText="Submitting"
        size="lg"
        bg={"#DB4437"}
        color={"white"}
        _hover={{
          bg: "#C33C2C",
        }}
        onClick={handleGoogleClick}
      >
        Google
      </Button>
    </>
  );
}
