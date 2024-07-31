import React, { useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import DeleteUserRenderer from './Renderers/DeleteUserRenderer';
import StatusUserRenderer from './Renderers/StatusUserRenderer';
import UpdateStatusCellRenderer from './Renderers/UpdateStatusCellRenderer';


const Container = styled.div`
  margin-top: 6%;
  margin-left: 18%;
`;

const statusOptions = ['Pending', 'Approved', 'Rejected'];
const StatusSelect = styled.select`
  color: ${({ value }) => {
    switch (value) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Rejected':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-color: ${({ value }) => {
    switch (value) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Rejected':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-radius: 5px;
  padding: 2px;
`;

const CenteredHeader = styled.div`
  .ag-header-cell-label {
    justify-content: center;
  }
`;

const StatusCellRenderer = (params) => {
  const selectedValue = params.value || 'Pending';
  const handleChange = (event) => {
    params.setValue(event.target.value);
  };

  return (
    <StatusSelect value={selectedValue} onChange={handleChange}>
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StatusSelect>
  );
};

const CombinedActionsCellRenderer = (params) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
      <StatusUserRenderer {...params} />
      <DeleteUserRenderer {...params} />
    </div>
  );
};

const Table = () => {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const [colDefs, setColDefs] = useState([
    { headerName: "Username", field: "username", flex: 2 },
    { headerName: "Email", field: "email", flex: 2 },
    { headerName: "Name", field: "name", editable: true, flex: 2 },
    { headerName: "Last Name", field: "lastname", editable: true, flex: 2 },
    {
      headerName: 'Status',
      field: 'status',
      cellEditor: 'agSelectCellEditor', flex: 2,
      cellEditorParams: {
        values: statusOptions,
      },
      cellRenderer: StatusCellRenderer,
    },
    {
      headerName: 'Update Status',
      flex: 2,
      cellRenderer: UpdateStatusCellRenderer,
    },
    {
      headerName: 'Actions',
      flex: 2,
      cellRenderer: CombinedActionsCellRenderer,
    }
  ]);

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  }
  const backendUrl = process.env.REACT_APP_BASE_URL;
  console.log(backendUrl);

  const onGridReady = (params) => {
    console.log("grid is ready");
    fetch(`${backendUrl}/api/users/alldata`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        params.api.applyTransaction({ add: resp });
      });
  }

  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true
  }

  return (
    <Container>
      <CenteredHeader>
        <div className="ag-theme-material" style={{ height: 570 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            paginationAutoPageSize={true}
          />
        </div>
      </CenteredHeader>
    </Container>
  );
}

export default Table;

