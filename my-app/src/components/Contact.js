import React from 'react';
import { Box, Heading, Text, Flex, IconButton } from '@chakra-ui/react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={4}>
        Contact
      </Heading>
      <Text fontSize="lg">
        Feel free to connect with me on LinkedIn or check out my GitHub repositories:
      </Text>
      <Flex justifyContent="center" mt={4}>
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/aman-patel-540a47169/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
          size="lg"
          colorScheme="gray"
          mr={2}
        />
        <IconButton
          as="a"
          href="https://github.com/amanpatel3045"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          icon={<FaGithub />}
          size="lg"
          colorScheme="gray"
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default Contact;
