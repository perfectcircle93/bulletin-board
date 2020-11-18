/* eslint-disable linebreak-style */
import React, { useState/*, useEffect*/ } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addPost } from './../../../redux/postsRedux';
import { editPost } from './../../../redux/postsRedux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const PostForm = ({ addPost, type,  postId }) => {
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

  return (
    <form noValidate onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField label="Author" value={author} onChange={event => setAuthor(event.target.value)} />
      </div>
      <div>
        <TextField label="Title" value={title} onChange={event => setTitle(event.target.value)}/>
      </div>
      <div>
        <TextField label="Description" value={description} onChange={event => setDescription(event.target.value)}/>
      </div>
      <div>
        <TextField label="Photo" value={photo} onChange={event => setPhoto(event.target.value)}/>
      </div>
      <div>
        <TextField label="Email" value={email} onChange={event => setEmail(event.target.value)}/>
      </div>
      <div>
        <TextField label="Phone" value={phone} onChange={event => setPhone(event.target.value)}/>
      </div>
      <div>
        <TextField label="Location" value={location} onChange={event => setLocation(event.target.value)}/>
      </div>
      <Button type="submit">Add post</Button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

PostForm.propTypes = {
  addPost: PropTypes.node,
  type: PropTypes.node,
  postId: PropTypes.node,
};

export default connect(null, mapDispatchToProps)(PostForm);
