import React from 'react';
import './app.scss';
import { Menu, Icon } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Routers from './router';

const { Item } = Menu;

@connect(state => ({ setting: state.setting }))
class App extends React.PureComponent {

	_handleClick = e => {
		this.props.history.push(e.key);
	};

	render() {
		const { setting } = this.props;
		return (
			<div className="app">
				<div className="app__navigation">
					<div
						className="app__logo"
						style={{backgroundImage: `url(${setting.menuCollapsed ? require('./assets/logo/logo_small.png'): require('./assets/logo/logo.png')})`}}
					/>
					<Menu
						style={{ width: setting.menuCollapsed ? 80 : 220 }}
						className="app__menu"
						onClick={this._handleClick}
						defaultSelectedKeys={[this.props.history.location.pathname === '/' ? '/home' : this.props.history.location.pathname]}
						mode="inline"
						inlineCollapsed={setting.menuCollapsed}>
						{Routers.map(item => (
							<Item key={item.route}>
								<Icon type={item.icon}/>
								<span>{item.name}</span>
							</Item>
						))}
					</Menu>
				</div>
				<main className="app__main">
						<Switch>
							{Routers.map(item => (
								<Route key={item.name} path={item.route} component={item.component}/>
							))}
							<Route path="/">
								<Redirect to={Routers[0].route}/>
							</Route>
						</Switch>
				</main>
			</div>
		);
	}
}

export default App;
