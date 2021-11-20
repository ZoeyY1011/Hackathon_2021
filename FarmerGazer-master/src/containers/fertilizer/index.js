import React from 'react';
import './fertilizer.scss';
import Layout from "../../components/layout";

export default class Fertilizer extends React.PureComponent {

	render() {
		return (
			<Layout sideBarTitle="Fertilizer">
				<div className="fertilizer">
					Fertilizer
				</div>
			</Layout>
		);
	}
}
