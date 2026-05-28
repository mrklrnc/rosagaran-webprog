import React, { useEffect, useMemo, useState } from "react";
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
  InputAdornment,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";
import { validateUserForm } from "../../utils/userValidation";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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
    setFormError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    setFormError("");
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: "" });
      setEditUserId(id);
      setIsEditing(true);
      setFormError("");
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    const validationErrors = validateUserForm(newUser, { requirePassword: !isEditing });
    const firstError = Object.values(validationErrors)[0];

    if (firstError) {
      setFormError(firstError);
      return;
    }

    try {
      setFormError("");
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
      setFormError(error.response?.data?.message || "Error saving user. Please check the form and try again.");
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

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        [user.firstName, user.lastName, user.email, user.username].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query)
        );

      const matchesRole = roleFilter === "all" || user.type === roleFilter;
      const matchesGender = genderFilter === "all" || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [genderFilter, roleFilter, searchTerm, statusFilter, users]);

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
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      valueGetter: (value, row) => (row.isActive ? "Active" : "Inactive"),
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          size="small"
          color={params.row.isActive ? "success" : "default"}
          variant={params.row.isActive ? "filled" : "outlined"}
          sx={{ fontWeight: 600 }}
        />
      ),
    },
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
        sx={{
          marginBottom: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Stack spacing={2} sx={{ flex: 1, minWidth: 280 }}>
          <Typography variant="h4" fontWeight="bold">
            Users
          </Typography>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by first name, last name, email, or username"
            size="small"
            sx={{ maxWidth: 460 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ maxWidth: 900 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Role</InputLabel>
              <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Gender</InputLabel>
              <Select value={genderFilter} label="Gender" onChange={(e) => setGenderFilter(e.target.value)}>
                <MenuItem value="all">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
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
            {formError && (
              <Typography color="error" variant="body2">
                {formError}
              </Typography>
            )}
            <FormControl fullWidth variant="standard">
              <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter first name"
                  variant="standard"
                  value={newUser.firstName}
                  onChange={(e) => {
                    setNewUser({ ...newUser, firstName: e.target.value });
                    setFormError("");
                  }}
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
                onChange={(e) => {
                  setNewUser({ ...newUser, lastName: e.target.value });
                  setFormError("");
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter age"
                variant="standard"
                value={newUser.age}
                error={Boolean(formError && /age/i.test(formError))}
                helperText={/age/i.test(formError) ? formError : " "}
                onChange={(e) => {
                  setNewUser({ ...newUser, age: e.target.value });
                  setFormError("");
                }}
              />
            </Box>

            <Stack direction="row" sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={newUser.gender}
                  onChange={(e) => {
                    setNewUser({ ...newUser, gender: e.target.value });
                    setFormError("");
                  }}
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
                error={Boolean(formError && /contact number/i.test(formError))}
                helperText={/contact number/i.test(formError) ? formError : " "}
                onChange={(e) => {
                  setNewUser({ ...newUser, contactNumber: e.target.value });
                  setFormError("");
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter address"
                variant="standard"
                value={newUser.address}
                onChange={(e) => {
                  setNewUser({ ...newUser, address: e.target.value });
                  setFormError("");
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Enter email"
                variant="standard"
                value={newUser.email}
                onChange={(e) => {
                  setNewUser({ ...newUser, email: e.target.value });
                  setFormError("");
                }}
              />
            </Box>

            <Stack direction="row" sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <InputLabel>Type</InputLabel>
                <Select
                  value={newUser.type}
                  onChange={(e) => {
                    setNewUser({ ...newUser, type: e.target.value });
                    setFormError("");
                  }}
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
                error={Boolean(formError && /username/i.test(formError))}
                helperText={/username/i.test(formError) ? formError : " "}
                onChange={(e) => {
                  setNewUser({ ...newUser, username: e.target.value });
                  setFormError("");
                }}
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
                  error={Boolean(formError && /password/i.test(formError))}
                  helperText={/password/i.test(formError) ? formError : " "}
                  onChange={(e) => {
                    setNewUser({ ...newUser, password: e.target.value });
                    setFormError("");
                  }}
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
          rows={filteredUsers}
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
