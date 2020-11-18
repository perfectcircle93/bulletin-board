import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from './../../features/PostForm/PostForm';

import styles from './PostAdd.module.scss';

const PostAdd = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>PostAdd</h2>
    <PostForm />
  </div>
);

PostAdd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostAdd;
