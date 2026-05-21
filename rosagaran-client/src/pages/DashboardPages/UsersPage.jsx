import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const emptyUser = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState(emptyUser);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser(emptyUser);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: "" });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    try {
      const payload = { ...newUser, type: newUser.type.toLowerCase() };

      if (isEditing) {
        if (!payload.password) {
          delete payload.password;
        }
        await updateUser(editUserId, payload);
      } else {
        await createUser(payload);
      }

      loadUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      loadUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "age", headerName: "Age", flex: 1, sortable: true },
    { field: "gender", headerName: "Gender", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "type", headerName: "Type", flex: 1, sortable: true },
    { field: "contactNumber", headerName: "Contact", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" size="small" onClick={() => handleEdit(params.row._id)}>
            Edit
          </Button>
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
            color="primary"
          />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4" fontWeight="bold">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: 1000,
          }}
        >
          Add User
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>
          <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
            <FormControl fullWidth variant="standard">
              <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter first name"
                  variant="standard"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
              </Box>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter last name"
                variant="standard"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter age"
                variant="standard"
                value={newUser.age}
                onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              />
            </Box>

            <Stack direction="row" sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={newUser.gender}
                  onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                  label="Gender"
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter mobile"
                variant="standard"
                value={newUser.contactNumber}
                onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter address"
                variant="standard"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter email"
                variant="standard"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Box>

            <Stack direction="row" sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <InputLabel>Type</InputLabel>
                <Select
                  value={newUser.type}
                  onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                  label="Type"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter username"
                variant="standard"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <TextField
                  fullWidth
                  label="Enter password"
                  variant="standard"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </FormControl>
            </Box>

            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSaveUser}>
                {isEditing ? "Save Changes" : "Add"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 400, width: "100%", mt: 3 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pagination
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default UsersPage;
