import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Grid,
  Spinner,
  Flex,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const ShoppingCartItem = () => {
  const [cartItems, setCartItems] = useState([]); // State for storing cart items
  const [isLoading, setIsLoading] = useState(true); // State for indicating loading status
  const [deleteItemId, setDeleteItemId] = useState(null); // State for storing the ID of the item to be deleted
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const toast = useToast();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems'); // Retrieve cart items from local storage
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems)); // Set cart items state with the parsed value from local storage
    }
    setIsLoading(false);
  }, []);

  const handleDeleteItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId); // Filter out the item to be deleted
    setCartItems(updatedItems); // Update cart items state with the filtered array
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage with the updated items
  };

  const handleDecrementQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          // Delete the item directly without showing toast or confirmation
          handleDeleteItem(itemId);
          toast({
            title: 'Item Deleted',
            description: 'Item is Deleted from Cart.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          return null;
        }
      }
      return item;
    });

    // Remove any null items (deleted items) from the updated items array
    const filteredItems = updatedItems.filter((item) => item !== null);

    setCartItems(filteredItems); // Update cart items state with the filtered array
    localStorage.setItem('cartItems', JSON.stringify(filteredItems)); // Update local storage with the filtered items
  };

  const handleIncrementQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < 5) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          // Show error message
          toast({
            title: 'Order Quantity Exceeded',
            description: 'You cannot add more than 5 items of this product to the cart.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      }
      return item;
    });
    setCartItems(updatedItems); // Update cart items state with the updated array
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage with the updated items
  };

  const handleDeleteConfirmation = () => {
    handleDeleteItem(deleteItemId);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const getUniqueProducts = () => {
    const uniqueProducts = [];
    const addedProducts = {};
    cartItems.forEach((item) => {
      if (!addedProducts[item.id]) {
        uniqueProducts.push(item);
        addedProducts[item.id] = true;
      }
    });
    return uniqueProducts;
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Shopping Cart
      </Heading>
      {isLoading ? (
        <Spinner size="xl" />
      ) : cartItems.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <Stack spacing={4}>
          <Text>Total items: {cartItems.length}</Text>
          <Text>Total: ${calculateTotal()}</Text>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
            {getUniqueProducts().map((item) => (
              <Box key={item.id} borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src={item.images} alt={item.name} objectFit="cover" height={200} width={400} />
                <Box p={4}>
                  <Heading as="h3" size="md" mb={2}>
                    {item.name}
                  </Heading>
                  <Text>Price: ${item.price}</Text>
                  <Flex align="center" mt={2}>
                    <IconButton
                      aria-label="Decrement"
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() => handleDecrementQuantity(item.id)}
                    />
                    <Text mx={2}>{item.quantity}</Text>
                    <IconButton
                      aria-label="Increment"
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => handleIncrementQuantity(item.id)}
                    />
                  </Flex>
                  <Button onClick={() => handleDeleteItem(item.id)} mt={4} colorScheme="red">
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Stack>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Box mt={4} color="red.500">
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCartItem;
