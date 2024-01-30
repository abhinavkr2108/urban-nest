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

export default function Login() {
  return (
    <>
      <Container
        maxW={"5xl"}
        m={"auto"}
        className="h-screen flex flex-col items-center justify-center gap-3"
      >
        <Heading className="text-slate-700 font-bold">Login</Heading>
        <Text className="text-slate-500 text-[18px] font-bold">
          Login Into Your Existing Account
        </Text>
        <form className="w-full flex flex-col gap-3 items-center justify-center">
          <Input placeholder="Email" bgColor={"white"} w={"50%"} />
          <Input
            placeholder="Password"
            bgColor={"white"}
            w={"50%"}
            type="password"
          />
          <Button colorScheme={"blue"} w={"50%"}>
            Login
          </Button>
        </form>
        <Text className="text-slate-500 text-[18px] font-bold">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-500 cursor-pointer">Signup</span>
          </Link>
        </Text>
      </Container>
    </>
  );
}
