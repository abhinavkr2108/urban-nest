import {
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchItem from "./components/SearchItem";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "newest",
    order: "asc",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.id === "parking" || e.target.id === "furnished") {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value === "lowest" ? "asc" : "desc";
      setSidebarData({
        ...sidebarData,
        order: order,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.id === "type") {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sidebarData);

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    console.log(sidebarData);
  }, [sidebarData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl || false,
        furnished: furnishedFromUrl || false,
        sort: sortFromUrl || "newest",
        order: orderFromUrl || "asc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/listings/get?${searchQuery}`
        );
        const data = await response.json();
        if (data.length > 6) {
          setShowMore(true);
        }
        setSearchResults(data);
        setLoading(false);
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfListings = searchResults.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/listings/get?${searchQuery}`
    );
    const data = await response.json();
    if (data.length < 6) {
      setShowMore(false);
    }
    setSearchResults([...searchResults, ...data]);
  };

  return (
    <Container maxW={"9xl"} m={"auto"}>
      <div className="pt-5">
        <Grid templateColumns={"repeat(6, 1fr)"} h={"full"} gap={8}>
          <GridItem colSpan={{ base: 6, md: 2 }} h={"full"} w={"full"}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="searchTerm">Search Term</label>
                <Input
                  placeholder="Search"
                  id="searchTerm"
                  onChange={handleChange}
                  value={sidebarData.searchTerm}
                />
              </div>
              <div>
                <label htmlFor="type" id="type">
                  Type:
                </label>
                <Select
                  placeholder="Select option"
                  id="type"
                  onChange={handleChange}
                  value={sidebarData.type}
                >
                  <option value="all">All</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </Select>
              </div>
              <div>
                <label htmlFor="amenities" id="amenities">
                  Amenities:
                </label>
                <Flex flexWrap={"wrap"} gap={3}>
                  <Checkbox
                    id="parking"
                    onChange={handleChange}
                    defaultChecked={sidebarData.parking}
                  >
                    Parking
                  </Checkbox>
                  <Checkbox
                    id="furnished"
                    onChange={handleChange}
                    defaultChecked={sidebarData.furnished}
                  >
                    Furnished
                  </Checkbox>
                </Flex>
              </div>
              <div>
                <label htmlFor="sort">Sort</label>
                <Select
                  placeholder="Select option"
                  onChange={handleChange}
                  id="sort"
                >
                  <option value="newest">Created At </option>
                  <option value="lowest">Lowest Price</option>
                  <option value="highest">Highest Price</option>
                </Select>
              </div>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Search
              </Button>
            </form>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 4 }} h={"full"} w={"full"}>
            <Heading fontSize={"2xl"} className="font-bold text-slate-600">
              Listing Results
            </Heading>

            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              ""
            )}
            {!loading && searchResults.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center">
                <Text className="text-slate-700">No listings found</Text>
              </div>
            ) : null}
            {!loading && searchResults.length > 0 ? (
              <div>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  mt={5}
                >
                  {searchResults.map((result) => (
                    <div key={result._id} columns={{ base: 1, md: 2, lg: 3 }}>
                      <SearchItem result={result} />
                    </div>
                  ))}
                </SimpleGrid>
              </div>
            ) : null}
            {showMore && (
              <Button
                variant={"ghost"}
                colorScheme="green"
                onClick={onShowMoreClick}
                mt={8}
              >
                Show More
              </Button>
            )}
          </GridItem>
        </Grid>
      </div>
      <div></div>
    </Container>
  );
}
