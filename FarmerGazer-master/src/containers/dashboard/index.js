import React from 'react';
import './dashboard.scss';
import Basic from '../../components/barchart'
import { Statistic, Card, Row, Col, Icon, List } from 'antd';
import PageHeader from "../../components/page-header";

const todoList = [
	{
		title: 'Species selection',
		topic:'Others'
	}, {
		title: 'irrigate sugarcane',
		topic:"Waterlogging"
	}, {
		title: 'Fertilizer selection',
		topic:"Fertilizers"
	}, {
		title: 'Weed Clearing',
		topic:"Weeds"
	}, {
		title: 'Pest Control',
		topic:"Pests"
	},
];

class Fertilizer extends React.PureComponent {
	getToDoIcon=(topic)=>{
		switch(topic) {
			case 'Disease':
				return {type:'alert',color:"red"};
			case 'Pests':
				return {type:'bug',color:"red"};
			case 'Fertilizers':
				return {type:'experiment',color:"green"};
			case 'Weeds':
				return {type:'warning',color:"orange"};
			case 'Waterlogging':
				return {type:'warning',color:"orange"};
			default:
				return {type:'pushpin',color:"blue"};
		}

	}
	render() {
		return (
			<div className="dashboard">
				<PageHeader>Dashboard</PageHeader>
				<Row type="flex" justify="space-around">
					<Col span={5}>
						<Card>
							<Statistic
								title="# Fields"
								value={3}
								valueStyle={{ color: '#3f8600' }}
								prefix={<Icon type="border-outer"/>}

							/>
						</Card>
					</Col>
					<Col span={5}>
						<Card>
							<Statistic
								title="Total Fields Size"
								value={9.3}
								precision={2}
								prefix={<Icon type="dot-chart" />}
								suffix="Ha"
							/>
						</Card>
					</Col>
					<Col span={5}>
						<Card>
							<Statistic
								title="Ready for harvest"
								value={2 + " Fields"}

								valueStyle={{ color: '#3f8600' }}
								prefix={<Icon type="check-circle" />}

							/>
						</Card>
					</Col>
					<Col span={5}>
						<Card>
							<Statistic
								title="To do Items"
								value={3}
								// precision={2}
								// valueStyle={{ color: '#cf1322' }}
								prefix={<Icon type="ordered-list" />}

							/>
						</Card>
					</Col>
				</Row>
				<br/>
				<Row type="flex" justify="space-around">
					<Col span={11}>
						<Card type="inner" title="Fields NDVI Rank">
							<Basic/>
						</Card>
					</Col>
					<Col span={11}>
						<Card type="inner" title="Action List">
							<List
								dataSource={todoList}
								renderItem={(item, idx) => (
									<List.Item key={idx} actions={[<a key="list-loadmore-edit">edit</a>,
										<div onClick={() => this.tickToDoItem(item)}>done</div>]}>
										<List.Item.Meta
											title={<div><Icon type={this.getToDoIcon(item.topic).type} twoToneColor={this.getToDoIcon(item.topic).color} theme="twoTone"/> {item.title}</div>}
										/>
									</List.Item>
								)}
							/>
						</Card>
					</Col>
				</Row>

				<div style={{ height: 40 }}/>
				<Row type="flex" justify="space-around">
					<Col span={11}>
						<Card type="inner" title="Sugar Price on International Market">
							<a href="http://www.indexmundi.com/commodities/?commodity=sugar" target="_blank">
								<img
									style={{ width: '100%' }}
									alt="Sugar - Monthly Price - Commodity Prices - Price Charts, Data, and News - IndexMundi"
									src="http://www.indexmundi.com/commodities/image.aspx?commodity=sugar"/>
							</a>
						</Card>
					</Col>
					<Col span={11}>
						<Card type="inner" title="News">
							<iframe src="https://www.acfa.com.au/blog/" style={{width: '100%', height: 346}}/>
						</Card>
					</Col>
				</Row>
			</div>

		);
	}
}

export default Fertilizer;
