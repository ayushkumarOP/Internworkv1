import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import styled from 'styled-components';
const backendUrl = process.env.REACT_APP_BASE_URL;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled(PictureAsPdfIcon)`
  cursor: pointer;
  color: #229ac8;

  &:hover {
    color: #23a1d1;
  }
`;

const PDFRenderer = (params) => {
  const handleDownloadPDF = () => {
    const userId = params.data._id;

    fetch(`${backendUrl}/api/quotation/${userId}/generate-pdf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quotation_${userId}.pdf`); // Specify the filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <IconContainer>
      <Button onClick={handleDownloadPDF} />
    </IconContainer>
  );
};

export default PDFRenderer;
