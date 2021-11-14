import React, { useEffect, useState } from 'react';
import {
  Box, Button,
  FormControl, FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput, Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { ReactComponent as LogoCircleSmall } from '../../assets/logo-circle-small.svg';
import BorderLinearProgress from '../../components/BorderLinearProgress';
import { formatNumber } from '../../../utils/StringUtils';

const StakingTab = props => {
  const [stakingList, setStakingList] = useState([]);

  const getDataStakingList = () => {
    setStakingList([
      {
        name: 'Juventus',
        amount: '100.5',
        avgPerYear: '10',
        total: '100000000',
      },
      {
        name: 'Barcelon',
        amount: '200.5',
        avgPerYear: '10',
        total: '150000000',
      },
      {
        name: 'Mans Un',
        amount: '240.5',
        avgPerYear: '10',
        total: '290500000',
      },
    ]);
  };
  useEffect(() => {
    getDataStakingList();
  }, []);

  const onUpdateForm = (field, value, item) => {
    let currList = [...stakingList];
    let currItem = currList.find(x => x.name === item.name);
    currItem[field] = value;
    setStakingList(currList);
  };

  return (
    <div className='form-container'>

      <div className={'form-info-header'}>
        <Grid container spacing={2}>
          <Grid item xs={5} className={'separator'}>
            <Box className={'invest-title'}>
              <Typography className='title-1'>Staking</Typography>
              <Typography className='description'>Make some profit now</Typography>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <div className={'invest-info'}>

              <div className={'progress-bar-block'}>
                <div className='progress-title'>
                  <div className='left-info'><LogoCircleSmall /> DCup</div>
                  <div className='right-info'>
                    <Typography sx={{ color: '#1FF493' }}>$15,230,000</Typography>
                    <Typography sx={{ color: '#fff' }}>/</Typography>
                    <Typography sx={{ color: '#fff' }}>$20,000,000</Typography>
                  </div>
                </div>
                <BorderLinearProgress variant='determinate' value={60} />
                <div className='progress-info'>
                  <div className={'left-info'}>60% bought</div>
                  <div className={'right-info'}>6h left</div>
                </div>
              </div>
            </div>
          </Grid>

        </Grid>
      </div>

      <div className='form-input-section'>
        <Grid container spacing={2}>
          {stakingList.map(staking => {
            return (
              <Grid item xs={12}>
                <FormControl
                  sx={{
                    width: '100%',
                    '& input': {
                      color: '#fff',
                    },
                    '& label.Mui-focused': {
                      color: '#fff',
                      marginTop: 1,
                    },
                    '& label': {
                      color: '#fff',
                      marginTop: staking?.amount ? 1 : 0,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#1FF493',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1FF493',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1FF493',
                      },
                    },
                  }}

                  variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
                  <OutlinedInput
                    onChange={(e) => {
                      onUpdateForm('amount', e.target.value, staking);
                    }}
                    value={staking.amount}
                    id='outlined-adornment-amount'
                    endAdornment={
                      <InputAdornment position='end'>
                        <Box sx={{
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          background: 'linear-gradient(0deg, #0463EF -19.46%, #36D9D1 55.07%, #5EFCA1 104.76%)',
                        }} />
                        <Typography sx={{ color: '#fff' }} ml={1}>{staking.name}</Typography>
                      </InputAdornment>
                    }

                    label='Amount'
                  />
                </FormControl>

                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={24} md={4}>
                      <Typography sx={{color: "#91A3B5"}}>Avg. per Year:</Typography>
                      <Typography sx={{color: "#fff"}}>{staking.avgPerYear}%</Typography>
                    </Grid>

                    <Grid item xs={24} md={4}>
                      <Typography sx={{color: "#91A3B5"}}>Total Staking:</Typography>
                      <Typography sx={{color: "#fff"}}>{formatNumber(staking.total)}</Typography>
                    </Grid>

                    <Grid item xs={24} md={4} sx={{display: "flex", justifyContent: "flex-end"}}>
                      <Button
                        sx={{
                          color: "#02172D",
                          backgroundColor: '#1FF493',
                          borderRadius: 12,
                          width: 115,
                          textTransform: "capitalize",

                          '&:hover': {
                            backgroundColor: '#1FF493',
                          },

                          '&.${buttonUnstyledClasses.active}': {
                            backgroundColor: ' #1FF493',
                          },

                        }}
                        variant='contained'>
                        Staking
                      </Button>
                    </Grid>

                  </Grid>
                </Box>
              </Grid>
            );

          })}

        </Grid>
      </div>

    </div>
  );
};

StakingTab.propTypes = {};

export default StakingTab;