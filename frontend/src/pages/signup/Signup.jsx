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
import axios, { isCancel, AxiosError } from "axios";
import AlertToast from "../../components/AlertToast";
import GoogleAuth from "../../components/GoogleAuth";

export default function Signup() {
  //state variables
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //Functions
  const handleInputChange = (e) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
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
        description: "Account created successfully",
        duration: 5000,
        status: "success",
        position: "top",
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong"
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
        <Heading className="text-slate-700 font-bold">Signup</Heading>
        <Text className="text-slate-500 text-[18px] font-bold text-center">
          Create a new account to browse and post listings
        </Text>
        {error && (
          <AlertToast title="Error" description={error} status="error" />
        )}
        {/* {error && <Toast title="Error" description={error} status="error" />} */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full flex flex-col gap-3 items-center justify-center"
        >
          <Input
            id="username"
            placeholder="Name"
            bgColor={"white"}
            w={{ base: "80%", md: "50%" }}
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            id="email"
            placeholder="Email"
            bgColor={"white"}
            w={{ base: "80%", md: "50%" }}
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            id="password"
            placeholder="Password"
            bgColor={"white"}
            w={{ base: "80%", md: "50%" }}
            type="password"
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            id="cpassword"
            placeholder="Confirm Password"
            bgColor={"white"}
            w={{ base: "80%", md: "50%" }}
            type="password"
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            colorScheme={"blue"}
            w={{ base: "80%", md: "50%" }}
            type="submit"
            isLoading={loading}
          >
            Create New Account
          </Button>
          <GoogleAuth />
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
