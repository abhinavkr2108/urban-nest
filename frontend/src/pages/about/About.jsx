import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function About() {
  return (
    <div className="pt-5">
      <Container maxW={"6xl"} m={"auto"} h={"full"}>
        <Heading fontSize={"2xl"}>About Urban Nest</Heading>
        <Box my={5}>
          <Text fontSize={"18px"} className="text-slate-500">
            Urban Nest is a platform that connects buyers and sellers of
            properties. Our mission is to provide a seamless and efficient way
            to connect buyers and sellers of properties.
            <br />
          </Text>
        </Box>
        <Heading fontSize={"2xl"}>Tech Stack Used</Heading>
        <Box my={5}>
          <Text fontSize={"18px"} className="text-slate-500">
            <p className="text-slate-500">
              {" "}
              <span className="text-slate-700 font-bold">Vite React: </span>
              The frontend framework that powers Urban Nest.Vite React refers to
              the use of Vite as a build tool and development server for React
              applications. Vite is a next-generation front-end build tool
              created by Evan You, the creator of Vue.js. It provides a faster
              and leaner development experience compared to traditional tools
              like Webpack.
            </p>
            <br />
            <p className="text-slate-500">
              {" "}
              <span className="text-slate-700 font-bold">Chakra UI: </span>
              Chakra UI is a simple, modular, and accessible component library
              for React applications. It is designed to help developers build
              accessible web applications quickly and efficiently. Chakra UI
              provides a wide range of prebuilt components covering various
              categories such as layout, forms, data display, feedback,
              typography, navigation, media, and others. These components are
              designed to be easy to use and integrate into your React
              applications
            </p>
            <br />
            <p className="text-slate-500">
              {" "}
              <span className="text-slate-700 font-bold">NodeJs: </span>
              Node.js is an open-source, cross-platform runtime environment that
              allows developers to execute JavaScript code outside of a browser
              context. It is particularly suited for server-side applications
              and is known for its high performance and scalability. Node.js
              uses an event-driven, non-blocking I/O model, which makes it
              lightweight and efficient, perfect for data-intensive real-time
              applications that run across distributed devices
            </p>
            <br />
            <p className="text-slate-500">
              {" "}
              <span className="text-slate-700 font-bold">ExpressJs: </span>
              Express.js is widely used because it saves development time,
              allows for the use of a single language (JavaScript) for both
              frontend and backend development, and is fast to integrate with
              databases like MySQL or MongoDB. Additionally, it supports dynamic
              rendering of HTML pages based on passed arguments to templates,
              which can be rendered using various view engines like EJS, Pug, or
              Handlebars
            </p>
            <br />
            <p className="text-slate-500">
              {" "}
              <span className="text-slate-700 font-bold">MongoDB: </span>
              MongoDB is a source-available, cross-platform, document-oriented
              database program. It is classified as a NoSQL database product,
              which means it does not rely on the traditional tabular relational
              database structure but instead stores data in a flexible,
              JSON-like format. This approach allows for varied and changeable
              data structures, which can be particularly useful for applications
              with evolving data requirements.
            </p>
          </Text>
        </Box>
      </Container>
    </div>
  );
}
