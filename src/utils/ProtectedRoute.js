import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGOUT } from '../reducers/authSlice';
import axios from 'axios';
// import Auth_Expired from './Auth_Expired';
import { API_URL } from '../constants/index';

class ProtectedRoute extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      token: PropTypes.string,
      isAuthenticated: PropTypes.bool,
      component: PropTypes.any,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      jwtExpired: false,
    };
    const MINUTE_MS = 5000;
    const loggedin_checker = setInterval(() => {
      axios
        .get(`${API_URL}auth/`, {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
          if (this.state.jwtExpired === true) {
            return null;
          } else {
            this.setState({ jwtExpired: true });
          }
        });
      return () => clearInterval(loggedin_checker);
    }, MINUTE_MS);
  }

  render() {
    const Component = this.props.component;
    const isAuthenticated = this.props.isAuthenticated;
    if (isAuthenticated) {
      return (
        <>
          {/* <Auth_Expired expired={this.state.jwtExpired} /> */}
          <Component />
        </>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(LOGOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
