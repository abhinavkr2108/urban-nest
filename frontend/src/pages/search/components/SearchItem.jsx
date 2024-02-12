import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import { FaSquareParking } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function SearchItem({ result }) {
  const navigate = useNavigate();
  return (
    <Card
      className="overflow-hidden cursor-pointer"
      onClick={() => {
        navigate(`/listings/${result._id}`);
      }}
    >
      <Image
        src={result.imageUrls[0]}
        alt={result.name}
        objectFit="cover"
        height={{ base: 250, md: 200 }}
        width={"full"}
      />
      <CardHeader>
        <Heading fontSize={{ base: "2xl", md: "lg" }} noOfLines={1}>
          {result.name}
        </Heading>
        <HStack mt={2}>
          <FaLocationDot size={18} color="green" />
          <Text
            fontSize={{ base: "18px", md: "md" }}
            fontWeight={"bold"}
            noOfLines={1}
            color={"gray.500"}
          >
            {result.address}
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text
          className="font-normal"
          noOfLines={2}
          fontSize={{ base: "20px", md: "18px" }}
        >
          {result.description}
        </Text>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <Text fontSize={{ base: "20px", md: "18px" }} fontWeight={"bold"}>
            ${result.price}
          </Text>{" "}
          <Flex flexDir={"row"} flexWrap={"wrap"} gap={2}>
            <MdMeetingRoom color="green" size={20} />
            <Text fontSize={{ base: "20px", md: "18px" }} fontWeight={"medium"}>
              {result.bedrooms} rooms
            </Text>
            <FaSquareParking color="blue" size={20} />
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontWeight={"medium"}
              ml={2}
            >
              {result.parking ? "Parking Availaible" : "Parking Not Availaible"}
            </Text>
          </Flex>
        </div>
      </CardFooter>
    </Card>
  );
}
