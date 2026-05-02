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
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Full user directory with selection enabled.
      </Typography>
      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={sampleUserRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default UsersPage;
