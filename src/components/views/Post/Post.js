import React from 'react';
import PropTypes from 'prop-types';
//import clsx from 'clsx';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
//import styles from './Post.module.scss';
import { connect } from 'react-redux';
import { getById } from '../../../redux/postsRedux.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { isLogged } from '../../../redux/userRedux.js';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: 340,
    maxHeight: 1000,
    display: 'flex',
  },
  media: {
    width: '50%',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Component = ({
  _id,
  title,
  photo,
  description,
  author,
  date_publ,
  location,
  email,
  phone,
  logged,
}) => {
  const classes = useStyles();

  return (_id) ? (
    <Container>
      <Box px={3} mt={5}>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={photo} title={title} />
          <Box className={classes.description}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {description}
                </Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="body1" color="textSecondary" component="p">
                  Location: <b>{location}</b>
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Published <b>{date_publ.slice(0, 10)}</b> by: <b>{author}</b>
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Email: <b>{email}</b>
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Phone: <b>{phone}</b>
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              {logged && (
                <div>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/post/${_id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </div>
              )}
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Container>
  ) : null;
};

Component.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  photo: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  date_publ: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  _id: PropTypes.string,
  logged: PropTypes.bool,
};

const mapStateToProps = (state, props) => {
  const post = getById(state, props.match.params.id);

  return {
    ...post,
    logged: isLogged(state),
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ComponentContainer = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  ComponentContainer as Post,
  Component as PostComponent,
};
