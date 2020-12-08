/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
//import styles from './Homepage.module.scss';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ItemBox } from '../../features/ItemBox/ItemBox';


class Component extends React.Component {
  render() {
    const { className, items } = this.props;

    return (
      <Container className={className}>
        <Box px={3} mt={5}>
          <Grid container spacing={1}>
            {items.map((thing) => (
              <Grid key={thing._id} item xs={12} md={3}>
                <ItemBox {...thing}></ItemBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  items: getAll(state),
});

const ComponentContainer = connect(
  mapStateToProps,
)(Component);

export {
  //Component as Homepage,
  ComponentContainer as Homepage,
  Component as HomepageComponent,
};
