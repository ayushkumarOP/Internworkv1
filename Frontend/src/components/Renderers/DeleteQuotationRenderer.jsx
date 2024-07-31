import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components'
const backendUrl = process.env.REACT_APP_BASE_URL;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled(DeleteIcon)`
  cursor: pointer;
  color: red;

  &:hover {
    color: darkred;
  }
`;

const DeleteQuotationRenderer = (params) => {
    const userId = params.data._id;

    const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        fetch(`${backendUrl}/api/quotation/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('User deleted:', data);
            params.api.applyTransaction({
            remove: [params.data],
            });
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    }
    };

    return <IconContainer><Button onClick={handleDeleteUser}>Delete User</Button></IconContainer>;
};
export default DeleteQuotationRenderer;