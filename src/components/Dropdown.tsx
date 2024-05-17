import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteSetups, getSetups, postSetup } from '../api/Setup';

export default function PositionedMenu() {
  const [setups, setSetups] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    getSetups().then((setups) => {
      setSetups(setups.data);
    });
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePost = () => {
    postSetup();
  };

  const handleDelete = (setupId: number) => {
    deleteSetups(setupId);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ fontSize: '1vw' }}
      >
        셋업 목록
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {setups &&
          setups.map((setup) => (
            <MenuItem onClick={handleClose} style={{ width: '10vw' }}>
              {setup.setupName}
              <Button onClick={() => handleDelete(setup.id)}>삭제</Button>
            </MenuItem>
          ))}
      </Menu>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handlePost}
        style={{ fontSize: '1vw' }}
      >
        셋업 만들기
      </Button>
    </div>
  );
}
