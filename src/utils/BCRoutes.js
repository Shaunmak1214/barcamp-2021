import React from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGOUT } from '../reducers/authSlice';

import * as Comp from '../components';
import axios from 'axios';

import { API_URL } from '../constants/';

class BCRoutes extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      component: PropTypes.any,
      cta: PropTypes.bool,
      header: PropTypes.bool,
      transparency: PropTypes.string,
      protected: PropTypes.bool,
      accessDateRange: PropTypes.array,
      protectLevel: PropTypes.number,
      isAuthenticated: PropTypes.bool,
      accessToken: PropTypes.string,
      token: PropTypes.string,
      LOGOUT: PropTypes.func,
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(`${API_URL}auth/check`, {
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 204 || res.status === 203) {
          return;
        } else {
          this.props.LOGOUT();
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.LOGOUT();
      });
  }

  render() {
    const Component = this.props.component;
    const Header = this.props.header;
    const Transparency = this.props.transparency;
    const Cta = this.props.cta;
    const isAuthenticated = this.props.isAuthenticated;
    const permissionLevel = isAuthenticated
      ? jwt_decode(this.props.accessToken).permissionFlags
      : 0;
    var dateNow = new Date().getTime();
    var from = new Date(this.props.accessDateRange[0]).getTime();
    var to = new Date(this.props.accessDateRange[1]).getTime();

    if (
      this.props.accessDateRange[0] !== '' &&
      this.props.accessDateRange[1] !== ''
    ) {
      if (!(dateNow >= from && dateNow <= to)) {
        return <Redirect to="/" />;
      }
    }

    if (this.props.protected === true && !isAuthenticated) {
      return <Redirect to="/login" />;
    } else {
      if (
        this.props.protected === true &&
        permissionLevel < this.props.protectLevel
      ) {
        return <Redirect to="/update-profile" />;
      } else {
        return (
          <>
            {Header && <Comp.Header cta={Cta} type={Transparency} />}
            <Component />
            <Comp.Footer />
          </>
        );
      }
    }
  }
}

BCRoutes.defaultProps = {
  protectLevel: 2,
  accessDateRange: ['', ''],
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(LOGOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BCRoutes);
