import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PerseidsHeader } from 'perseids-react-components';
import { NavbarToggler, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-i18n';

import I18n from '../I18n';

const matchPropType = PropTypes.shape({
  params: PropTypes.shape({
    word: PropTypes.string,
  }).isRequired,
});

const renderCollapse = (collapsed, word) => (
  <Collapse isOpen={!collapsed} navbar>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to={`/l/${word}`}>
          <I18n t="navbar.search" />
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/b/${word}`}>
          <I18n t="navbar.browse" />
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/p/preface">
          <I18n t="navbar.preface" />
        </NavLink>
      </li>
    </ul>
  </Collapse>
);

class Navbar extends Component {
  static propTypes = {
    match: matchPropType.isRequired,
  }

  state = {
    collapsed: true,
  }

  toggleNavbar = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { collapsed } = this.state;
    const { match: { params } } = this.props;
    const word = params.word || '';

    return (
      <PerseidsHeader>
        <NavbarToggler onClick={this.toggleNavbar} aria-label="navigation menu" />

        {renderCollapse(collapsed, word)}
      </PerseidsHeader>
    );
  }
}

export default Navbar;
