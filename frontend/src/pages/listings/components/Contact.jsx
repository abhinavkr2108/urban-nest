import { Button, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const { currentUser } = useSelector((state) => state.user);
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLandlordDetails();
  }, []);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser.token);
    }
  }, []);

  const fetchLandlordDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${listing.userRef}`,
        {
          params: {
            token: currentUser.token,
          },
        }
      );
      console.log("User Contact Component: ");
      console.log(response.data);
      setLandlord(response.data);
    } catch (error) {
      console.error(error);
    }

    if (landlord == null) {
      return "Loading...";
    }
  };
  return (
    <div>
      <Text color={"gray.700"} mb={4}>
        Contact <span className="font-bold">{landlord?.username}</span> for the
        listing at <span className="font-bold">{listing.name}</span>
      </Text>
      <div className="flex flex-col gap-3">
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Link
          to={`mailto:${landlord?.email}?subject=Regarding ${listing.name}&body=${message}`}
        >
          <Button colorScheme="blue">Send Message</Button>
        </Link>
      </div>
    </div>
  );
}
