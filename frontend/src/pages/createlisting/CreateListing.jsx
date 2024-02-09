import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import AlertToast from "../../components/AlertToast";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  //State Variables
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    price: 50,
    address: "",
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    userRef: "",
  });
  const [error, setError] = useState("");
  const [listingError, setListingError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (files.length > 0) {
      console.log(files);
    }
  }, [files]);

  useEffect(() => {
    if (formData) {
      console.log("FORM DATA FIREBASE:");
      console.log(formData);
    }
  }, [formData]);

  //Functions
  const handleImagesSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadFile(files[i]));
      }

      toast.promise(
        Promise.all(promises),
        {
          loading: { title: "Uploading Images", description: "Please wait..." },
          success: {
            title: "Upload Successful",
            description: "All images were uploaded successfully.",
          },
          error: {
            title: "Upload Failed",
            description: "An error occurred while uploading images.",
          },
        },
        {
          success: (url) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(url),
            });
          },
          error: (err) => {
            setError(err.message);
          },
        }
      );

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          console.log(formData);
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred while uploading images");
        });
    } else {
      setError("You can only upload up to 6 images");
    }
  };
  const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
          //   console.error(error);
        },
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const removeImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      userRef: currentUser.user._id,
      token: currentUser.token,
    };

    try {
      if (
        formData.name === "" ||
        formData.description === "" ||
        formData.price === "" ||
        formData.address === "" ||
        formData.imageUrls.length === 0
      ) {
        setListingError("Please fill in all required fields");
        return;
      }
      if (formData.imageUrls.length === 0) {
        setListingError("Please upload at least one image");
      }
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/listings/create`,
        data
      );
      console.log(response);
      toast({
        title: "Listing created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      setListingError("");
    } catch (error) {
      console.error(error);
      setListingError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while creating the listing"
      );

      setLoading(false);
    }
  };
  return (
    <div className="pt-5">
      <Heading size={"lg"} textAlign={"center"}>
        Create Listing
      </Heading>

      <Container maxW={"6xl"} m={"auto"} className={"h-full pt-5"}>
        <>
          {listingError && (
            <AlertToast
              title="Error"
              description={listingError}
              status="error"
            />
          )}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={5}>
            <form className="flex flex-col gap-4">
              <Input
                id="name"
                placeholder="Name"
                bgColor={"white"}
                onChange={handleChange}
                value={formData.name}
                required
              />
              <Textarea
                id="description"
                placeholder="Description"
                bgColor={"white"}
                onChange={handleChange}
                value={formData.description}
                required
              />
              <Input
                id="address"
                placeholder="Address"
                bgColor={"white"}
                onChange={handleChange}
                value={formData.address}
                required
              />

              <Box>
                <Flex flexDirection={"row"} wrap={"wrap"} gap={3}>
                  <Checkbox
                    id="parking"
                    onChange={handleChange}
                    defaultChecked={formData.parking}
                  >
                    Parking
                  </Checkbox>
                  <Checkbox
                    id="furnished"
                    onChange={handleChange}
                    defaultChecked={formData.furnished}
                  >
                    Furnished
                  </Checkbox>
                  <Checkbox
                    id="offer"
                    onChange={handleChange}
                    defaultChecked={formData.offer}
                  >
                    Offer
                  </Checkbox>
                  <Checkbox
                    id="sale"
                    onChange={handleChange}
                    isChecked={formData.type === "sale"}
                  >
                    Sale
                  </Checkbox>
                  <Checkbox
                    id="rent"
                    isChecked={formData.type === "rent"}
                    onChange={handleChange}
                    // onChange={() => setFormData({ ...formData, type: "rent" })}
                  >
                    Rent
                  </Checkbox>
                </Flex>
              </Box>
              <Box>
                <Flex flexDirection={"row"} wrap={"wrap"} gap={3}>
                  <VStack align={"flex-start"}>
                    <Text className="text-slate-700 font-bold">Bedrooms</Text>
                    <NumberInput
                      id="bedrooms"
                      onChange={(valueAsString, valueAsNumber) =>
                        handleChange({
                          target: {
                            id: "bedrooms",
                            value: valueAsNumber,
                            type: "number",
                          },
                        })
                      }
                      value={formData.bedrooms}
                      min={0}
                    >
                      <NumberInputField
                        placeholder="Bedrooms Number"
                        bgColor={"white"}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </VStack>

                  <VStack align={"flex-start"}>
                    <Text className="text-slate-700 font-bold">
                      Price ($/month)
                    </Text>
                    <NumberInput
                      //   id="price"
                      onChange={(valueAsString, valueAsNumber) =>
                        handleChange({
                          target: {
                            id: "price",
                            value: valueAsNumber,
                            type: "number",
                          },
                        })
                      }
                      value={formData.price}
                      min={50}
                    >
                      <NumberInputField
                        placeholder="Price ($/month)"
                        bgColor={"white"}
                      />
                    </NumberInput>
                  </VStack>
                </Flex>
              </Box>
            </form>
            <form onSubmit={handleSubmit}>
              <p className="text-slate-500">
                <span className="text-slate-700 font-bold">Images: </span>Upload
                maximum 6 images. First Image will be Cover Image
              </p>

              {error && (
                <AlertToast title="Error" status="error" description={error} />
              )}

              <HStack spacing={3} align={"center"} mt={3}>
                <div className="border border-slate-200 rounded-md px-5 py-3 mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <Button
                  variant={"outline"}
                  onClick={handleImagesSubmit}
                  className="py-3 px-5"
                >
                  Upload
                </Button>
              </HStack>
              {formData.imageUrls.length > 0 && (
                <div className="flex flex-col gap-3">
                  {formData.imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center"
                    >
                      <img
                        src={url}
                        alt="image"
                        className="w-20 h-20 object-cover"
                      />
                      <Button
                        variant={"ghost"}
                        colorScheme="red"
                        onClick={() => removeImage(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                colorScheme="blue"
                w={"full"}
                mt={5}
                type="submit"
                isLoading={loading}
              >
                Create Listing
              </Button>
            </form>
          </SimpleGrid>
        </>
      </Container>
    </div>
  );
}
