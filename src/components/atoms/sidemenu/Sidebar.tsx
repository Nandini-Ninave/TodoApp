import {  styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';

const drawerWidth = 200;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 2,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          p:2,
          overflow: 'auto',
          height: '150%',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexDirection: 'column',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color:'black',
          background:'lightgrey'
        }}
      >
       <MenuContent />
      </Box>
       
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1.5,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default',

        }}
      >
      </Stack>
      
    </Drawer>

  );
}

export default Sidebar