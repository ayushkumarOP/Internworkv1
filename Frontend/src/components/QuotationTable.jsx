import React, { useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; 
import DeleteQuotationRenderer from './Renderers/DeleteQuotationRenderer';
import quotationCellrenderer from './Renderers/quotationCellrenderer';
import PDFRenderer from './Renderers/PDFRenderer';


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

const DeleteQuotationCellRenderer = (params) => {
  return (
      <DeleteQuotationRenderer {...params} />
  );
};

const PDFCellRenderer = (params) => {
  return (
      <PDFRenderer {...params} />
  );
};

const QuotationTable = () => {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const [colDefs, setColDefs] = useState([
    { headerName: "Name", field: "billingDetails.fullName", flex: 2 },
    { headerName: "Email", field: "billingDetails.email", flex: 2 },
    { headerName: "Country", field: "billingDetails.country", editable: true, flex: 2 },
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
      cellRenderer: quotationCellrenderer,
    },
    {
      headerName: 'Delete User',
      flex: 2,
      cellRenderer: DeleteQuotationCellRenderer,
    },
    {
      headerName: 'Download PDF',
      flex: 2,
      cellRenderer: PDFCellRenderer,
    },
  ]);

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  }
  const backendUrl = process.env.REACT_APP_BASE_URL;

  const onGridReady = (params) => {
    console.log("grid is ready");
    fetch(`${backendUrl}/api/quotation/alldata`)
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

export default QuotationTable;

