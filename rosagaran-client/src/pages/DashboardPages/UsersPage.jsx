import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

import { sampleUserRows } from "./sampleUsers";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
  },
];

function UsersPage() {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#0b8685",
        minHeight: "calc(100vh - 96px)",
        borderRadius: 2,
        color: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
        Users
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Full user directory with selection enabled.
      </Typography>
      <Box
        sx={{
          height: 480,
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 2,
          border: "1px solid rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        }}
      >
        <DataGrid
          rows={sampleUserRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            bgcolor: "#fff",
            color: "text.primary",
            border: "none",
            ".MuiDataGrid-root": {
              color: "#0f172a",
            },
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
            },
            ".MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle": {
              color: "#0f172a !important",
            },
            ".MuiDataGrid-cell": {
              color: "#0f172a !important",
              borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
            },
            ".MuiDataGrid-footerContainer": {
              backgroundColor: "#f8fafc",
              borderTop: "1px solid rgba(15, 23, 42, 0.08)",
              color: "#0f172a",
            },
            ".MuiDataGrid-virtualScrollerRenderZone": {
              backgroundColor: "#fff",
            },
            ".MuiDataGrid-row.Mui-selected": {
              backgroundColor: "rgba(59, 130, 246, 0.08)",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default UsersPage;
