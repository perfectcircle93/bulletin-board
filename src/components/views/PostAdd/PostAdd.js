import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from './../../features/PostForm/PostForm';

import styles from './PostAdd.module.scss';

const PostAdd = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <PostForm />
  </div>
);

PostAdd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostAdd;
