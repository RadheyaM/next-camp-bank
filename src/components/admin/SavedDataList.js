import * as React from "react";
import s from "./SavedDataList.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const SavedDataList = ({ filenames }) => {
  const day = filenames[0].slice(13, 15);
  const month = filenames[0].slice(10, 12);
  console.log("day", day, "month", month);
  console.log("filenames:", filenames);
  return (
    <List>
      {filenames &&
        filenames.map((file) => {
          return (
            <ListItem id={file}>
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={file}
                secondary={`Most recent save from ${file.slice(13, 15)}/${file.slice(
                  10,
                  12
                )}/${file.slice(5, 9)}`}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default SavedDataList;
