import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { getCurrentUser, signOut } from "../auth/auth";

const drawerWidth = 240;

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
    roles: ["admin"],
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0b8685",
  color: "#fff",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const normalizePath = (pathname) => pathname.replace(/\/$/, "") || "/";

const getPageTitle = (pathname) => {
  const p = normalizePath(pathname);
  return dashboardNavItems.find(({ to }) => normalizePath(to) === p)?.title ?? "Welcome";
};

const isNavActive = (to, pathname) => normalizePath(pathname) === normalizePath(to);

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const visibleNavItems = dashboardNavItems.filter(
    (item) => !item.roles || item.roles.includes(currentUser?.type)
  );
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    signOut();
    navigate("/auth/signin");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            edge="start"
            sx={{ marginRight: 5 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, opacity: 0.85 }}>
            {currentUser?.firstName} ({currentUser?.type})
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ textTransform: "uppercase" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {visibleNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={isNavActive(to, location.pathname)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
