import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';

import styles from './Table.module.scss';

const columns = [
  {
    field: 'first',
    headerName: 'First',
    minWidth: 140,
    flex: 1,
    headerClassName: styles.test
  },
  {
    field: 'last',
    headerName: 'Last',
    minWidth: 140,
    flex: 1,
    headerClassName: styles.test
  },
];

const initialRows = [
  {
    id: 1,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 2,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 3,
    first: 'Gill',
    last: 'Martin',
  },
];

export default function RowContextMenu() {
  const [rows, setRows] = React.useState(initialRows);
  const [selectedRow, setSelectedRow] = React.useState();

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute('data-id')));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const convertToUppercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        console.log(row.id, selectedRow)
        return {
          ...row,
          first: row.first.toUpperCase(),
          last: row.last.toUpperCase(),
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  const convertToLowercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return {
          ...row,
          first: row.first.toLowerCase(),
          last: row.last.toLowerCase(),
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  const deleteRow = () => {
    const newRows = [...rows].filter((el) => el.id !== selectedRow);
    setRows(newRows);
    handleClose();
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        sx={{
          "& .MuiDataGrid-cell": {
            outline: "1px solid lightgray",
            // borderRadius: "5px",
            backgroundColor: "white",
            // width: "calc(100% - 2px)",
            // marginTop: 3
            },
        }}
        slotProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: 'context-menu' },
          },

        }}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        slotProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
      >
        {/*<MenuItem onClick={convertToUppercase}></MenuItem>*/}

        <MenuItem onClick={convertToUppercase} disableRipple>
          <EditIcon />
          Edit (UP)
        </MenuItem>
        <Divider />
        <MenuItem onClick={convertToLowercase}>lowercase</MenuItem>
        <MenuItem onClick={deleteRow}>delete</MenuItem>
      </Menu>
    </div>
  );
}
