import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from './../../features/PostForm/PostForm';

import styles from './PostEdit.module.scss';

const PostEdit = ({className, children, match}) => (
  <div className={clsx(className, styles.root)}>
    <h2>PostAdd</h2>
    <PostForm type="edit" postId={match.params.id} />
  </div>
);

PostEdit.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostEdit;
