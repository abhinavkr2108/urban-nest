import {
  Button,
  Card,
  Container,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertToast from "../../components/AlertToast";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      setError("");
      toast({
        title: "Success",
        description: "Login Success",
        duration: 5000,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };
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
        {error && (
          <AlertToast title="Error" description={error} status="error" />
        )}
        <form
          className="w-full flex flex-col gap-3 items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            placeholder="Email"
            bgColor={"white"}
            w={"50%"}
            id="email"
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            id="password"
            placeholder="Password"
            bgColor={"white"}
            w={"50%"}
            type="password"
            onChange={(e) => handleInputChange(e)}
          />
          <Button colorScheme={"blue"} w={"50%"} type="submit">
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
