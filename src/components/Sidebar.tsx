import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

interface MenuItemContentProps {
  icon: React.ReactNode;
  text: string;
}

const Sidebar: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const handleToggleSubMenu = () => {
    setOpenSubMenu((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const drawerWidth = isCollapsed ? 64 : 240;

  const MenuItemContent = ({ icon, text }: MenuItemContentProps) => (
    <>
      <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : '24px' }}>
        {icon}
      </ListItemIcon>
      {!isCollapsed && (
        <ListItemText 
          primary={text} 
          sx={{ 
            marginLeft: '8px',
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }} 
        />
      )}
    </>
  );

  const commonListItemStyles = {
    '&:hover': { backgroundColor: '#f0f0f0' },
    mx: 0.5,
    my: 0.5,
    borderRadius: 2,
    width: 'auto',
    minHeight: '48px',
    padding: '6px 8px',
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <div>
        <Typography variant="h6" sx={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!isCollapsed && 'Dashboard'}
          <IconButton onClick={handleToggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Typography>
        
        <Divider />
        <List sx={{ px: 1 }}>
          <Tooltip title={isCollapsed ? "Dashboard" : ""} placement="right">
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                ...commonListItemStyles,
                backgroundColor: location.pathname === '/' ? '#e0e0e0' : 'transparent',
              }}
            >
              <MenuItemContent icon={<HomeIcon />} text="Dashboard" />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={isCollapsed ? "Reembolso" : ""} placement="right">
            <ListItemButton
              onClick={isCollapsed ? () => navigate('/refund') : handleToggleSubMenu}
              sx={{
                ...commonListItemStyles,
                backgroundColor: location.pathname.startsWith('/refund') ? '#e0e0e0' : 'transparent',
              }}
            >
              <MenuItemContent icon={<DescriptionRoundedIcon />} text="Reembolso" />
              {!isCollapsed && (openSubMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItemButton>
          </Tooltip>

          <Collapse in={openSubMenu && !isCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title={isCollapsed ? "Descargar PDF" : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to="/download"
                  sx={{
                    ...commonListItemStyles,
                    backgroundColor: location.pathname === '/download' ? '#e0e0e0' : 'transparent',
                    pl: 4,
                  }}
                >
                  <MenuItemContent icon={<DownloadRoundedIcon />} text="Descargar PDF" />
                </ListItemButton>
              </Tooltip>

              <Tooltip title={isCollapsed ? "Cargar Reembolso" : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to="/charge-refund"
                  sx={{
                    ...commonListItemStyles,
                    backgroundColor: location.pathname === '/charge-refund' ? '#e0e0e0' : 'transparent',
                    pl: 4,
                  }}
                >
                  <MenuItemContent icon={<FileUploadRoundedIcon />} text="Cargar Reembolso" />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;