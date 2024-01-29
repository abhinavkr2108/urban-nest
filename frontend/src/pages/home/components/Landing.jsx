import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export default function Landing() {
  return (
    <Box h={{ base: "100vh", md: "80vh" }} w={"full"} className="bg-indigo-100">
      <Container maxW={"8xl"} m={"auto"}>
        <Grid templateColumns={"repeat(6, 1fr)"}>
          <GridItem colSpan={4} bgColor={"blue"}>
            Hello
          </GridItem>
          <GridItem colSpan={2} bgColor={"green"}>
            Hello
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
