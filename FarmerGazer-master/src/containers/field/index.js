import React from 'react';
import './field.scss';
import Layout from "../../components/layout";
import ToDoModal from "../../components/todo-modal";
import { Button, Icon, PageHeader, Tag,Statistic,Descriptions,Row, List, Avatar,Timeline,Col,Checkbox,Modal } from "antd";
import moment from 'moment'
import fieldData from '../../assets/data.json';
import { Progress } from 'antd';
import harvestPro from '../../data.json';
import StatCard from '../../components/StatCard';

const { confirm } = Modal;
const percent = harvestPro;
const color_array=[[66,33,18],[127,64,32],[183,97,53],[198,51,78],[230,201,87],[253, 254, 3],[230, 236, 6],
	[208, 223, 0],[185, 207, 2],[162, 192, 0],[138, 175, 0],[114, 160, 0],[91, 142, 3],[69, 129, 0],
	[45, 112, 0],[37, 96, 45],[21, 84, 45],[21, 68, 45],[213,213,213],[219,170,246]];
const total_harvest_days=200;
const market_price=568;
export default class Field extends React.PureComponent {


	constructor(props){
		super(props);
		this.state={
			bgColor:"",
			active:"",
			next_id:0,
			index:1,
			area:0.2,
			visible:false,
			loading:false,
			activeDateButton:"",
			activeNDVIImage:"",
			fieldList:[
			],
			map:""
		}
	}


