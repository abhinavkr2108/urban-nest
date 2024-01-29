import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

/**<a href="https://www.freepik.com/free-ai-image/3d-rendering-isometric-house_62520711.htm#query=blue%20color%20real%20estate%20home%20design&position=35&from_view=search&track=ais&uuid=4218197b-4d75-46cc-a4a6-f6c5d8d845a9">Image By freepik</a> */
export default function Landing() {
  return (
    <Box h={{ base: "100vh", md: "80vh" }} w={"full"} className="bg-indigo-100">
      <Container maxW={"8xl"} m={"auto"} h={"full"}>
        <Grid
          templateColumns={"repeat(6, 1fr)"}
          h={"full"}
          placeContent={"center"}
        >
          <GridItem
            colSpan={{ base: 6, md: 4 }}
            order={{ base: 2, md: 1 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={{ base: "center", md: "start" }}
            h={"full"}
            w={"full"}
          >
            <VStack
              spacing={5}
              w={"full"}
              align={{ base: "center", md: "start" }}
            >
              <Heading fontSize={"4xl"} className="font-bold text-slate-600">
                <span className="text-slate-800">Welcome to Urban-Nest</span>
                <br /> Find Your Next Perfect Place <br />
                with Ease
              </Heading>

              <Text fontSize={"20px"} className="text-slate-500">
                Urban Nest will help you find your next home fast and easy.
                <br /> Our expert support is always availaible to help you.
              </Text>
              <Button colorScheme={"blue"} variant={"solid"}>
                Get Started Now
              </Button>
            </VStack>
          </GridItem>
          <GridItem
            colSpan={{ base: 6, md: 2 }}
            order={{ base: 1, md: 2 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={{ base: "center", md: "start" }}
            h={"full"}
          >
            <Image
              src="/home.png"
              alt="home"
              h={{ md: "600px" }}
              //   w={{ md: "100000px" }}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
