import React from "react";
import { useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    signout();
  }, []);

  const signout = () => {
    try {
      dispatch(signOutUserStart());
      dispatch(signOutUserSuccess());
      navigate("/login");
    } catch (error) {
      console.error(error);
      dispatch(signOutUserFailure("Something went wrong"));
    }
  };
  return <div>Signout</div>;
}