	// handle todo list
	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = (item) => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false, visible: false });
		}, 1000);
		this.state.active.feature.properties.todolist.push(item);
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	choose_field=(item)=>{

		if (this.state.active ==item) {
			this.setState({
				active: "",
				activeDateButton:""
			})

			this.state.activeNDVIImage.clearLayers()
			document.getElementById("mapid").style.minHeight = '100vh';
			this.state.map.invalidateSize()
			this.state.map.flyTo(item.feature.properties.center, 16,{
				animate: true,
				duration: 0.2
			})
		}else{

				this.setState({
					active: item
				})
				document.getElementById("mapid").style.minHeight = '400px';

				this.state.map.invalidateSize()
				this.state.map.flyTo(item.feature.properties.center, 16,{
					animate: true,
					duration: 0.2
				})

		}

	};

	myColor=(item)=> {
		if (this.state.active === item) {
			return "#f6f8f9";
		}
		return "";
	};
	get_image_url=(item)=>{

		const center=item.feature.properties.center.lat+","+item.feature.properties.center.lng
		const array=item._latlngs[0]

		var path=""
		array.forEach(function(i, index) {
			path += i.lat+","+i.lng+"|";

		});
		path+=array[0].lat+","+array[0].lng
		const img_url="https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center="+center
			+"&zoom=15&size=150x150&path=color:0xFFFF00FF|weight:3|"+path+
			"&key=AIzaSyAbBacBJHybSA79AVgd-OHwAa-1kap6fek";
		return img_url
	}
	addNewField=()=>{
		var map = this.state.map;
		map.pm.enableDraw('Polygon', { finishOn: 'dblclick' });
		// map.pm.disableDraw('Polygon');

}
	highlight_field=(item)=>{
		item.setStyle({
			color: 'white'
		});
	}

	de_highlight_field=(item)=>{
		item.setStyle({
			color: 'Yellow'
		});
	}

	_renderSideBarContent = () => {
		return (
			<div className="field__sidebar">
				<div className="field__sidebar-body">
					{this.state.fieldList.map(
						(item)=>(
							<div key={item.id} className="field__sidebar-list-item" style={{ backgroundColor: this.myColor(item) }} onMouseEnter={()=>this.highlight_field(item)} onMouseLeave={()=>this.de_highlight_field(item)} onClick={()=>this.choose_field(item)}>
								<a href="#" className="field__sidebar-soil-fields-list-item">
									<div className="field__sidebar-soil-fields-list-pic" style={{backgroundImage: `url(${this.get_image_url(item)})`, Height:48,width:48}}></div>
									<div className="field__sidebar-soil-fields-list-content">
										<h2 className="field__sidebar-soil-fields-list-header">{item.feature.properties.id}. Field, {item.feature.properties.size} ha</h2>
									</div>
									<div className="field__sidebar-soil-fields-list-pic2">
										<div >
											<Progress width={55} type="circle" percent={Math.floor((total_harvest_days-item.feature.properties.harvest_days)/total_harvest_days*100)} size="small" format={harvest_days => <span>{harvest_days}<br/>Days</span>} />
										</div>

									</div>
								</a>
							</div>

						)

					)}

				</div>
				<div className="field__sidebar-footer">
					<Button
						onClick={this.addNewField}
						block
						size="large"
						type="primary">
						<Icon type="plus"/>Add Fields
					</Button>
				</div>
			</div>
		);
	};

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

	tickToDoItem=(item)=>{
		const self=this

		confirm({
			title: 'Do you Want to set this item completed?',
			content: item.title,
			onOk() {

				let active = self.state.active;
				var array = [...active.feature.properties.todolist]; // make a separate copy of the array
				var timeLineArray=[...active.feature.properties.activity_history];

				var index = array.indexOf(item);
				if (index !== -1) {
						array.splice(index, 1);
						item.date=moment().format();
						timeLineArray.unshift(item);
						active.feature.properties.todolist=array
						active.feature.properties.activity_history=timeLineArray
						self.setState({active});
						self.forceUpdate();
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});


	}

	updateDate=(event,item)=> {

		const self=this
		if (this.state.activeDateButton != "") {

			this.state.activeDateButton.className = "map-timeline-area__item"
		}
		event.target.className = "map-timeline-area__item __selected"
		this.setState({activeDateButton: event.target})

		self.state.activeNDVIImage.clearLayers();
		var imageUrl = './fieldimage/'+event.target.value+'_'+this.state.active._latlngs[0][0].lat+'_'+this.state.active._latlngs[0][0].lng+'.png',
			imageBounds = this.state.active._latlngs[0];


		var L = window.L;
		var image=L.imageOverlay(imageUrl, imageBounds,{interactive:true});

		var tooltip = L.tooltip({
			direction: 'left',
			sticky: true
		});
		image.addTo(self.state.activeNDVIImage);


		this.state.active.off('mousemove');
		this.state.active.on("mousemove", function (e) {
			var bounds = image.getBounds();

			var x_0=bounds._southWest.lng;
			var y_0=bounds._northEast.lat;

			var x_max=bounds._northEast.lng;
			var y_max=bounds._southWest.lat;

			var mouse_x=e.latlng.lng;
			var mouse_y=e.latlng.lat;
			var image_x=parseInt(((mouse_x-x_0)/(x_max-x_0))*image._image.naturalWidth);
			var image_y=parseInt(((y_0-mouse_y)/(y_0-y_max))*image._image.naturalHeight);
			var color=getPixel(imageUrl,image_x,image_y);
			var index= color_array.map(x=>x.join(",")).indexOf(color[0]+","+color[1]+","+color[2])

			if (index !=-1) {
				if (index ==18){
					tooltip
						.setContent("Cloud")
						.setLatLng([mouse_y, mouse_x])
						.addTo(self.state.activeNDVIImage);
				}else {
					tooltip
						.setContent(((index * 0.05).toFixed(2)).toString())
						.setLatLng([mouse_y, mouse_x])
						.addTo(self.state.activeNDVIImage);
				}
			}


		});
		this.forceUpdate();
		function getPixel(url, x, y) {
			var img = new Image();
			img.src = url;
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			return context.getImageData(x, y, 1, 1).data;
		}






	}
	render() {
		var date_array=fieldData.field_date

		return (
			<Layout
				sideBarTitle="Field"
				sideBarComponent={this._renderSideBarContent()}>
				<div className="field">
					<div className="field__map-panel">
						{/*start*/}
						{this.state.active!=""&&<div className="top-toolbar">
							<div className="top-toolbar-item __fluid">
								<div tabIndex="0" className="map-timeline">
									<div className="map-timeline-header">Vegetation:</div>
									<div className="map-timeline-body __shd-left __shd-right">
										<div className="map-timeline-scroll">
											<div className="map-timeline-area">
												{date_array.map(
													(item,index)=>{
														return(
															<div className="map-timeline-area__list-item">
																<button ref={index} type="button" value={item} onClick={(e)=>this.updateDate(e,item)} className="map-timeline-area__item">{item}
																</button>
															</div>
														)
													}
												)
												}

											</div>
										</div>
									</div>
									<button type="button" className="map-timeline__arrow">
										<svg width="11px" height="10px" viewBox="0 0 11 10">
											<path
												d="M3.483 4.002h6.519a.998.998 0 0 1 0 1.996h-6.51l2.24 2.24c.137.138.23.3.275.468a.976.976 0 0 1 0 .515c-.046.168-.138.33-.276.467-.138.138-.299.23-.467.276a.976.976 0 0 1-.515 0 1.053 1.053 0 0 1-.468-.276L.397 5.804a1.053 1.053 0 0 1-.363-.547.976.976 0 0 1 0-.514c.046-.169.138-.33.275-.468L4.273.312c.138-.138.299-.23.468-.276a.976.976 0 0 1 .514 0c.169.046.33.138.468.276s.23.299.276.467a.976.976 0 0 1 0 .515c-.046.169-.138.33-.276.468l-2.24 2.24z"
												fill="currentColor" fill-rule="evenodd"></path>
										</svg>
									</button>
									<button type="button" className="map-timeline__arrow">
										<svg width="11px" height="10px" viewBox="0 0 11 10">
											<path
												d="M7.517 4.002H.998a.998.998 0 1 0 0 1.996h6.51l-2.24 2.24c-.137.138-.23.3-.275.468a.976.976 0 0 0 0 .515c.046.168.138.33.276.467.138.138.299.23.467.276a.976.976 0 0 0 .515 0c.169-.046.33-.138.468-.276l3.884-3.884a1.053 1.053 0 0 0 .363-.547.976.976 0 0 0 0-.514 1.053 1.053 0 0 0-.275-.468L6.727.312A1.053 1.053 0 0 0 6.26.036a.976.976 0 0 0-.514 0c-.169.046-.33.138-.468.276s-.23.299-.276.467a.976.976 0 0 0 0 .515c.046.169.138.33.276.468l2.24 2.24z"
												fill="currentColor" fill-rule="evenodd"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>}

						{this.state.active!=""&&<div className="map-legend">
							<div className="map-legend__item">
								<div className="map-legend-scale" data-from="Low vegetation" data-to="High">
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(66, 33, 18)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(127, 64, 32)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(183, 97, 53)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(198, 151, 78)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(230, 201, 87)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(253, 254, 3)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(230, 236, 6)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(208, 223, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(185, 207, 2)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(162, 192, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(138, 175, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(114, 160, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(91, 142, 3)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(69, 129, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(45, 112, 0)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(37, 96, 45)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(21, 84, 45)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(21, 68, 45)"}}></div>
								</div>
							</div>
							<div className="map-legend__item">
								<div className="map-legend-scale" data-from="Clouds" data-to="Water, snow">
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(213, 213, 213)"}}></div>
									<div className="map-legend-scale__item"
										 style={{backgroundColor: "rgb(109, 170, 246)"}}></div>
								</div>
							</div>
						</div>}

						{/*#end*/}
						<div id="mapid" className="field__map"></div>
					</div>
					<div className="field__content-panel">
						{/*<a href='#' id='export'>Export Features</a>*/}
						{this.state.active!=""&&<div className="map-dashboard">
							<div className="map-dashboard__main">
								<div className="map-dashboard__section">
									<PageHeader

										title={"Field #" + this.state.active.feature.properties.id}
										tags={<Tag color="Green">Health</Tag>}
										// subTitle="This is a subtitle"
										extra={[
											<Button key="1" type="primary">
												Edit
											</Button>,
										]}
									>
										<Row type="flex">
											<Statistic title="Harvest in" value={this.state.active.feature.properties.harvest_days + " Days"} style={{
												margin: '0 15px',
											}}/>
											<Statistic
												title="Size"
												// prefix=""
												value={this.state.active.feature.properties.size + " ha"}
												style={{
													margin: '0 15px',
												}}
											/>

											<Statistic
												title="Current Market Price"
												prefix="$"
												value={market_price + "/ha"}
												style={{
													margin: '0 15px',
												}}
											/>
											<Statistic title="Estimated Revenue" prefix="$" value={Math.floor(this.state.active.feature.properties.size*market_price)} />
										</Row>
									</PageHeader>
								</div>
								<div className="map-dashboard__hr"></div>
								<div className="map-dashboard__section">

									<Row equal-heights>
										<Col span={12}>
											<PageHeader

										title="To Do List"
										// tags={<Tag color="Green">Health</Tag>}
										// subTitle="This is a subtitle"
										extra={[
											<div onClick={this.showModal}>Add New</div>
										]}
									>

											<List
												dataSource={this.state.active.feature.properties.todolist}
												renderItem={item => (
													<List.Item actions={[<a key="list-loadmore-edit">edit</a>, <div onClick={()=>this.tickToDoItem(item)}>done</div>]}>
														<List.Item.Meta
															// avatar={<Icon type="bug" theme="twoTone"/>}
															title={<div><Icon type={this.getToDoIcon(item.topic).type} twoToneColor={this.getToDoIcon(item.topic).color} theme="twoTone"/> {item.title}</div>}
														/>
													</List.Item>
												)}
											/>


									</PageHeader>
										</Col>
										<Col span={12}>
											<PageHeader
												title="Activity History"
											>
											<Timeline style={{
												margin: '0px 5px',
											}}>
												{this.state.active.feature.properties.activity_history.map(
													(item)=>{
														return(
															<Timeline.Item dot={<Icon type={this.getToDoIcon(item.topic).type} style={{ fontSize: '16px'}}  theme="twoTone" twoToneColor={this.getToDoIcon(item.topic).color} />}>
																<p>{item.title} {moment(item.date).format('YYYY-MM-DD')}</p>
															</Timeline.Item>
														)
													}
												)
												}

											</Timeline>
											</PageHeader>
										</Col>
									</Row>

								</div>


								<div className="map-dashboard__hr"></div>
								<div className="map-dashboard__section">
									<a className="weatherwidget-io" href="https://forecast7.com/en/34d1774d43/wagoora/"
									   data-label_1="WAGOORA" data-label_2="WEATHER" data-theme="pure">WAGOORA
										WEATHER</a>

								</div>

								<div className="map-dashboard__hr"></div>
								<div className="map-dashboard__section">
								<br/>
									<StatCard />
								</div>


							</div>

						</div>}
					</div>
				</div>
				<ToDoModal visible={this.state.visible}
						   loading={this.state.loading}
						   handleOk={this.handleOk}
						   activeToDoItem={{ title: '',topic:'',description:''}}
						   handleCancel={this.handleCancel}></ToDoModal>
			</Layout>
		);
	}

	componentDidMount() {


		const self = this;
		var data = require('../../Polygon.json');
		var L = window.L;
		var map = L.map('mapid').setView([-20.825, 148.72], 16);
		map.invalidateSize()
		this.state.map=map;

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.satellite',
			accessToken: 'pk.eyJ1Ijoid29zaGlkaW5neWloYW8iLCJhIjoiY2syaGhidGtoMDlkcTNqbnRzYnEyOHpqcSJ9.uFG-YDdmLtd4RmLdGEuLlw'
		}).addTo(map);

		var featureGroup = L.featureGroup().addTo(map);
		var ndviGroup=L.featureGroup().addTo(map);
		this.state.activeNDVIImage =ndviGroup;

		//initialise the data
		L.geoJSON(data, {
				onEachFeature: function( newfeature, layer ){

					const google=window.google
					// Each time a feaute is created, it's added to the over arching feature group;


					var feature = layer.feature = layer.feature || {};
					feature.type = "Feature";
					feature.properties = feature.properties || {};

					const area=google.maps.geometry.spherical.computeArea(layer.getLatLngs()[0].map((element)=>{return new google.maps.LatLng(element)}))

					feature.properties["size"] = newfeature.properties.size;
					feature.properties["id"] = newfeature.properties.id;

					self.state.next_id=self.state.next_id+1;
					self.setState({next_id:self.state.next_id+1});

					feature.properties["todolist"]=newfeature.properties.todolist;
					feature.properties["harvest_days"]=newfeature.properties.harvest_days;
					feature.properties["activity_history"]=newfeature.properties.activity_history;


					// // #calculate center point
					var bounds = layer.getBounds();

					var lat=(bounds._southWest.lat+bounds._northEast.lat)/2;
					var lng=(bounds._southWest.lng+bounds._northEast.lng)/2;
					feature.properties["center"] = {lat:lat,lng:lng}
					function getstyle(size) {

						return { color: "yellow", weight: 3 ,"fillOpacity": .05,"opacity": 1};
					}
					layer.setStyle(getstyle(feature.properties["size"]));

					layer.on("click", function (e) {
						self.choose_field(layer)

					});
					layer.on('mouseover', function () {
						console.log("enter")
						layer.setStyle({
							color: 'white'
						});
					});
					layer.on('mouseout', function () {
						console.log("out")
						layer.setStyle({
							color: 'yellow'
						});
					});
					featureGroup.addLayer(layer);

					var array = [...self.state.fieldList];
					array.unshift(layer);
					self.state.fieldList=array

				}
			}

		)

		L.PM.initialize({ optIn: false });
		map.pm.addControls({
			position: 'topleft',
			drawCircle: false,
			drawRectangle:false,
			editMode:true,
		});

		map.on('pm:create', function(e) {
			const google=window.google
			// Each time a feaute is created, it's added to the over arching feature group// map.pm.enableDraw('Marker', { snappable: false });

			var layer=e.layer;

			var feature = layer.feature = layer.feature || {};
			feature.type = "Feature";
			feature.properties = feature.properties || {};

			const area=google.maps.geometry.spherical.computeArea(layer.getLatLngs()[0].map((element)=>{return new google.maps.LatLng(element)}))

			feature.properties["size"] = (area/10000).toFixed(2);
			feature.properties["id"] = self.state.next_id
			self.setState({next_id:self.state.next_id+1})
			feature.properties["todolist"]=[
			]
			feature.properties["harvest_days"]=Math.floor(Math.random() * 50+50)

			feature.properties["activity_history"]=[
				{
					title:'Field Created',
					date:moment().format('YYYY-MM-DD'),
					topic:'',
					description:'',
				},

			]


			// // #calculate center point
			var bounds = layer.getBounds();

			var lat=(bounds._southWest.lat+bounds._northEast.lat)/2;
			var lng=(bounds._southWest.lng+bounds._northEast.lng)/2;
			feature.properties["center"] = {lat:lat,lng:lng}
			function getstyle(size) {

				return { color: "yellow", weight: 3 ,"fillOpacity": .05,"opacity": 1};
			}
			layer.setStyle(getstyle(feature.properties["size"]));

			layer.on("click", function (e) {
				self.choose_field(layer)

			});
			layer.on('mouseover', function () {
				console.log("enter")
				layer.setStyle({
					color: 'white'
				});
			});
			layer.on('mouseout', function () {
				console.log("out")
				layer.setStyle({
					color: 'yellow'
				});
			});
			featureGroup.addLayer(layer);

			var array = [...self.state.fieldList];
			array.unshift(layer);
			self.setState({fieldList: array});
			// self.choose_field(layer)


		});

		// document.getElementById('export').onclick = function(e) {
		// 	var data = featureGroup.toGeoJSON();
		// 	var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
		// 	document.getElementById('export').setAttribute('href', 'data:' + convertedData);
		// 	document.getElementById('export').setAttribute('download','data.geojson');
		// }




	}
}
