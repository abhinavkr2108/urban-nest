import { Container, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ListingCard from "../../userListings/components/ListingCard";
import SearchItem from "../../search/components/SearchItem";

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/listings/get`
      );
      console.log("Listings: ");
      const data = await response.data;
      console.log(data);
      const filteredData = data.slice(0, 6);
      console.log("FILTERED DATA: ");
      console.log(filteredData);
      setListings(filteredData);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-5">
      {loading && listings.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      )}
      <Container maxW={"8xl"} m={"auto"} h={"full"}>
        <Heading fontSize={"2xl"}>Browse Listings</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={5}>
          {listings.map((listing) => {
            return (
              <div key={listing._id}>
                <SearchItem result={listing} />
              </div>
            );
          })}
        </SimpleGrid>
      </Container>
    </div>
  );
}
