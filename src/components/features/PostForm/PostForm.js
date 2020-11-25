/* eslint-disable linebreak-style */
import React, { useState/*, useEffect*/ } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addPost } from './../../../redux/postsRedux';
import { editPost } from './../../../redux/postsRedux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
//import { Link } from 'react-router-dom';
import { isLogged } from '../../../redux/userRedux.js';
import { NotFound } from '../../views/NotFound/NotFound';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { addPostRequest } from '../../../redux/postsRedux.js';

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

const PostForm = ({ addPost, type,  postId, logged, className }) => {
  state = {
    post: {
      title: '',
      location: '',
      description: '',
    },
    error: null,
  };
  updateInputValue = ({ target }) => {
    const { post } = this.state;
    const { value, name } = target;

    this.setState({ post: { ...post, [name]: value } });
  };

  submitPost = async (e) => {
    const { post } = this.state;
    const { addPost } = this.props;

    e.preventDefault();

    if (post.title && post.description && post.location) {
      await addPost(post);
      this.setState({
        post: {
          title: '',
          location: '',
          description: '',
        },
        error: null,
      });
    } else this.setState({ isError: true });
  };
  
  const classes = withStyles();
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ photo, setPhoto ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone] = useState('');
  const [ location, setLocation ] = useState('');

  /*useEffect((editPost) => {
    if(type === 'edit') {
      console.log(postId);
      // trzeba pobrac całą zawartosc postu o postId i jego wartośći przypisać do naszych stałych ze stanu, author, title itd.
    }
  }, []);*/

  const handleSubmit = e => {
    e.preventDefault();

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
      status: 'closed',
    };
    if(type === 'edit') editPost(postId, post);
    else addPost(post);
  };

  render() {
    const { updateInputValue } = this;
    const { classes, logged, className } = this.props;
  return (
    <div className={clsx(className, classes.root)}>
      {logged ? (
        <Paper elevation={3}>
          <Typography variant="h5" color="textSecondary" component="h2">
            Add new post
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
                component={Link}
                to={`/`}
              >
                Add post
              </Button>
            </div>
          </form>
        </Paper>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};
}

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

PostForm.propTypes = {
  addPost: PropTypes.node,
  type: PropTypes.node,
  postId: PropTypes.node,
  logged: PropTypes.bool,
  className: PropTypes.string,
  addPost: PropTypes.func,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  logged: isLogged(state),
});

export const PostAdd = withStyles(styles)(Container);

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

