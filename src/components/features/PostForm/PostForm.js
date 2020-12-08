/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addPost, getById } from './../../../redux/postsRedux';
import { editPost } from './../../../redux/postsRedux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { isLogged } from '../../../redux/userRedux.js';
import { NotFound } from '../../views/NotFound/NotFound';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { addPostRequest, editPostRequest } from '../../../redux/postsRedux.js';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(5),
      width: '50%',
      padding: theme.spacing(2),
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '70%',
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
});

const PostForm = ({ addPost, type, post, logged, className, editPost }) => {
    
  const classes = withStyles();
  const history = useHistory();
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ photo, setPhoto ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone] = useState('');
  const [ location, setLocation ] = useState('');
  const [ id, setId ] = useState('');

  useEffect(() => {
    console.log('WLACZAMY USE EFFECT', type, post);
    if(type === 'edit' && post && !post.error) {
      setAuthor(post.author);
      setTitle(post.title);
      setDescription(post.description);
      setPhoto(post.photo);
      setEmail(post.email);
      setLocation(post.location);
      setPhoto(post.email);
      setId(post._id);
    }
  }, [post]);

  const handleSubmit = e => {
    e.preventDefault();

    if(type === 'edit') {
      console.log('EDIT!');
      const post = {
        _id: id,
        author,
        title,
        description,
        photo,
        email,
        phone,
        location,
        date_act: new Date(),
      };
      editPost(post);
    } else {
      const post = {
        _id: uuidv4,
        author,
        title,
        description,
        photo,
        email,
        phone,
        location,
        date_publ: new Date(),
        date_act: new Date(),
        status: 'published',
      };
      addPost(post);
    }
  
    history.push('/');
  };

  return (
    <div className={clsx(className, classes.root)}>
      {logged ? (
        <Paper elevation={3}>
          <Typography variant="h5" color="textSecondary" component="h2">
            { type === 'edit' ? 'Edit post' : 'Add new post' }
          </Typography>
          <form noValidate onSubmit={handleSubmit} autoComplete="off">
            <div className={classes.form}>
            
              <TextField label="Author" value={author} onChange={event => setAuthor(event.target.value)} />
            
              <TextField label="Title" value={title} onChange={event => setTitle(event.target.value)}/>
            
              <TextField label="Description" value={description} onChange={event => setDescription(event.target.value)} multiline
                rows="10"/>
            
              <TextField label="Photo" value={photo} onChange={event => setPhoto(event.target.value)}/>
            
              <TextField label="Email" value={email} onChange={event => setEmail(event.target.value)}/>
            
              <TextField label="Phone" value={phone} onChange={event => setPhone(event.target.value)}/>
            
              <TextField label="Location" value={location} onChange={event => setLocation(event.target.value)}/>
            
              <Button
                type="submit"
                size="medium"
                color="primary"
                variant="contained"
                to={`/`}
              >
                { type === 'edit' ? 'Edit post' : 'Add post' }
              </Button>
            </div>
          </form>
        </Paper>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );

}

PostForm.propTypes = {
  addPost: PropTypes.node,
  type: PropTypes.node,
  postId: PropTypes.node,
  logged: PropTypes.bool,
  className: PropTypes.string,
  editPost: PropTypes.func,
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPostRequest(post)),
  editPost: post => dispatch(editPostRequest(post)),
});

const mapStateToProps = (state, props) => ({
  logged: isLogged(state),
  post: getById(state, props.id),
});

export const PostAdd = withStyles(styles)(Container);

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

