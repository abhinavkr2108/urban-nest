import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
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
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                placeholder="Search"
                backgroundColor={"gray.50"}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <InputRightElement>
                <button type="submit">
                  <IoMdSearch />
                </button>
              </InputRightElement>
            </InputGroup>
          </form>
          <Spacer />
          <HStack spacing={3}>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>

            {currentUser ? (
              <>
                <Link to={"/create-listing"}>Create Listing</Link>
                <Popover>
                  <PopoverTrigger>
                    <Avatar
                      src={currentUser?.avatar}
                      size={"sm"}
                      cursor={"pointer"}
                      referrerPolicy={"no-referrer"}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                      Welcome <br />
                      <Text fontWeight={"bold"}>{currentUser.username}</Text>
                    </PopoverHeader>
                    <PopoverBody>
                      <List className="w-full" onClick={onClose}>
                        <ListItem className="">
                          <Link
                            to={"/profile"}
                            onClick={onClose}
                            className="w-full block hover:bg-gray-100"
                          >
                            View Profile
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to={"/signout"}
                            className="text-red-500 w-full block font-semibold hover:bg-gray-100"
                          >
                            Logout
                          </Link>
                        </ListItem>
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Link to={"/signup"}>Signup</Link>
            )}
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
                  <form onSubmit={handleSubmit}>
                    <InputGroup>
                      <Input
                        placeholder="Search"
                        backgroundColor={"gray.50"}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                      />
                      <InputRightElement>
                        <button type="submit">
                          <IoMdSearch />
                        </button>
                      </InputRightElement>
                    </InputGroup>
                  </form>
                  <List
                    mt={5}
                    spacing={3}
                    onClick={onClose}
                    cursor={"pointer"}
                    w="full"
                  >
                    <ListItem>
                      <Link to={"/"} className="w-full block hover:bg-gray-100">
                        Home
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        to={"/about"}
                        className="w-full block hover:bg-gray-100"
                      >
                        About
                      </Link>
                    </ListItem>

                    {!currentUser ? (
                      <>
                        <ListItem>
                          <Link
                            to={"/signup"}
                            className="w-full block hover:bg-gray-100"
                          >
                            Signup
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to={"/login"}
                            className="w-full block hover:bg-gray-100"
                          >
                            Login
                          </Link>
                        </ListItem>
                      </>
                    ) : (
                      <ListItem>
                        <Link
                          to={"/create-listing"}
                          className="w-full block hover:bg-gray-100"
                        >
                          Create Listing
                        </Link>
                      </ListItem>
                    )}
                  </List>
                </DrawerBody>
                <DrawerFooter>
                  {currentUser ? (
                    <Box onClick={onClose}>
                      <Link to={"/signout"}>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          mr={3}
                          onClick={onClose}
                        >
                          Logout
                        </Button>
                      </Link>
                      <Link to={"/profile"}>
                        <Button colorScheme="blue">View Profile</Button>
                      </Link>
                    </Box>
                  ) : null}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
        </Flex>
      </Container>
    </header>
  );
}
