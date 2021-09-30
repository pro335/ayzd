import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';
import moment from 'moment';

const { Option } = Select;
const Upcoming = () => {
  const dispatch = useDispatch();

  const { categoryList, chainList, project } = useSelector(state => {
    return {
      categoryList: state.category.categories,
      chainList: state.chain.chains,
      project: state.project,
    };
  });

  const [state, setState] = useState({
    initialData: {
      price: project.project_action === 2 && isValid(project.projectData.price) ? project.projectData.price : null,
      upcoming_date: project.project_action === 2 && isValid(project.projectData.upcoming_date) ? moment(project.projectData.upcoming_date) : null,
      mint_size: project.project_action === 2 && isValid(project.projectData.mint_size) ? project.projectData.mint_size : null,
    },
  });

  const handleFormData = (props, values, allFieldsValues) => {
    if(isValid(props) && isValid(Object.keys(props)) && isValid(Object.keys(props)[0]) && isValid(Object.values(props)) && isValid(Object.values(props)[0])) {
      let key = Object.keys(props)[0], value = Object.values(props)[0];
      if(key === "price" || key === "mint_size") {
        let tempValue = value;
        value = Number(tempValue);
      }
      let newVal = {
        ...project.projectData,
        [key]: value,
      };
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: newVal
      });
    }
  }

  function onDateChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  }
  
  function onDateConfirmed(value) {
    // console.log('onOk: ', value);
  }
  

  return (
    <>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Upcoming</Heading>
          </div>
        }
      >
        <Row justify="center">
          <Col xs={24}>
            <BasicFormWrapper>
              <Form name="upcoming" onValuesChange={handleFormData} initialValues={state.initialData}>
                <Form.Item name="price" label="Price">
                  <Input />
                </Form.Item>
                <Form.Item name="upcoming_date" label="Upcoming Date">
                  <DatePicker showTime format="MMM D, YYYY hh:mm A" onChange={onDateChange} onOk={onDateConfirmed} />
                </Form.Item>
                <Form.Item name="mint_size" label="Mint Size">
                  <Input type="number" />
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </>
  );
};

export default Upcoming;
