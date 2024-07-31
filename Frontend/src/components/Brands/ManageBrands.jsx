import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
const backendUrl = process.env.REACT_APP_BASE_URL;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 120px;
  margin-left: 235px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 300px;
`;

const ImageUpload = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UploadButton = styled.label`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ResetButton = styled(Button)`
  background-color: #ffa500;
  color: #fff;
`;

const AddBrandButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;

const ManageBrands = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', encodeURIComponent(name));
    formData.append('myfile', image);

    try {
      const response = await axios.post(`${backendUrl}/api/addBrand`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response.status===200){
        setName(''); setImage(null);
        alert("Brand is added");
        document.getElementById('file-upload').value = '';
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setName('');
    setImage(null);
    document.getElementById('file-upload').value = '';
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Manage Brands</Title>
        <Title>Brand Name</Title>
        <InputField
          type="text"
          placeholder="Enter brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Title>Image Upload</Title>
        <ImageUpload>
          <UploadButton htmlFor="file-upload">
            <UploadIcon /> Upload
          </UploadButton>
          <FileInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Recommended Size: 131x131 pixels</p>
        </ImageUpload>
        <ActionButtons>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <AddBrandButton onClick={handleSubmit}>Add Brand</AddBrandButton>
        </ActionButtons>
      </Container>
    </Wrapper>
  );
};

export default ManageBrands;
