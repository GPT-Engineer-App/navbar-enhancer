import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, Image, Input, Link, Button, useDisclosure, Collapse, Stack, Text } from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { CgUser } from "react-icons/cg";

// Mock AuthService for demonstration
const AuthService = {
  isLoggedIn: () => true,
  getUser: () => ({ email: "user@example.com", roles: ["Creator"] }),
  logout: () => console.log("Logged out"),
};

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
  const [userEmail, setUserEmail] = useState("");
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setUserEmail(user.email);
      setUserRoles(user.roles);
    }
  }, []);

  const hasAdminRole = () => userRoles.includes("Creator");

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUserEmail("");
    setUserRoles([]);
    window.location.href = "/categories";
  };

  return (
    <Box bg="gray.800" color="white" w="100%" p={4} shadow="md" position="sticky" top={0} zIndex={20}>
      <Flex justify="space-between" align="center">
        <Link href="/" display="flex" alignItems="center">
          <Image src="/images/logo.png" alt="logo" boxSize="50px" objectFit="contain" />
        </Link>

        <IconButton icon={<FaBars />} variant="outline" colorScheme="whiteAlpha" onClick={onToggle} display={{ lg: "none" }} />

        <Flex display={{ base: "none", lg: "flex" }} align="center" flexGrow={1}>
          <Flex as="form" flexGrow={1} ml={10}>
            <Input placeholder="Search" variant="filled" />
            <IconButton aria-label="Search database" icon={<FaSearch />} type="submit" ml={2} />
          </Flex>
        </Flex>

        <Stack direction="row" spacing={4} align="center">
          <Link href="/categories">Categories</Link>
          {hasAdminRole() && <Link href="/admin/categories">Admin</Link>}
          {isLoggedIn ? (
            <Flex align="center">
              <Text mr={2}>{userEmail}</Text>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          ) : (
            <Link href="/login">
              <CgUser size="24px" />
            </Link>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack bg="gray.700" p={4} display={{ lg: "none" }}>
          <Link href="/categories">Categories</Link>
          {hasAdminRole() && <Link href="/admin/categories">Admin</Link>}
          {isLoggedIn ? (
            <Flex align="center">
              <Text mr={2}>{userEmail}</Text>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          ) : (
            <Link href="/login">
              <CgUser size="24px" />
            </Link>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default NavBar;
