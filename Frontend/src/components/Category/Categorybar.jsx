import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BASE_URL;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  width: 80%;
`;













const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  font-family: 'Arial, sans-serif';
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px;
  /* text-align: left; */
  background-color: #007BFF;
  color: white;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;

`;

const Img = styled.img`
  height: 75px;
  border-radius: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;
  &:hover {
    color: #0056b3;
  }
`;

const ProductTable = ({ products }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Product Image</Th>
          <Th>Product Name</Th>
          <Th>Category</Th>
          <Th>Subcategory</Th>
          <Th>Go to Product</Th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <Tr key={product._id}>
            <Td>
              <Img src={product.image} alt={product.name} />
            </Td>
            <Td>{decodeURIComponent(product.name)}</Td>
            <Td>{decodeURIComponent(product.category)}</Td>
            <Td>{product.subcategory}</Td>
            <Td>
              <StyledLink to={`/product/${product._id}`}>LINK</StyledLink>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};
























const Categorybar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/apii/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const encodedCategories = selectedCategories.map(encodeURIComponent);
      axios
        .get(`${backendUrl}/apu/productsByCategory?categories=${encodedCategories.join(',')}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error(error));
    } else {
      setProducts([]);
    }
  }, [selectedCategories]);
  

  return (
    <Wrapper>
      <Container>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          options={categories}
          getOptionLabel={(option) => decodeURIComponent(option)}
          value={selectedCategories}
          onChange={(event, newValue) => {
            setSelectedCategories(newValue);
          }}
          style={{ width: 700 }}  
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Products Category Wise"
              placeholder="Categories"
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px', 
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(30px,15px) scale(1)', 
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translate(15px, -9px) scale(0.75)', 
                }
              }}
            />
          )}
        />
        <ProductTable products={products} />
        
      </Container>
    </Wrapper>
  );
};

export default Categorybar;
