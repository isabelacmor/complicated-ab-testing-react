import React, { Component } from 'react';
import './App.css';
import BurgerMenu from 'react-burger-menu';
import { Experiment, Variant, emitter, experimentDebugger } from '@marvelapp/react-ab-test';
import Mixpanel from 'mixpanel';
import secrets from '../secrets.json';

class MenuWrap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({hidden : true});

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({hidden : false});
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentMenu: 'slide',
      side: 'left'
    };
  }

  getItems() {
    let items = [
          <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>,
          <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>,
          <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>,
          <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>,
          <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>,
          <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
        ];

    return items;
  }

  getMenu() {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    let jsx = (
        <MenuWrap wait={20}>
          <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            {items}
          </Menu>
        </MenuWrap>
      );

    return jsx;
  }

  render() {
    return (
      <div id="outer-container" style={{height: '100%'}}>
        {this.getMenu()}
        <main id="page-wrap">
          <h1><a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a></h1>
          <h2 className="description">An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.</h2>
          Inspired by <a href="https://github.com/codrops/OffCanvasMenuEffects">Off-Canvas Menu Effects</a> and <a href="https://github.com/codrops/SidebarTransitions">Sidebar Transitions</a> by Codrops
        </main>
      </div>
    );
  }
}

export default App;
