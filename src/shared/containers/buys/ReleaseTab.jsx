import React, { useState } from 'react';
import {
  Box,
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

const ReleaseTab = props => {
  const [formData, setFormData] = useState({ willGet: '1000 + 100 bonus', amount: '0.0' });

  return (
    <div className='form-container'>

      <div className={'form-info-header'}>
        <Grid container spacing={2}>
          <Grid item xs={5} className={'separator'}>
            <Box className={'invest-title'}>
              <Typography className='title-1'>Release</Typography>
              <Typography className='description'>Release your tokens</Typography>
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
                  marginTop: formData?.willGet ? 1 : 0,
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
                  setFormData({ ...formData, amount: e.target.value });
                }}
                value={formData.amount}
                id='outlined-adornment-amount'
                endAdornment={
                  <InputAdornment position='end'>
                    <Box sx={{
                      width: 24,
                      height: 24,
                      background: 'linear-gradient(0deg, #0463EF -19.46%, #36D9D1 55.07%, #5EFCA1 104.76%)',
                    }} />
                    <Typography sx={{ color: '#fff' }} ml={1}>Juventus</Typography>
                  </InputAdornment>
                }

                label='Amount'
              />
            </FormControl>
          </Grid>

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
                  marginTop: formData?.willGet ? 1 : 0,
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
              <InputLabel htmlFor='outlined-adornment-you_will_get'>You will get</InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setFormData({ ...formData, willGet: e.target.value });
                }}
                value={formData.willGet}
                id='outlined-adornment-you_will_get'
                endAdornment={
                  <InputAdornment position='end'>
                    <LogoCircleSmall />
                    <Typography sx={{ color: '#fff' }} ml={1}>DCup</Typography>
                  </InputAdornment>
                }

                label='You will get'
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <div className='form-time-section'>
        <RadioGroup
          aria-label='gender'
          defaultValue='female'
          name='radio-buttons-group'
          row
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControlLabel sx={{ color: '#fff' }} value='3m' control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
                color: '#1FF493',
                '&.Mui-checked': {
                  color: '#1FF493',
                },
              }} />} label='3 months 10% Bonus' />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel sx={{ color: '#fff' }} value='6m' control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
                color: '#1FF493',
                '&.Mui-checked': {
                  color: '#1FF493',
                },
              }} />} label='6 months 20% Bonus' />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel sx={{ color: '#fff' }} value='12m' control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
                color: '#1FF493',
                '&.Mui-checked': {
                  color: '#1FF493',
                },
              }} />} label='12 months 50% Bonus' />
            </Grid>
          </Grid>
        </RadioGroup>
      </div>

      <Box sx={{ mt: 2 }} className='form-footer'>
        <button className={'btn-swap-now'}>Swap Now</button>
      </Box>
    </div>
  );
};

ReleaseTab.propTypes = {};

export default ReleaseTab;