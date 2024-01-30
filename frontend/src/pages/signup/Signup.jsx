import {
  Button,
  Card,
  Container,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Container
        maxW={"5xl"}
        m={"auto"}
        className="h-screen flex flex-col items-center justify-center gap-3"
      >
        <Heading className="text-slate-700 font-bold">Signup</Heading>
        <Text className="text-slate-500 text-[18px] font-bold">
          Create a new account to browse and post listings
        </Text>
        <form className="w-full flex flex-col gap-3 items-center justify-center">
          <Input placeholder="Name" bgColor={"white"} w={"50%"} />
          <Input placeholder="Email" bgColor={"white"} w={"50%"} />
          <Input
            placeholder="Password"
            bgColor={"white"}
            w={"50%"}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            bgColor={"white"}
            w={"50%"}
            type="password"
          />
          <Button colorScheme={"blue"} w={"50%"}>
            Create New Account
          </Button>
        </form>
        <Text className="text-slate-500 text-[18px] font-bold">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </Text>
      </Container>
    </>
  );
}
