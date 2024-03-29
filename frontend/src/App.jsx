import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Signout from "./pages/signout/Signout";
import Header from "./components/Header";
import About from "./pages/about/About";
import Discover from "./pages/discover/Discover";
import Profile from "./pages/profile/Profile";
import { Box } from "@chakra-ui/react";
import Private from "./pages/private/Private";
import Listings from "./pages/listings/Listings";
import CreateListing from "./pages/createlisting/CreateListing";
import UserListings from "./pages/userListings/UserListings";
import UpdateListing from "./pages/update/UpdateListing";
import SingleListing from "./pages/listings/SingleListing";
import Search from "./pages/search/Search";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Box minH={"100vh"} w={"full"} bgColor={"gray.50"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/listings/:id" element={<SingleListing />} />
          <Route path="/search" element={<Search />} />
          <Route element={<Private />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing/:id" element={<UserListings />} />
            <Route path="/update-listing/:id" element={<UpdateListing />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
