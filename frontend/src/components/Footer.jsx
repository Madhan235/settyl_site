import { Box, Container, Image, Link, Text, Stack } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="rgb(32, 32, 148)" color="white" py={8}>
      <Container maxW="container.xl" textAlign="center">
        {/* Logo Section */}
        <Box mb={4}>
          <Link href="#">
            <Image
              src="https://settyl.com/wp-content/uploads/2022/04/settyl.logo_.svg"
              alt="Settyl Logo"
              boxSize="80px" // Increase the size here
              mx="auto"
            />
          </Link>
        </Box>

        {/* Social Media Icons */}
        <Stack direction="row" spacing={6} mb={4} justify="center">
          <Link href="#" color="white" _hover={{ color: "gray.300" }}>
            <FaFacebookF size={24} />
          </Link>
          <Link href="#" color="white" _hover={{ color: "gray.300" }}>
            <FaTwitter size={24} />
          </Link>
          <Link href="#" color="white" _hover={{ color: "gray.300" }}>
            <FaInstagram size={24} />
          </Link>
          <Link href="#" color="white" _hover={{ color: "gray.300" }}>
            <FaLinkedinIn size={24} />
          </Link>
        </Stack>

        {/* Footer Links */}
        <Stack direction="row" spacing={2} mb={4} justify="center">
          <Link href="#" color="white" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link href="#" color="white" _hover={{ textDecoration: "underline" }}>
            About
          </Link>
          <Link href="#" color="white" _hover={{ textDecoration: "underline" }}>
            Services
          </Link>
          <Link href="#" color="white" _hover={{ textDecoration: "underline" }}>
            Contact
          </Link>
        </Stack>

        {/* Copyright Section */}
        <Text fontSize="sm" color="gray.300">
          © 2024 Settyl. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
