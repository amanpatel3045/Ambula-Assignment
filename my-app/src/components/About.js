import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function About() {
  return (
    <Box
      textAlign="center"
      mt={20}
      p={10}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      maxW="1100px"
      mx="auto"
      backgroundColor="white"
    >
      <Heading as="h1" size="xl" mb={4}>
        About the Project
      </Heading>
      <Text fontSize="lg">
        <strong>Todo List Project:</strong>
        <br/>
        Welcome to our React-powered applications: the Todo App and Shopping Cart App!
        I have created two robust applications using React: the Todo App and Shopping Cart App. The Todo App helps you stay organized and manage tasks efficiently, while the Shopping Cart App offers a seamless shopping experience. Both apps leverage React's power, providing interactive interfaces and high performance. Our team prioritizes user experience and code quality, ensuring visually appealing, maintainable, and extensible applications. We value your feedback as we continuously improve our offerings. Thank you for choosing [Your Company Name] and enjoy using our React-powered apps!
      </Text>
    </Box>
  );
}

export default About;
