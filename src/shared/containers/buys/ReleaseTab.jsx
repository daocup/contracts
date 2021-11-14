import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ReactComponent as LogoCircleSmall } from '../../assets/logo-circle-small.svg';
import BorderLinearProgress from '../../components/BorderLinearProgress';
import { formatDateTimeFromUnix, formatNumber } from '../../../utils/StringUtils';
import { FORMATS } from '../../../configs/constant';

const ReleaseTab = props => {

  const [tokenReleaseList, setTokenReleaseList] = useState([]);

  const getTokenReleaseList = () => {
    setTokenReleaseList([
      {
        walletAddress: 'xxx0000000000',
        link: 'bit.com/ansidk',
        progress: [
          {
            ratio: 40,
            value: 80,
          },
          {
            ratio: 30,
            value: 0,
          },
          {
            ratio: 20,
            value: 0,
          },
          {
            ratio: 10,
            value: 0,
          },
        ],
        nextRelease: '1636874955',
        purchaseTime: '1636874955',
        totalCoins: '120000000',
      },
      {
        walletAddress: 'xxx0000000001',
        link: 'bit.com/ansidk',
        progress: [
          {
            ratio: 40,
            value: 100,
          },
          {
            ratio: 30,
            value: 70,
          },
          {
            ratio: 20,
            value: 0,
          },
          {
            ratio: 10,
            value: 0,
          },
        ],
        nextRelease: '1636874955',
        purchaseTime: '1636874955',
        totalCoins: '115500000',
      },
    ]);
  };

  useEffect(() => {
    getTokenReleaseList();
  }, []);

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
          {tokenReleaseList.map(token => {
            return (
              <Grid key={token.walletAddress} item xs={12}>
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={24} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: '#91A3B5', fontSize: 14 }}>Wallet Address: </Typography>
                        <Typography sx={{ color: '#fff', ml: 1 }}>{token.walletAddress}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={24} md={6}>
                      <a href={token.link} rel={"referrer"}>
                        <Typography sx={{
                          color: '#0F79F7',
                          fontSize: 14,
                          textDecorationLine: 'underline',
                        }}>{token.link}</Typography>
                      </a>
                    </Grid>
                  </Grid>
                </Box>

                <Grid mt={1} mb={2} container spacing={1}>
                  {token.progress.map(item => {
                    return (
                      <Grid key={item.ratio} item xs={24} md={item.ratio / 10}>
                        <BorderLinearProgress variant='determinate' value={item.value} />
                        <Typography sx={{ color: '#91A3B5', textAlign: "center", fontSize: 12 }}>{item.ratio}%</Typography>
                      </Grid>
                    )
                  })}
                </Grid>

                <Box mt={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={24} md={4}>
                      <Typography sx={{ color: '#91A3B5', fontSize: 14 }}>Next Release:</Typography>
                      <Typography
                        sx={{ color: '#fff' }}>{formatDateTimeFromUnix(token.nextRelease, FORMATS.DATE_TIME_FORM)}</Typography>
                    </Grid>

                    <Grid item xs={24} md={4}>
                      <Typography sx={{ color: '#91A3B5', fontSize: 14 }}>Purchase Time:</Typography>
                      <Typography
                        sx={{ color: '#fff' }}>{formatDateTimeFromUnix(token.purchaseTime, FORMATS.DATE_TIME_FORM)}</Typography>
                    </Grid>

                    <Grid item xs={24} md={4}>
                      <Typography sx={{ color: '#91A3B5', fontSize: 14 }}>Total Coins:</Typography>
                      <Typography sx={{ color: '#fff' }}>{formatNumber(token.totalCoins)}</Typography>
                    </Grid>

                  </Grid>
                </Box>

                <Box mt={2}>
                  <Button
                    sx={{
                      color: '#02172D',
                      backgroundColor: '#1FF493',
                      borderRadius: 12,
                      width: 115,
                      height: 48,
                      fontSize: 18,
                      textTransform: 'capitalize',
                      fontWeight: "normal",
                      '&:hover': {
                        backgroundColor: '#1FF493',
                      },

                    }}
                    variant='contained'>
                    Release
                  </Button>
                </Box>
              </Grid>
            );
          })}


        </Grid>


      </div>

    </div>
  );
};

ReleaseTab.propTypes = {};

export default ReleaseTab;