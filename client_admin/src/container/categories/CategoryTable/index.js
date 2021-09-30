import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import AddCategory from '../overview/AddCategory';
import isValid from '../../../utility/isValid';

const CategoryTable = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    visibleCategoryModal: false,
    allCategories: [],
    categoryData: null,
  });

  const { project, categories } = useSelector(state => {
    return {
      project: state.project,
      categories: state.category.categories,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let countArr = new Array(categories.length).fill(0);
        for(let i = 0 ; i < project.projects.length ; i ++) {
          let foundIndex = -1;
          if(isValid(project.projects[i].category))
            foundIndex = categories.findIndex(x => x._id === project.projects[i].category._id);
          if(foundIndex !== -1) {
            let tempCount = countArr[foundIndex];
            tempCount ++;
            countArr[foundIndex] = tempCount;
          }
        }

        let tempData = [];
        for( let i = 0 ; i < categories.length; i ++ ) {
          tempData.push({
            key: categories[i]._id,
            name: categories[i].name,
            project_count: countArr[i]
          })
        }
        setState({ ...state, allCategories: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [project.projects, categories]);

  const { visibleCategoryModal } = state;

  const columnsSort = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: name => (
        <span className="source">{ name }</span>
      )
    },
    {
      title: 'Project Count',
      dataIndex: 'project_count',
      render: project_count => (
        <span className="source">{ project_count }</span>
      )
    },
    {
      title: '',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" onClick={() => updateCategory(key)} shape="circle">
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="danger" onClick={() => deleteCategory(key)} shape="circle">
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const onCategoryCancel = () => {
    setState({
      ...state,
      visibleCategoryModal: false,
    });
  }

  const updateCategory = (_id) => {
    let tempCategoryData = null;
    for(let i = 0 ; i < categories.length ; i ++)
      if(categories[i]._id === _id) {
        tempCategoryData = categories[i];
        break;
      }

      setState({ ...state, categoryData: tempCategoryData, visibleCategoryModal: true });
  }

  const deleteCategory = (_id) => {
    actions.deleteCategory(_id).then( res => {
      const { success, category } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_CATEGORY,
            data: category
        });

        notification['success'] ({
          message: 'A category was removed successfully',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.CATEGORY_ERR,
            err: res.data.errMessage,
        });
        notification['error'] ({
          message: 'Error',
          description: res.data.errMessage
        })          
      }
    });
  }

  return (
    <>
      <Row>
        <Col xs={24}>
          <Cards title="" headless>
            <UserTableStyleWrapper>
              <TableWrapper className="table-responsive">
                <Table
                  className="table-responsive"
                  pagination={{
                    position: ['none', 'bottomLeft'],
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100]
                  }}
                  columns={columnsSort}
                  dataSource={state.allCategories}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
          {
          visibleCategoryModal ?
            <AddCategory onCancel={onCategoryCancel} visible={visibleCategoryModal} categoryAction={1} categoryData={state.categoryData} />
            :
            null 
          }
        </Col>
      </Row>
    </>
  );
};

export default CategoryTable;
