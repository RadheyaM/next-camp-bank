import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from './List.module.css'


const MyList = () => {
  return (
    <List className={styles.myList}>
      <ListSubheader>Campers</ListSubheader>
      <ListItemButton>
        <ListItemText primary="Sent mail" className={styles.listItemText}/>
      </ListItemButton>
    </List>
  )
};

export default MyList;