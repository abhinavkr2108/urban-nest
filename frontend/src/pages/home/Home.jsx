import React from "react";
import Landing from "./components/Landing";
import BrowseListings from "./components/BrowseListings";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Landing />
      <BrowseListings />
    </>
  );
}
