import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <header className="w-full h-14 bg-slate-400 z-20 shadow-md sticky top-0">
      <Container maxW={"8xl"} m={"auto"} className={"h-full"}>
        <Flex
          alignItems={"center"}
          h={"full"}
          display={{ base: "none", md: "flex" }}
        >
          <Image
            src="/applogo.png"
            alt="logo"
            className="h-[100px] w-[100px]"
          />
          <Spacer />
          <Box>
            <InputGroup>
              <InputLeftElement>
                <IoMdSearch />
              </InputLeftElement>
              <Input placeholder="Search" backgroundColor={"gray.50"} />
            </InputGroup>
          </Box>
          <Spacer />
          <HStack spacing={3}>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/signup"}>Signup</Link>
          </HStack>
        </Flex>
        <Flex
          display={{ base: "flex", md: "none" }}
          alignItems={"center"}
          h={"full"}
        >
          <Image
            src="/applogo.png"
            alt="logo"
            className="h-[100px] w-[100px]"
          />
          <Spacer />
          <Box>
            <IconButton
              aria-label="hamburger"
              ref={btnRef}
              onClick={onOpen}
              variant={"unstyled"}
              size={"lg"}
              icon={<GiHamburgerMenu />}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <HStack spacing={2}>
                    <Image
                      src="/applogo.png"
                      alt="logo"
                      className="h-[100px] w-[100px]"
                    />
                    <Heading size={"md"}>Urban-Nest</Heading>
                  </HStack>
                </DrawerHeader>
                <DrawerBody>
                  <InputGroup>
                    <InputLeftElement>
                      <IoMdSearch />
                    </InputLeftElement>
                    <Input placeholder="Search" backgroundColor={"gray.50"} />
                  </InputGroup>
                  <List
                    mt={5}
                    spacing={3}
                    onClick={onClose}
                    cursor={"pointer"}
                    w="full"
                  >
                    <ListItem _hover={{ bgColor: "gray.100" }} w={"full"}>
                      <Link to={"/"}>Home</Link>
                    </ListItem>
                    <ListItem _hover={{ bgColor: "gray.100" }}>
                      <Link to={"/about"}>About</Link>
                    </ListItem>
                    <ListItem _hover={{ bgColor: "gray.100" }}>
                      <Link to={"/signup"}>Signup</Link>
                    </ListItem>
                    <ListItem _hover={{ bgColor: "gray.100" }}>
                      <Link to={"/login"}>Login</Link>
                    </ListItem>
                  </List>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Flex>
      </Container>
    </header>
  );
}
