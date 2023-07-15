import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function Home() {
  return (
    <Box
      textAlign="center"
      mt={20}
      p={10}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      maxW="900px"
      mx="auto"
      backgroundColor="white"
    >
      <Heading as="h3" size="xl" mb={4}>
        Welcome to the Todo App and Shopping Cart App!
      </Heading>
      <Text fontSize="lg">
        Discover our powerful applications built with React, designed to enhance
        your productivity and streamline your shopping experience. Stay
        organized with the Todo App, where you can effortlessly manage your
        tasks, prioritize them, and stay on top of your to-do list. Experience
        seamless shopping with our Shopping Cart App, allowing you to browse,
        add items to your cart, and complete your purchase with ease. Leveraging
        the strength of React, both apps offer exceptional performance and
        dynamic interfaces. We prioritize user experience and code quality to
        ensure smooth functionality and maintainability. We value your feedback
        as we continuously improve our applications to better serve you. Choose
        our Todo App and Shopping Cart App for a simplified and enjoyable
        experience. Thank you for choosing our apps! Start exploring now and let
        us know how we can make your experience even better! Happy organizing
        and happy shopping!
      </Text>
    </Box>
  );
}

export default Home;
