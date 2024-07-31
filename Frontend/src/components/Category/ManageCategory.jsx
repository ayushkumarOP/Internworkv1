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
  width:100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;


const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Div1 = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  align-items: center;
  /* margin-left: 5%; */
`;

const ItemContainer2 = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  align-items: center;
  /* margin-left: 5%; */
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

const AddCategoryButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;

const SubcategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const SubcategoryInputField = styled(InputField)`
  width: 250px;
`;

const AddSubcategoryButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
`;

const ManageCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryTax, setCategoryTax] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [subcategories, setSubcategories] = useState([{ name: '' }]);

  const handleSubcategoryChange = (index, field, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index][field] = value;
    setSubcategories(newSubcategories);
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, { name: '' }]);
  };

  const handleRemoveSubcategory = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(newSubcategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryName', encodeURIComponent(categoryName));
    formData.append('categoryTax', Number(categoryTax));
    formData.append('categoryImage', categoryImage);
    
    // Convert subcategories to an array of strings
    const subcategoryNames = subcategories.map(subcategory => encodeURIComponent(subcategory.name));
    formData.append('subcategories', JSON.stringify(subcategoryNames));

    console.log('Form Data:', formData); // Debugging: Check form data

    try {
      const response = await axios.post(`${backendUrl}/apii/addCategory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setCategoryName('');
        setCategoryTax(0);
        setCategoryImage(null);
        setSubcategories([{ name: '' }]);
        document.getElementById('file-upload').value = ''; 
        alert("Category added successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setCategoryName('');
    setCategoryTax('');
    setCategoryImage(null);
    setSubcategories([{ name: '' }]);
    document.getElementById('file-upload').value = ''; 
  };

  const handleFileChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Wrapper>
      <Container>
      <Title>Manage Categories</Title>
        <Div1>
          <ItemContainer>
            <Title>Category Name</Title>
            <InputField
              type="text"
              placeholder="Enter Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </ItemContainer>


          <ItemContainer2>
            <Title>Category Tax %</Title>
            <InputField
              type="number"
              placeholder="Enter Tax %"
              value={categoryTax}
              onChange={(e) => setCategoryTax(e.target.value)}
              required
              min="1"
              max="100"
            />
          </ItemContainer2>
        </Div1>

        <Div1>
          <ItemContainer>
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
        </ItemContainer>
        <ItemContainer2>
          <Title>Subcategories</Title>
          <SubcategoryContainer>
            {subcategories.map((subcategory, index) => (
              <div key={index}>
                <SubcategoryInputField
                  type="text"
                  placeholder="Subcategory name"
                  value={subcategory.name}
                  onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                />
                <Button onClick={() => handleRemoveSubcategory(index)}>Remove</Button>
              </div>
            ))}
            <AddSubcategoryButton onClick={handleAddSubcategory}>Add Subcategory</AddSubcategoryButton>
          </SubcategoryContainer>
          <ActionButtons>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
            <AddCategoryButton onClick={handleSubmit}>Add Category</AddCategoryButton>
          </ActionButtons>
        </ItemContainer2>
        </Div1>
      </Container>
    </Wrapper>
    
  );
};

export default ManageCategory;
