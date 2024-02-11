import {
  Button,
  Card,
  Container,
  HStack,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { GiTempleDoor } from "react-icons/gi";
import SimpleImageSlider from "react-simple-image-slider";
import Contact from "./components/Contact";

export default function SingleListing() {
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState();
  const [contact, setContact] = useState(false);
  const params = useParams();
  const listingId = params.id;
  console.log(listingId);

  useEffect(() => {
    fetchListing();
  }, []);

  useEffect(() => {
    if (listing) {
      console.log(listing);
    }
  }, [listing]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/listings/get-listing/${listingId}`
      );
      console.log(response.data);
      setListing(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {!listing ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <SimpleImageSlider
            images={listing.imageUrls}
            showBullets={true}
            width={"100%"}
            height={"500px"}
            autoPlay={true}
          />
          <Container maxW={"5xl"} m={"auto"}>
            <div className="p-5">
              <h1 className="text-3xl font-bold">{listing.name}</h1>
              <p className="text-xl font-bold">${listing.price}</p>
              <HStack pt={4}>
                <IoLocationSharp color="green" />
                <p className="font-bold text-gray-500">{listing.address}</p>
              </HStack>
              <Card
                bgColor={"green.500"}
                w={"fit-content"}
                px={10}
                py={2}
                mt={2}
              >
                <p className="text-white font-bold">For {listing.type}</p>
              </Card>
              <p className="mt-4">
                <span className="font-bold">Description: </span>
                {listing.description}
              </p>
              <HStack mt={5} className="font-bold">
                <MdMeetingRoom color="brown" /> <p>{listing.bedrooms} Rooms</p>
                <FaParking color="blue" />{" "}
                <p>
                  {listing.parking == true ? "Yes" : "No"} Parking Availaible
                </p>
                <GiTempleDoor />
                <p>
                  {listing.furnished == true ? "Furnished" : "Not Furnished"}
                </p>
              </HStack>
            </div>
            {currentUser &&
              contact == false &&
              currentUser.user._id !== listing.userRef && (
                <Button
                  bgColor={"slategrey"}
                  color={"white"}
                  mt={5}
                  w={"100%"}
                  _hover={{ bgColor: "gray", color: "white" }}
                  onClick={() => setContact(true)}
                >
                  Contact Landlord
                </Button>
              )}
            {contact && <Contact listing={listing} />}
          </Container>
        </>
      )}
    </div>
  );
}
