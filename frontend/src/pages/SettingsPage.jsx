import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogOut from "../hooks/useLogOut";

export default function SettingsPage() {
  const showToast = useShowToast();
  const logout = useLogOut();
  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account")) return;

    try {
      const res = await fetch(`/api/users/freeze`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Success", "Your Account has frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      {" "}
      <Text my={1} fontWeight={"bold"}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by loggin in.</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
        Freeze
      </Button>
    </>
  );
}
