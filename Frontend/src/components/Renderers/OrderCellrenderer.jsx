import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
const backendUrl = process.env.REACT_APP_BASE_URL;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled(DeliveryDiningIcon)`
  cursor: pointer;
  color: #81c784;

  &:hover {
    color: #66bb6a;
  }
`;

const OrderCellrenderer = (params) => {
    const userId = params.data._id;

    const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        fetch(`${backendUrl}/api/orders/${userId}`, {
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
export default OrderCellrenderer;