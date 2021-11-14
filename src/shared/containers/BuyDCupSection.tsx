import React, { useState } from 'react';
import InvestTab from './buys/InvestTab';
import StakingTab from './buys/StakingTab';
import ReleaseTab from './buys/ReleaseTab';

const BuyDCupSection = props => {

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
            <InvestTab />
          )}

          {tabActive === 'staking' && (
            <StakingTab />
          )}

          {tabActive === 'release' && (
            <ReleaseTab />
          )}
        </div>
      </div>
    </div>

  );
};

BuyDCupSection.propTypes = {};

export default BuyDCupSection;