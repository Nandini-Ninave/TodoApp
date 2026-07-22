import { Link } from 'react-router'; // or 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function MenuContent() {
  const menuItems = [
    { text: 'All Todos', path: '/' },
    { text: 'Today', path: '/today' },
    { text: 'In Progress', path: '/settings' },
    { text: 'Completed', path: '/settings' }
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
