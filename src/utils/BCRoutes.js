import React from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGOUT } from '../reducers/authSlice';

import * as Comp from '../components';

class BCRoutes extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      component: PropTypes.any,
      cta: PropTypes.bool,
      header: PropTypes.bool,
      transparency: PropTypes.string,
      protected: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
      accessToken: PropTypes.string,
      protectLevel: PropTypes.number,
      token: PropTypes.string,
    };
  }
  constructor(props) {
    super(props);
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
          </>
        );
      }
    }
  }
}

BCRoutes.defaultProps = {
  protectLevel: 2,
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
