import { Button } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";

//

export default function OAuth() {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const handleGoogleClick = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`/api/users/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
          username: result.user.displayName,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
      }

      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      loadingText="Submitting"
      size="lg"
      bg={"#DB4437"}
      color={"white"}
      _hover={{
        bg: "#C33C2C",
      }}
      isLoading={loading}
      onClick={handleGoogleClick}
    >
      Google
    </Button>
  );
}
