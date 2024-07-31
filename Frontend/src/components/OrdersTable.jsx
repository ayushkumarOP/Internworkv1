import React, { useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; 
import DeleteOrderRenderer from './Renderers/DeleteOrderRenderer';
import OrderCellrenderer from './Renderers/OrderCellrenderer';
const backendUrl = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  margin-top: 6%;
  margin-left: 18%;
`;

const CenteredHeader = styled.div`
  .ag-header-cell-label {
    justify-content: center;
  }
`;

const DeleteOrderCellRenderer = (params) => {
  return (
    <DeleteOrderRenderer {...params} />
  );
};

const OrdersTable = () => {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const [colDefs, setColDefs] = useState([
    { 
      headerName: "S.No", 
      valueGetter: "node.rowIndex + 1", 
      flex: 1 
    },
    { 
      headerName: "Total", 
      field: "total", 
      editable: true, 
      flex: 2 
    },
    {
      headerName: 'Delivered',
      flex: 2,
      cellRenderer: OrderCellrenderer,
    },
    {
      headerName: 'Cancel Order',
      flex: 2,
      cellRenderer: DeleteOrderCellRenderer,
    },
  ]);

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  }

  const onGridReady = (params) => {
    console.log("grid is ready");
    fetch(`${backendUrl}/api/orders/alldata`)
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
    floatingFilter: true,
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

export default OrdersTable;

