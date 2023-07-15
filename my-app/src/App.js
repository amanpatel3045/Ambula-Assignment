import React from 'react';
import { ChakraProvider, CSSReset, Box, Flex, Link } from '@chakra-ui/react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TaskList from './components/TaskList';
import Product from './components/Product';
import ShoppingCartItem from './components/ShoppingCartItem';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box bgGradient="linear(to-r, purple.500, pink.500)" minHeight="100vh">
        <Box p={4} bg="rgba(255, 255, 255, 0.8)">
          <Flex align="center" justify="center" maxW="800px" mx="auto">
            <Link
              as={RouterLink}
              to="/"
              fontSize="xl"
              _hover={{ textDecoration: 'none' }}
              marginRight={7}
              fontWeight="bold"
              color="teal.500"
            >
              Home
            </Link>
            <Link
              as={RouterLink}
              to="/tasks"
              fontSize="xl"
              _hover={{ textDecoration: 'none' }}
              marginRight={7}
              fontWeight="bold"
              color="yellow.500"
            >
              Tasks
            </Link>
            <Link
              as={RouterLink}
              to="/product"
              fontSize="xl"
              _hover={{ textDecoration: 'none' }}
              marginRight={7}
              fontWeight="bold"
              color="red.500"
            >
              Product
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              fontSize="xl"
              _hover={{ textDecoration: 'none' }}
              marginRight={7}
              fontWeight="bold"
              color="blue.500"
            >
              About
            </Link>
            <Link
              as={RouterLink}
              to="/contact"
              fontSize="xl"
              _hover={{ textDecoration: 'none' }}
              fontWeight="bold"
              color="green.500"
            >
              Contact
            </Link>
          </Flex>
        </Box>

        <Box p={4} maxW="800px" mx="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<ShoppingCartItem />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
