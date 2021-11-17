import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popover, Typography } from '@mui/material';
import { ReactComponent as LogoCircleSmall } from '../assets/logo-circle-small.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ListOfCoinPopover = props => {
  const {options, onChange, value} = props
  const [anchorEl, setAnchorEl] = useState(null);

  const onShowDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseDropdown = () => {
    setAnchorEl(null);
  };

  const onChooseItem = (itemChoose) => {
    onChange(itemChoose)
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <Button aria-describedby={id} onClick={onShowDropdown}>
        <LogoCircleSmall />
        <Typography sx={{ color: '#fff', textTransform: "capitalize" }} ml={1}>{value?.name}</Typography>
        <ArrowDropDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onCloseDropdown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ width: 120, maxWidth: '100%' }}>
          <MenuList>
            {options.map(opt => {
              return (
                <MenuItem key={opt.id} onClick={() => onChooseItem(opt)}>
                  <ListItemIcon>
                    <LogoCircleSmall />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ color: '#000' }} ml={1}>{opt.name}</Typography>
                  </ListItemText>
                </MenuItem>
              )
            })}
          </MenuList>
        </Paper>
      </Popover>
    </React.Fragment>
  );
};

ListOfCoinPopover.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default ListOfCoinPopover;