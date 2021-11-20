import React from 'react';
import './extension.scss';
import {Card, Row, Col, Skeleton} from 'antd';
import PageHeader from "../../components/page-header";

export default class Extension extends React.PureComponent {

	render() {
		return (
			<div className="extension">
				<PageHeader>Extension</PageHeader>
				<Row type="flex" justify="space-around">
					<Col span={10}>
						<Card
							style={{ marginTop: 16 }}
							type="inner"
							title="Tech part"
							>
							<ul>
							<li>Blockchain - dashboard for tracking price movement & trading system</li>
								<li> IoT - we can migrate our application on mobile device like iPad, iPhone, or iWatch</li>
								<li>we can send farmers notification through SMS or email</li>
							</ul>

						</Card>
					</Col>
					<Col span={10}>
						<Card
							style={{ marginTop: 16 ,height:200}}
							type="inner"
							title="Big data / ML"
							>
							<ul>
								<li>Our application can learn the soil and corp condition history for any piece of land for land rating</li>
							</ul>
						</Card>
					</Col>
				</Row>
				<Row type="flex" justify="space-around">
					<Col span={10}>
						<Card
							style={{ marginTop: 16 }}
							type="inner"
							title="Business part"
							>
							<ul>
								<li>Farming automation - Farmers can automatically commence fertiliser / pesticide purchase by clicking buttons</li>
								<li>Precision farming - farmers can arrange room / soil capability of water / and fertiliser demand detailedly though our app</li>
								<li>Species Breeding - farmers would be recommended suitable species of sugarcane for each piece of land</li>
								<li>Yield prediction - farmers would be informed the their yield prediction on each piece of land</li>
								<li>Field management  - precision farming</li>
							</ul>
						</Card>
					</Col>
					<Col span={10}>

					</Col>
				</Row>
			</div>
		);
	}
}
