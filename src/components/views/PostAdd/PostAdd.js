import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from './../../features/PostForm/PostForm';

import styles from './PostAdd.module.scss';

const PostAdd = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <PostForm />
  </div>
);

PostAdd.propTypes = {
  className: PropTypes.string,
};

export default PostAdd;
