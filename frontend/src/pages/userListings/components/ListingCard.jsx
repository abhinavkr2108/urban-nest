import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ listing }) {
  // useEffect(() => {
  //   window.location.reload();
  // }, [listing]);
  const { currentUser } = useSelector((state) => state.user);
  const toast = useToast();
  const navigate = useNavigate();
  const data = {
    token: currentUser.token,
  };
  const deleteListing = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_USER_URL}/delete-listing/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        }
      );
      console.log("Listing deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxW={"5xl"} m={"auto"}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mb={3}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={listing.imageUrls[0]}
          alt="Caffe Latte"
        />
        <Stack>
          <CardBody>
            <Heading size="md">{listing.name}</Heading>
            <Text py="2">{listing.description}</Text>
          </CardBody>
          <CardFooter>
            <HStack>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  navigate(`/listings/${listing._id}`);
                }}
              >
                View Listing
              </Button>
              <Button
                variant="solid"
                colorScheme="gray"
                onClick={() => {
                  navigate(`/update-listing/${listing._id}`);
                }}
              >
                Edit Listing
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  deleteListing(listing._id);
                }}
              >
                Delete Listing
              </Button>
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
}
