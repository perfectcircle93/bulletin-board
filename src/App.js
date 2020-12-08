import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPublished } from './redux/postsRedux.js';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import MainLayout from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import PostEdit from './components/views/PostEdit/PostEdit';
import PostAdd from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#41005b',
    },
    secondary: {
      main: '#376ae3',
    },
  },
});

const App = ({ fetchPublishedPosts }) => {

  useEffect(() => {
    fetchPublishedPosts();
  }, []);
  
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/post/add" component={PostAdd} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/post/edit/:id" component={PostEdit} />
              <Route path="*" component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

export default connect(null, mapDispatchToProps)(App);
