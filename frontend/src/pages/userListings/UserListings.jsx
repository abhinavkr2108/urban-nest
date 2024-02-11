import { Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "./components/ListingCard";
import AlertToast from "../../components/AlertToast";

export default function UserListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    viewListings();
  }, []);

  useEffect(() => {
    if (listings) {
      console.log("LISTINGS STATE VARIABLE: ");
      console.log(listings);
    }
  }, [listings]);

  const viewListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_USER_URL}/listings/${
          currentUser.user._id
        }`
      );
      console.log("Listings: ");
      console.log(response.data);
      setListings(response.data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-5">
      {loading && (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      )}
      <Heading size={"lg"} textAlign={"center"}>
        Your Listings
      </Heading>
      <br />
      {error && (
        <AlertToast title={"Error"} status={"error"} description={error} />
      )}
      {listings.map((listing) => {
        return (
          <div key={listing._id}>
            <ListingCard listing={listing} />
          </div>
        );
      })}
    </div>
  );
}
