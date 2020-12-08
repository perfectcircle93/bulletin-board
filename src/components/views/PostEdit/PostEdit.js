import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from './../../features/PostForm/PostForm';

import styles from './PostEdit.module.scss';

const PostEdit = ({className, match}) => (
  <div className={clsx(className, styles.root)}>
    <PostForm type="edit" id={match.params.id} />
  </div>
);

PostEdit.propTypes = {
  className: PropTypes.string,
  match:PropTypes.object,
};

export default PostEdit;
