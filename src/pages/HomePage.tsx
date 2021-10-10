import React, { useEffect } from 'react';
import HeaderMenu from '../shared/containers/HeaderMenu';
import Page from '../shared/containers/Page';
import BuyDCupSection from '../shared/containers/BuyDCupSection';
import HALO_EFFECT from 'vanta/dist/vanta.halo.min'

const HomePage = props => {

  useEffect(() => {
    HALO_EFFECT({
      el: '#page-wrap',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00
    })
  }, [])

  return (
    <Page title={"Buy DCup | DAO Cup"}>
      <div id={'page-wrap'} className={'homepage'}>
        <HeaderMenu />
        <BuyDCupSection />
      </div>
    </Page>
  );
};

HomePage.propTypes = {

};

export default HomePage;
