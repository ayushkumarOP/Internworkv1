import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import { Editor } from '@tinymce/tinymce-react';
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
`;

const ItemContainer2 = styled.div`
  display: flex;
  flex:2;
  flex-direction: column;
  align-items: center;
  margin-left: -5%;
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

const VariantInputField = styled(InputField)`
  width: 250px;
`;

const SelectField = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 300px;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

const AddProductButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;

const VariantContainer = styled.div`
  margin-bottom: 10px;
`;

const SubvariantContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const AddVariantButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  margin-bottom: 10px;
`;

const AddSubvariantButton = styled(Button)`
  background-color: #6c757d;
  color: #fff;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const RemoveSubvariantButton = styled(Button)`
  background-color: red;
  color: #fff;
  padding: 8px 20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTax, setCategoryTax] = useState();
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [variantType, setVariantType] = useState('');
  const [combinations, setCombinations] = useState([]);
  const [combinationPrices, setCombinationPrices] = useState([]);


  useEffect(() => {
    axios.get(`${backendUrl}/apii/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    axios.get(`${backendUrl}/apii/findtax?category=${encodeURIComponent(category)}`)
      .then(response => setCategoryTax(response.data))
      .catch(error => console.error(error));

    axios.get(`${backendUrl}/apii/subcategories?category=${encodeURIComponent(category)}`)
      .then(response => setSubcategories(response.data))
      .catch(error => console.error(error));

    setSelectedSubcategory('');
    
  };
  

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { type: '', subvariants: [{ name: '', price: '' }] }]);
  };

  const handleAddSubvariant = (index) => {
    const newVariants = [...variants];
    newVariants[index].subvariants.push({ name: '', price: '' });
    setVariants(newVariants);
  };

  const generateCombinations = () => {
    if (variants.length === 0) return [];
  
    const combinations = (arr) => {
      if (arr.length === 1) {
        return arr[0].subvariants.map(sub => ({ [arr[0].type]: sub.name }));
      }
  
      const result = [];
      const allCasesOfRest = combinations(arr.slice(1)); 
  
      for (let i = 0; i < allCasesOfRest.length; i++) {
        for (let j = 0; j < arr[0].subvariants.length; j++) {
          result.push({ ...allCasesOfRest[i], [arr[0].type]: arr[0].subvariants[j].name });
        }
      }
  
      return result;
    };
  
    const newCombinations = combinations(variants);
    setCombinations(newCombinations);
    setCombinationPrices(newCombinations.map(() => ''));
  };
  

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleSubvariantChange = (variantIndex, subvariantIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].subvariants[subvariantIndex][field] = value;
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveSubvariant = (variantIndex, subvariantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].subvariants.splice(subvariantIndex, 1);
    setVariants(newVariants);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', encodeURIComponent(name));
    formData.append('description', description);
    formData.append('variantType', variantType);
    formData.append('categoryTax', categoryTax);

    if (variantType === 'single') {
      formData.append('price', price);
    } 
    else {
      const variantTypes = variants.map(variant => variant.type);
      const subvariantTypes = variants.map(variant => variant.subvariants.map(subvariant => subvariant.name));
      const combinedVariants = combinations.map((combination, index) => ({
        ...combination,
        price: combinationPrices[index],
      }));

      formData.append('subvariants', JSON.stringify(subvariantTypes));
      formData.append('variants', JSON.stringify(variantTypes));
      formData.append('combinations', JSON.stringify(combinedVariants));
    }
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);
    formData.append('myfile', image);

    try {
      const response = await axios.post(`${backendUrl}/apu/addProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setName('');
        setDescription('');
        setImage(null);
        setVariants([]);
        setCategoryTax();
        setSelectedCategory('');
        setSelectedSubcategory('');
        setPrice('');
        setVariantType('');
        setCombinations([]);
        setCombinationPrices([]);
        alert("Product added successfully");
        document.getElementById('file-upload').value = '';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  const handleReset = () => {
    setName('');
    setDescription('');
    setImage(null);
    setVariants([]);
    setCategoryTax();
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPrice('');
    setVariantType('');
    setCombinations([]);
    setCombinationPrices([]);
    alert("Product added successfully");
    document.getElementById('file-upload').value = '';
  };

  return (
    <Wrapper>
      <Container>
      <Title>Manage Products</Title>
        <Div1>
          <ItemContainer>
            <Title>Product Name</Title>
            <InputField
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </ItemContainer>
          
          <ItemContainer>
          <Title>Category Selection</Title>
            <SelectWrapper>
              <SelectField value={selectedCategory} onChange={handleCategoryChange} required>
                <option value="" disabled>Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{decodeURIComponent(category)}</option>
                ))}
              </SelectField>
              <SelectField value={selectedSubcategory} onChange={handleSubcategoryChange} required>
                <option value="" disabled>Select subcategory</option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>{decodeURIComponent(subcategory)}</option>
                ))}
              </SelectField>
            </SelectWrapper>
          </ItemContainer>
        </Div1>

        <Div1>
          <ItemContainer2>
            <Title>Product Description</Title>
            <Editor
              apiKey="cihhcazgrqyhznr0a50t28r0l0j6dc8z6z683qpyu1dzmzb9"
              value={description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
              }}
              onEditorChange={(content) => setDescription(content)}
              />
            </ItemContainer2>
            <ItemContainer>
              <Title>Image Upload</Title>
              <ImageUpload>
                <UploadButton htmlFor="file-upload">
                  <UploadIcon /> Upload Image
                </UploadButton>
                <FileInput id="file-upload" type="file" onChange={handleFileChange} />
              </ImageUpload>
          </ItemContainer>
        </Div1>

    <Title>Variant Type</Title>
    <SelectField value={variantType} onChange={(e) => setVariantType(e.target.value)} required>
      <option value="" disabled>Select variant type</option>
      <option value="single">Single</option>
      <option value="multiple">Multiple</option>
    </SelectField>

    {variantType === 'single' && (
      <>
        <Title>Price</Title>
        <InputField
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={handlePriceChange}
          required
        />
      </>
    )}

    {variantType === 'multiple' && (
      <>
        <Title>Variants</Title>
        {variants.map((variant, index) => (
          <VariantContainer key={index}>
            <VariantInputField
              type="text"
              placeholder="Enter variant type"
              value={variant.type}
              onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
            />
            {variant.subvariants.map((subvariant, subIndex) => (
              <SubvariantContainer key={subIndex}>
                <VariantInputField
                  type="text"
                  placeholder="Enter subvariant name"
                  value={subvariant.name}
                  onChange={(e) => handleSubvariantChange(index, subIndex, 'name', e.target.value)}
                />
                <RemoveSubvariantButton onClick={() => handleRemoveSubvariant(index, subIndex)}>Remove Subvariant</RemoveSubvariantButton>
              </SubvariantContainer>
            ))}
            <AddSubvariantButton onClick={() => handleAddSubvariant(index)}>Add Subvariant</AddSubvariantButton>
            <RemoveSubvariantButton onClick={() => handleRemoveVariant(index)}>Remove Variant</RemoveSubvariantButton>
          </VariantContainer>
        ))}
        <AddVariantButton onClick={handleAddVariant}>Add Variant</AddVariantButton>
        <AddVariantButton onClick={generateCombinations}>Generate Combinations</AddVariantButton>

        {combinations.length > 0 && (
          <>
            <Title>Combinations</Title>
            {combinations.map((combination, index) => (
              <div key={index}>
                <div>{Object.entries(combination).map(([key, value]) => `${key}: ${value}`).join(', ')}</div>
                <VariantInputField
                  type="number"
                  placeholder="Enter price"
                  value={combinationPrices[index]}
                  onChange={(e) => {
                    const newPrices = [...combinationPrices];
                    newPrices[index] = e.target.value;
                    setCombinationPrices(newPrices);
                  }}
                />
              </div>
            ))}
          </>
        )}
      </>
    )}


    <ActionButtons>
      <ResetButton onClick={handleReset}>Reset</ResetButton>
      <AddProductButton onClick={handleSubmit}>Add Product</AddProductButton>
    </ActionButtons>
  </Container>
</Wrapper>
);
};

export default CategoryForm;