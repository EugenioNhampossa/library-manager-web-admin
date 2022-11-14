import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import { AG_GRID_LOCALE_PT_BR } from "./LocaleText";
import { Button, Confirm, Input, Segment } from "semantic-ui-react";
import { useState } from "react";

interface dataTableType {
  dataSource: any;
  columns: any;
}

let gridApi: any;
const onGridReady = (params: any) => {
  gridApi = params.api;
};

const onExportClick = () => {
  gridApi.exportDataAsCsv();
};

const onFilterTextChange = (event: any) => {
  gridApi.setQuickFilter(event.target.value);
};

export function DataTable({ dataSource, columns }: dataTableType) {
  const defaultColumnDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <Segment
        clearing
        basic
        style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
      >
        <Input
          type="search"
          onChange={onFilterTextChange}
          icon="search"
          placeholder="Pesquisa..."
        />
        <Button
          onClick={() => setOpenConfirm(true)}
          icon="external"
          basic
          floated="right"
          content="Exportar"
        />
      </Segment>
      <Confirm
        size="mini"
        open={openConfirm}
        content="Deseja exportar essa tabela?"
        onCancel={(e) => setOpenConfirm(false)}
        onConfirm={(e) => onExportClick()}
      />
      <div className="ag-theme-material" style={{ height: "90%" }}>
        <AgGridReact
          rowData={dataSource}
          columnDefs={columns}
          defaultColDef={defaultColumnDef}
          pagination={true}
          localeText={AG_GRID_LOCALE_PT_BR}
          paginationAutoPageSize={true}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
}
