import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillMount() {
    this.props.logout();
    this.context.router.push('/');
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, actions)(Signout);
