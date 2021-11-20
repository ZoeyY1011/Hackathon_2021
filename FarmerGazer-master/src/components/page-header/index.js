/**
 * @author Di Wang
 */
import React from 'react';
import { Icon } from "antd";
import { connect } from "react-redux";
import { setMenuCollapsed } from "../../redux/setting";

@connect(state => ({ setting: state.setting }), { setMenuCollapsed })
class PageHeader extends React.PureComponent{
	render() {
		const {setting} = this.props;
		return (
			<div className="dashboard__title-container">
				<Icon type={setting.menuCollapsed ? 'menu-unfold' : 'menu-fold'}
				      className="side-bar__icon"
				      onClick={() => {
					      this.props.setMenuCollapsed(!setting.menuCollapsed)
				      }}/>
				<h1 className="dashboard__title">{this.props.children}</h1>
			</div>
		);
	}
};

export default PageHeader;
