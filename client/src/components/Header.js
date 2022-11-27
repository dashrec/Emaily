import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    // because the reducer we ran and fetched a new piece or created a new piece of states, our redux state updates. And because the redux state updates all the components in our application, we render as well with that
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo"> Emaily </Link> 

            <ul className="right">
                {this.renderContent()}
            </ul>
          
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) { // destruct auth from state.auth
  return { auth }; // since these keys and values are the same use just auth otherwise would be auth:auth
}

export default connect(mapStateToProps)(Header);


 // we call auth inside the reducers index JS file we had assigned to the