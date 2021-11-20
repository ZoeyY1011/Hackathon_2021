/**
 * @author Di Wang
 */
import React from 'react';
import './layout.scss';
import SideBar from "../side-bar";
import * as PropTypes from 'prop-types';

export default class Layout extends React.PureComponent {

	static propTypes = {
		sideBarTitle: PropTypes.string.isRequired,
		sideBarComponent: PropTypes.node,
	};

	render() {
		const { sideBarTitle, sideBarComponent } = this.props;
		return (
			<div className="layout">
				<SideBar
					title={sideBarTitle}>
					{sideBarComponent}
				</SideBar>
				<div className="layout__main">
					{this.props.children}
				</div>
			</div>
		);
	}
}
