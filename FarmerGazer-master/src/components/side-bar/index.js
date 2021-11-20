/**
 * @author Di Wang
 */
import React from 'react';
import './side-bar.scss';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { setMenuCollapsed } from '../../redux/setting';

@connect(state => ({ setting: state.setting }), { setMenuCollapsed })
class SideBar extends React.PureComponent {

	static propTypes = {
		title: PropTypes.string,
	};

	render() {
		const { title, setting } = this.props;
		return (
			<div className="side-bar">
				<div className="side-bar__header">
					<Icon type={setting.menuCollapsed ? 'menu-unfold' : 'menu-fold'}
					      className="side-bar__icon"
					      onClick={() => {
						      this.props.setMenuCollapsed(!setting.menuCollapsed)
					      }}/>
					<h3 className="side-bar__title">{title}</h3>
					<div/>
				</div>
				<div className="side-bar__body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default SideBar;
