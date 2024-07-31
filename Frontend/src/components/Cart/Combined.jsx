import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { mobile } from '../../responsive';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/cartRedux';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const backendUrl = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const FormContainer = styled.div`
  flex: 2;
  margin-right: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; 
`;

const SummaryContainer = styled.div`
  flex: 1; 
  padding: 30px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
`;

const TitleSummary = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #0277bd;
  padding: 10px 20px;
  border-radius: 10px 10px 0 0;
  margin: -30px -30px 20px -30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Buttonq = styled.button`
  width: 100%;
  padding: 3px;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0px 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c7c8cc;
  }
`;

const ButtonQ = styled(Button)`
  background-color: #007bff;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartContainer = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const CartTitle = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const CartImage = styled.img`
  width: 100px; /* Reduce the width */
  height: 100px; /* Maintain aspect ratio */
  border-radius: 10px; /* Add border-radius for rounded corners */
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd; /* Add border */
  border-radius: 10px; /* Add border-radius for rounded corners */
  /* margin-bottom: 20px; Add margin-bottom to separate the products */
  ${mobile({ flexDirection: 'column' })}
`;


const ProductDetail = styled.div`
  flex: 3;  /* Take up more space */
  display: flex;
  align-items: center;
`;

const PriceDetail = styled.div`
  flex: 1; /* Take up less space */
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the end */
  justify-content: center;
  margin-bottom: 25px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Changed from center to space-between */
  margin-bottom: 20px;
  flex: 1;
`;
const PriceAndDeleteContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


const StyledDeleteButton = styled(DeleteForeverIcon)`
  color: red;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    color: darkred;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
`;

// CartBox Component

const CartBox = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleRemoveFromCart = (product) => {
    if (window.confirm('Are you sure you want to remove this product from the cart?')) {
      dispatch(removeFromCart(product));
    }
  };

  console.log(cart);

  return (
    <CartContainer>
      <Wrapper>
        <CartTitle>YOUR CART</CartTitle>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <React.Fragment key={index}>
                <Product>
                  <ProductDetail>
                    <CartImage src={product.image} alt={product.name} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {decodeURIComponent(product.name)}
                      </ProductName>
                      <ProductId>
                        <b>Category:</b> {decodeURIComponent(product.category)}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Subcategory:</b> {product.subcategory}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <ProductAmountContainer>
                    <Buttonq onClick={() => handleIncreaseQuantity(product)}>
                      <ArrowDropUpIcon/>
                    </Buttonq>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Buttonq onClick={() => handleDecreaseQuantity(product)}>
                      <ArrowDropDownIcon/>
                    </Buttonq>
                  </ProductAmountContainer>
                  <PriceDetail>
                    <PriceAndDeleteContainer>
                    {/* <ProductPrice>₹ {product.categoryTax}</ProductPrice> */}
                      <ProductPrice>₹ {product.price * product.quantity}</ProductPrice>
                      <StyledDeleteButton  onClick={() => handleRemoveFromCart(product)}/>
                    </PriceAndDeleteContainer>
                  </PriceDetail>
                </Product>
                <Hr />
              </React.Fragment>
            ))}
          </Info>
        </Bottom>
      </Wrapper>
    </CartContainer>
  );
};

// Combined Component

const Combined = () => {
  const [countries, setCountries] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const cart = useSelector((state) => state.cart);
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    calculateTotals(cart.products);
  }, [cart]);

  const calculateTotals = (data) => {
    const subtotal = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalTotal = subtotal * 1.05;

    setSubtotal(subtotal.toFixed(2));
    setTotal(finalTotal.toFixed(2));
  };

  const handleQuotationRequest = async () => {
    try {
      const formData = {
        products: cart.products.map((product) => ({
          productId: product._id || product.productId,
          quantity: product.quantity,
        })),
        total,
        billingDetails: { fullName, email, phone, country, address },
      };
      const response = await axios.post(`${backendUrl}/api/quotation/quotation-request`, formData);
      console.log('Quotation request submitted successfully:', response.data);
      alert('Quotation Request is sent');
    } catch (err) {
      console.error('Failed to submit quotation request:', err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const formData = {
        products: cart.products.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        total,
      };

      const response = await axios.post(`${backendUrl}/api/orders/place-order`, formData);
      console.log('Order placed successfully:', response.data);
      alert('Order is placed');
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  return (
    <Container>
      <FormContainer>
        <CartBox />
      </FormContainer>
      <SummaryContainer>
        <Form>
          <TitleSummary>BILLING DETAILS</TitleSummary>
          <Label>Full Name</Label>
          <Input type="text" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <Label>Email Address</Label>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>Phone</Label>
          <Input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Label>Country</Label>
          <Select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Select>

          <Label>Street Address</Label>
          <Input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form>
        <TotalContainer>
          <span>Subtotal:</span>
          <span>₹ {subtotal}</span>
        </TotalContainer>
        <TotalContainer>
          <span>Tax:</span>
          <span>₹ {(total-subtotal).toFixed(2)}</span>
        </TotalContainer>
        <TotalContainer>
          <span>Total:</span>
          <span>₹ {total}</span>
        </TotalContainer>
        
        <ButtonQ onClick={handleQuotationRequest}>QUOTATION REQUEST &gt;&gt;</ButtonQ>
        <Button onClick={handlePlaceOrder}>PLACE ORDER &gt;&gt;</Button>
      </SummaryContainer>

    </Container>
  );
};

export default Combined;
