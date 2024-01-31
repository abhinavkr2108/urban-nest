import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../redux/user/UserSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const { loading, error } = useSelector((state) => state.user);

  // Hooks
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    dispatch(loginStart());
    try {
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const userData = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //   dispatch(loginSuccess(response.data));
      console.log("API RESPONSE:");
      console.log(response);
      const data = await response.data;
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
      console.error(error);
      dispatch(loginFailure("Could Not Sign In with Google"));
    }
  };
  return (
    <>
      <Button
        leftIcon={<FcGoogle />}
        w={{ base: "80%", md: "50%" }}
        colorScheme="gray"
        type="button"
        onClick={() => {
          handleGoogleAuth();
        }}
        isLoading={loading}
      >
        Continue with Google
      </Button>
    </>
  );
}
