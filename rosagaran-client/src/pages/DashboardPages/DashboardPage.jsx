import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { sampleUserRows, averageAge } from "./sampleUsers";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
  },
];

function DashboardPage() {
  const rows = sampleUserRows;
  const avgAge = averageAge(rows);

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
        Dashboard
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
        display="flex"
      >
        <Card
          sx={{
            minWidth: 200,
            bgcolor: "#fff",
            color: "text.primary",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            minWidth: 200,
            bgcolor: "#fff",
            color: "text.primary",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Average Age
            </Typography>
            <Typography variant="h4">{avgAge.toFixed(1)}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Card
          sx={{
            flex: 1,
            minWidth: 0,
            bgcolor: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            p: 2,
          }}
        >
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: "Series 1" },
              { data: [51, 6, 49, 30], label: "Series 2" },
            ]}
            height={290}
            xAxis={[
              {
                data: ["Q1", "Q2", "Q3", "Q4"],
                scaleType: "band",
                label: "Quarters",
              },
            ]}
          />
        </Card>
        <Card
          sx={{
            flexShrink: 0,
            bgcolor: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            p: 2,
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 20, label: "20", color: "#f44336" },
                  { id: 1, value: 10, label: "10", color: "#2196f3" },
                  { id: 2, value: 15, label: "15", color: "#ff9800" },
                ],
              },
            ]}
            width={240}
            height={240}
          />
        </Card>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>
      <Box
        sx={{
          height: 400,
          width: "100%",
          mb: 2,
          bgcolor: "#fff",
          borderRadius: 2,
          border: "1px solid rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
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

export default DashboardPage;
