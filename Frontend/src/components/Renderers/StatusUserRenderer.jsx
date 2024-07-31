// import { Button } from '@mui/material'
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import styled from "styled-components";
const backendUrl = process.env.REACT_APP_BASE_URL;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled(ModeEditIcon)`
  cursor: pointer;
  color: gray;

  &:hover {
    color: #1976d2;
  }
`;

const StatusUserRenderer = (params) => {
  const userId = params.data._id;
  const currentName = params.data.name;
  const currentLastName = params.data.lastname;

  const handleUpdateUser = () => {
    if (window.confirm("Are you sure you want to update credentials of this user?")) {
      fetch(`${backendUrl}/api/users/${userId}/update-name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: currentName, lastname: currentLastName }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("User name updated:", data);
        params.api.refreshCells();
      })
      .catch((error) => {
        console.error("Error updating user name:", error);
      });
    }
  };

  return (
    <IconContainer>
      <Button onClick={handleUpdateUser}>Update User</Button>
    </IconContainer>
  );
};

export default StatusUserRenderer;

