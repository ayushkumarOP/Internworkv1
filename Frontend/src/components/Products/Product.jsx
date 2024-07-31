import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { addProduct } from "../../redux/cartRedux";
const backendUrl = process.env.REACT_APP_BASE_URL;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const SideNav = styled.h1`
  margin-left: 4rem;
  font-weight: 400;
  font-size: 15px;
  font-family: Lexend Deca, sans-serif;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Filter = styled.div`
  margin-bottom: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const Option = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 5px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const PriceText = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const VarText = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15px;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ProductE = () => {
  const [product, setProduct] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/apu/find/` + id);
        setProduct(res.data);
        if (res.data.variantType === 'single') {
          setPrice(res.data.price);
        } else {
          const initialSelectedVariants = res.data.variants.reduce((acc, variant) => {
            acc[variant] = '';
            return acc;
          }, {});
          setSelectedVariants(initialSelectedVariants);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product.variantType === 'multiple' && allVariantsSelected()) {
      updatePrice();
    }
  }, [selectedVariants, product]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({ ...product, quantity, selectedVariants, price })
    );
  };

  const createMarkup = (html) => ({ __html: html });

  const handleVariantChange = (variant, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variant]: value
    }));
  };
  console.log(selectedVariants);
  const updatePrice = () => {
    for (let combo of product.combinations) {
  
      const isMatch = Object.keys(selectedVariants).every(key => 
        selectedVariants[key] === combo.combination[key]
      );
  
      if (isMatch) {
        setPrice(Number(combo.combination.price));
        return;
      }
    }

    setPrice(0);
  };

  const allVariantsSelected = () => {
    return product.variants && product.variants.every(variant => selectedVariants[variant] !== '');
  };


  return (
    <Container>
      <SideNav>
        Home&nbsp;&nbsp;{'>'}&nbsp;&nbsp;Category&nbsp;&nbsp;{'>'}&nbsp;&nbsp;{decodeURIComponent(product.category)}&nbsp;&nbsp;{'>'}&nbsp;&nbsp;<span style={{ color: 'rgb(102, 102, 102)' }}>{decodeURIComponent(product.name)}</span>
      </SideNav>
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} alt={product.name} />
        </ImgContainer>
        <InfoContainer>
          <Title>SKU: {decodeURIComponent(product.category)}</Title>
          <Title>{decodeURIComponent(product.name)}</Title>
         
          <Desc dangerouslySetInnerHTML={createMarkup(product.description)} />
          
          

          {product.variantType === 'multiple' && product.variants && product.subvariants && (
            <FilterContainer>
              <VarText>Variants:</VarText>
              {product.variants.map((variant, index) => (
                <Filter key={index}>
                  <FilterTitle>{variant} :</FilterTitle>
                  <Select
                    value={selectedVariants[variant]}
                    onChange={(e) => handleVariantChange(variant, e.target.value)}
                  >
                    <Option value="">Select {variant}</Option>
                    {product.subvariants[index].map((subvariant, subIndex) => (
                      <Option key={subIndex} value={subvariant}>{subvariant}</Option>
                    ))}
                  </Select>
                </Filter>
              ))}
            </FilterContainer>
          )}

          {(product.variantType === 'single' || allVariantsSelected()) && 
            <Price><PriceText>Price:</PriceText> ₹ {price * quantity}</Price>
          }

          <AddContainer>
            <AmountContainer>
              <QuantityButton onClick={() => handleQuantity("dec")}><ArrowDropDownIcon /></QuantityButton>
              <Amount>{quantity}</Amount>
              <QuantityButton onClick={() => handleQuantity("inc")}><ArrowDropUpIcon /></QuantityButton>
            </AmountContainer>
            <Button onClick={handleAddToCart} disabled={!allVariantsSelected()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductE;