import React from 'react';
import PropTypes from 'prop-types';
import * as Comp from '../components';

class BCRoutes extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      component: PropTypes.any,
      header: PropTypes.bool,
      transparency: PropTypes.string,
    };
  }
  constructor(props) {
    super(props);
  }

  render() {
    const Component = this.props.component;
    const Header = this.props.header;
    const Transparency = this.props.transparency;
    return (
      <>
        {Header && <Comp.Header type={Transparency} />}
        <Component />
      </>
    );
  }
}

export default BCRoutes;
