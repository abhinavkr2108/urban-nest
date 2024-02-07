import {
  Avatar,
  Button,
  Heading,
  Input,
  Progress,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import {
  updateUserStart,
  loginSuccess,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/user/UserSlice.jsx";
import { useDispatch } from "react-redux";

import axios from "axios";
import AlertToast from "../../components/AlertToast.jsx";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();
  const toast = useToast();

  //   const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [filePercentage, setFilePercentage] = useState();
  const [formData, setFormData] = useState({});
  //   const [error, setError] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.user.username);
      setEmail(currentUser.user.email);
      setAvatar(currentUser.user.avatar);
    }
  }, [currentUser]);

  const changeUserAvatar = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setFilePercentage(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setAvatar(downloadURL);
        });
      }
    );
    setFilePercentage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      newPassword: newPassword,
      cnewpassword: confirmPassword,
      avatar: avatar,
      token: currentUser.token,
    };
    setFormData(data);
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        `http://localhost:5000/api/user/update/${currentUser.user._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );
      const userData = await response.data;
      console.log(userData);
      dispatch(updateUserSuccess(userData));
      toast({
        title: "Success",
        description: "Profile updated successfully",
        duration: 5000,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      dispatch(
        updateUserFailure(
          error.response.data.message || error.message || "Something went wrong"
        )
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-3 items-center justify-center">
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        hidden
        onChange={(e) => changeUserAvatar(e.target.files[0])}
      />
      <Avatar
        size="2xl"
        src={avatar}
        referrerPolicy={"no-referrer"}
        onClick={() => fileRef.current.click()}
        cursor={"pointer"}
      />
      {filePercentage > 0 && filePercentage != 100 ? (
        <Progress
          hasStripe
          value={filePercentage}
          width={{ base: "80%", md: "50%" }}
        />
      ) : null}

      {/* <Progressbar /> */}

      <Heading size={"lg"} fontWeight={"bold"}>
        {currentUser?.user.username}
      </Heading>
      {error && <AlertToast title="Error" description={error} status="error" />}
      <Button variant={"ghost"} colorScheme="blue">
        {" "}
        View Listings
      </Button>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 items-center justify-center"
      >
        <Input
          id="username"
          placeholder="Name"
          value={username}
          bgColor={"white"}
          w={{ base: "80%", md: "50%" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="email"
          placeholder="Email"
          value={email}
          bgColor={"white"}
          w={{ base: "80%", md: "50%" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <Input
          id="password"
          placeholder="New Password"
          bgColor={"white"}
          w={{ base: "80%", md: "50%" }}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /> */}
        <Input
          id="newpassword"
          placeholder="New Password"
          bgColor={"white"}
          w={{ base: "80%", md: "50%" }}
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <Input
          id="cnewpassword"
          placeholder="Confirm New Password"
          bgColor={"white"}
          w={{ base: "80%", md: "50%" }}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <Button
          colorScheme={"blue"}
          w={{ base: "80%", md: "50%" }}
          type="submit"
          //   isLoading={loading}
        >
          Update Account
        </Button>
        <Button
          colorScheme={"red"}
          w={{ base: "80%", md: "50%" }}
          type="submit"
          //   isLoading={loading}
        >
          Delete Account
        </Button>
      </form>
    </div>
  );
}
