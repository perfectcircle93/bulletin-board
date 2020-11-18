/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Header from '../Header/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    height: '100%',
    padding: theme.spacing(4),
  },
}));

const MainLayout = ({ className, children }) => {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      <Header />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MainLayout;
