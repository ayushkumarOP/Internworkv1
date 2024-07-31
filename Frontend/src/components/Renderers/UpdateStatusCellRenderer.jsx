// import { Button } from '@mui/material'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "styled-components";
const backendUrl = process.env.REACT_APP_BASE_URL;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled(CheckCircleIcon)`
  cursor: pointer;
  color: green;

  &:hover {
    color: darkgreen;
  }
`;

const UpdateStatusCellRenderer = (params) => {
  const userId = params.data._id;
  const currentStatus = params.data.status;

  const handleUpdateStatus = () => {
    if (window.confirm("Are you sure you want to update status of this user?")) {
      fetch(`${backendUrl}/api/users/${userId}/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: currentStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Status updated:", data);
          params.api.refreshCells();
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        });
    }
  };

  return (
    <IconContainer>
      <Button onClick={handleUpdateStatus}>Update Status</Button>
    </IconContainer>
  );
};

export default UpdateStatusCellRenderer;
