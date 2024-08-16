import {
  Box,
  Text,
  Link,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.300", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={bgColor} color={textColor} py={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="space-between"
        align="center"
      >
        <Text>© {new Date().getFullYear()} Threads. All rights reserved.</Text>

        <Stack direction="row" spacing={6}>
          <Link href="https://twitter.com" isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              colorScheme="twitter"
              variant="ghost"
            />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              colorScheme="red"
              variant="ghost"
            />
          </Link>
          <Link href="https://github.com" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              colorScheme={colorMode === "light" ? "gray" : "orange"}
              variant="ghost"
            />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
