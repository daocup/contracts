import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel, Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup, Typography,
} from '@mui/material';
import BorderLinearProgress from '../components/BorderLinearProgress';
import { ReactComponent as LogoCircleSmall } from '../assets/logo-circle-small.svg';

const BuyDCupSection = props => {

  const [formData, setFormData] = useState({ willGet: '1000 + 100 bonus', amount: '0.0' });
  const [tabActive, setTabActive] = useState(null);
  const onChangeTab = (item) => {
    setTabActive(item);
  };
  return (
    <div className={'section'}>
      <div className={'main-content'}>

        <div className={'tab-bar'}>
          <div className={`button-tab-item ${tabActive === 'invest' && 'active'}`}
               onClick={() => onChangeTab('invest')}>Invest
          </div>
          <div className={`button-tab-item ${tabActive === 'staking' && 'active'}`}
               onClick={() => onChangeTab('staking')}>Staking
          </div>
          <div className={`button-tab-item ${tabActive === 'release' && 'active'}`}
               onClick={() => onChangeTab('release')}>Release
          </div>
        </div>

        <div className={'tab-content'}>
          {tabActive === 'invest' && (
            <div className='form-container'>

              <div className={'form-info-header'}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box className={'invest-title'}>
                      <Typography className='title-1'>Invest</Typography>
                      <Typography className='description'>Buy tokens instantly</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1}>
                    <Box className={'separator'} />
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
                            <LogoCircleSmall />
                            <Typography sx={{ color: '#fff' }} ml={1}>xDAI</Typography>
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

              <Box sx={{mt: 2}} className='form-footer'>
                <button className={'btn-swap-now'}>Swap Now</button>
              </Box>
            </div>
          )}

          {tabActive === 'staking' && (
            <div className='form-container'>

            </div>
          )}

          {tabActive === 'release' && (
            <div className='form-container'>

            </div>
          )}
        </div>
      </div>
    </div>

  );
};

BuyDCupSection.propTypes = {};

export default BuyDCupSection;