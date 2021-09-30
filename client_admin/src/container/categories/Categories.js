import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectHeader } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import CategoryTable from './CategoryTable';
import ChainTable from './ChainTable';
import AddChain from './overview/AddChain';
import AddCategory from './overview/AddCategory';
import { Main } from '../styled';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const Categories = ({ match }) => {
  const { categoryList, chainList } = useSelector(state => {
    return {
      categoryList: state.category.categories,
      chainList: state.chain.chains,
    };
  });

  const [state, setState] = useState({
    visibleCategoryModal: false,
    visibleChainModal: false,
  });

  const { visibleCategoryModal, visibleChainModal } = state;

  const addCategory = () => {
    setState({
      ...state,
      visibleCategoryModal: true,
    });
  }

  const addChain = () => {
    setState({
      ...state,
      visibleChainModal: true,
    });
  }

  const onCategoryCancel = () => {
    setState({
      ...state,
      visibleCategoryModal: false,
    });
  }

  const onChainCancel = () => {
    setState({
      ...state,
      visibleChainModal: false,
    });
  }

  return (
    <Row>
      <Col md={12} sm={24} xs={24}>
        <ProjectHeader>
          <PageHeader
            title="Categories"
            subTitle={<>{categoryList.length} Category(ies)</>}
            buttons={[
              <Button onClick={addCategory} key="1" type="primary" size="default">
                <FeatherIcon icon="plus" size={16} /> Add New Category
              </Button>,
            ]}
          />
        </ProjectHeader>
        <Main>
          <Row gutter={25}>
            <Col xs={24}>
              <div>
                <Switch>
                  <Suspense
                    fallback={
                      <div className="spin">
                        <Spin />
                      </div>
                    }
                  >
                    <CategoryTable />
                  </Suspense>
                </Switch>
              </div>
            </Col>
          </Row>
        </Main>
      </Col>
      <Col md={12} sm={24} xs={24}>
        <ProjectHeader>
          <PageHeader
            title="Chains"
            subTitle={<>{chainList.length} Chain(s)</>}
            buttons={[
              <Button onClick={addChain} key="1" type="primary" size="default">
                <FeatherIcon icon="plus" size={16} /> Add New Chain
              </Button>,
            ]}
          />
        </ProjectHeader>
        <Main>
          <Row gutter={25}>
            <Col xs={24}>
              <div>
                <Switch>
                  <Suspense
                    fallback={
                      <div className="spin">
                        <Spin />
                      </div>
                    }
                  >
                    <ChainTable />
                  </Suspense>
                </Switch>
              </div>
            </Col>
          </Row>
          <AddChain onCancel={onChainCancel} visible={visibleChainModal} />
          <AddCategory onCancel={onCategoryCancel} visible={visibleCategoryModal} />
        </Main>
      </Col>
    </Row>
  );
};

Categories.propTypes = {
  match: propTypes.object,
};

export default Categories;
