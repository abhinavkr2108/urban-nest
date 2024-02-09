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
} from "@chakra-ui/react";
import React from "react";

export default function ListingCard({ listing }) {
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
              <Button variant="solid" colorScheme="blue">
                View Listing
              </Button>
              <Button variant="solid" colorScheme="gray">
                Edit Listing
              </Button>
              <Button variant="solid" colorScheme="red">
                Delete Listing
              </Button>
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
}
