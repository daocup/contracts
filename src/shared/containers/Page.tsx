import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

const Page = props => {
  const {title, children} = props
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </React.Fragment>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
};

export default Page;
