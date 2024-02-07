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
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../../redux/user/UserSlice.jsx";
import GoogleAuth from "../../components/GoogleAuth.jsx";

export default function Login() {
  //State Variables
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);

  // Hooks
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //Functions
  const handleInputChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
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
      dispatch(loginSuccess(data));
      toast({
        title: "Success",
        description: "Login Success",
        duration: 5000,
        status: "success",
        position: "top",
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(
        loginFailure(
          // error.response.data.message || error.message ||
          "Login Failed!"
        )
      );
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
            w={{ base: "80%", md: "50%" }}
            id="email"
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
          <Button
            colorScheme={"blue"}
            w={{ base: "80%", md: "50%" }}
            type="submit"
            isLoading={loading}
          >
            Login
          </Button>
          <GoogleAuth />
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
