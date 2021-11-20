/**
 * @author Di Wang
 */
import React from 'react';
import './side-bar.scss';
import { Modal, Button, Select,Input } from 'antd';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { setMenuCollapsed } from '../../redux/setting';
import {Formik, Field, Form, ErrorMessage, FieldArray} from "formik";
import * as Yup from "yup";
const { TextArea } = Input;
const {Option} = Select
@connect(state => ({ setting: state.setting }), { setMenuCollapsed })
class ToDoModal extends React.PureComponent {

	static propTypes = {
		title: PropTypes.string,
	};


	handleChange(value) {
		console.log(`selected ${value}`);
	}

	render() {
		const { visible,loading,handleOk,handleCancel,activeToDoItem } = this.props;

		return (
			<div>
				<Modal
					visible={visible}
					title="Create New To Do Item"
					onCancel={()=>{handleCancel()}}
					footer={[
						<Button form="myForm" key="reset" htmlType="reset">
							Cancel
						</Button>,
						<Button form="myForm" key="submit" type="primary" htmlType="submit">
							Submit
						</Button>,
					]}
				>
					<Formik
						initialValues={activeToDoItem}

						enableReinitialize="True"
						onSubmit={(values, actions) => {

							handleOk(values)

							// console.log(actions)
							setTimeout(() => {
								actions.resetForm()
							}, 1000);

						}}
						onReset={(values, actions) => {
							// resetForm(initialValues)

							handleCancel()
						}}

					>
						{props => (
							<form
								id="myForm"
								onSubmit={props.handleSubmit}
								onReset={props.handleReset}
							>
								<label>Title: </label>
								<Input
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.title}
									name="title"

									placeholder="Write a title"
									style={{marginBottom:10}}
								/>
								{/*{props.errors.title && <div id="feedback">{props.errors.title}</div>}*/}


								<label>Topic: </label>
									<Select placeholder="Select a topic" style={{ width: '100%',marginBottom:10}} value={props.values.topic==""?undefined:props.values.topic} onChange={(value)=>{
										props.setFieldValue('topic', value);

									}}

											onBlur={props.handleBlur}
											name="topic"
									>
										<Option value="Disease">Disease</Option>
										<Option value="Pests">Pests</Option>
										<Option value="Weeds">Weeds</Option>
										<Option value="Fertilizers">Fertilizers</Option>
										<Option value="Waterlogging">Waterlogging</Option>
										<Option value="Other">Other</Option>
									</Select>
								<label>Description: </label>
								<TextArea
									placeholder="Write a description"
									rows={4}
									value={props.values.description}
									name="description"
									onChange={props.handleChange}
									/>
									{/*<button  onClick={props.handleReset}></button>*/}
							</form>
						)}
					</Formik>

				</Modal>
			</div>
		);
	}
}

export default ToDoModal;
