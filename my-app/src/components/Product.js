import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  Heading,
  Text,
  IconButton,
  useToast,
  Badge,
  Grid,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaCartPlus, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const toast = useToast();
  const [products, setProducts] = useState([]); // State for storing products
  const [cartItems, setCartItems] = useState([]); // State for storing cart items
  const [loading, setLoading] = useState(false); // State for indicating loading status
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      const fetchedProducts = response.data.map((product) => ({
        ...product,
        quantity: 0,
      }));
      setProducts(fetchedProducts); // Set products state with fetched products from the API
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleIncrementQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity < 5
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts); // Update products state with the updated array
  };

  const handleDecrementQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts); // Update products state with the updated array
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd && productToAdd.quantity > 0) {
      if (productToAdd.quantity > 5) {
        toast({
          title: "Order Quantity Exceeded",
          description:
            "You cannot add more than 5 items of this product to the cart.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        // return;
      }
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      storedCartItems.push(productToAdd);
      localStorage.setItem("cartItems", JSON.stringify(storedCartItems)); // Update local storage with the updated cart items
      setCartItems((prevCartItems) => [...prevCartItems, productToAdd]); // Update cart items state with the updated array

      toast({
        title: "Item Added to Cart",
        description: "The item has been successfully added to the cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate the total number of items in the cart
  };

  const gotoCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <Box py={4}>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <IconButton
          icon={<FaCartPlus />}
          aria-label="Cart"
          color="white.500"
          size="md"
          onClick={gotoCart}
        >
          <Badge borderRadius="full" colorScheme="red">
            {getTotalItems()}{" "}
           
          </Badge>
        </IconButton>
      </Box>

      <VStack align="flex-start" spacing={4} mx="auto">
        <Heading as="h2" size="lg" color="teal.50">
          Products
        </Heading>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Spinner size="xl" thickness="4px" />
          </Flex>
        ) : products.length > 0 ? (
          <Grid
            templateColumns="repeat(5, 1fr)"
            gap={4}
            justifyContent="flex-start"
          >
            {products.map((product) => (
              <Box
                key={product.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                borderWidth="1px"
                borderRadius="md"
                p={4}
                boxShadow="md"
                backgroundColor="white"
              >
                <Box mb={4}>
                  <img
                    src={product.images}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Text fontWeight="bold">{product.title}</Text>
                  <Text>${product.price}</Text>
                </Box>
                <Flex alignItems="center" justifyContent="center">
                  <IconButton
                    icon={<FaMinus />}
                    aria-label="Decrease Quantity"
                    onClick={() => handleDecrementQuantity(product.id)}
                    size="sm"
                    colorScheme="teal"
                  />
                  <Text mx={2}>{product.quantity}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    aria-label="Increase Quantity"
                    onClick={() => handleIncrementQuantity(product.id)}
                    size="sm"
                    colorScheme="teal"
                  />
                </Flex>
                <Button
                  mt={4}
                  colorScheme="teal"
                  onClick={() => handleAddToCart(product.id)}
                  isDisabled={product.quantity === 0}
                >
                  Add to Cart
                </Button>
              </Box>
            ))}
          </Grid>
        ) : (
          <Text>No products available.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Product;
