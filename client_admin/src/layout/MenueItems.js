import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}`}>
              <FeatherIcon icon="home" />
            </NavLink>
          )
        }
        key="main_feed"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Main feed
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/admin-project`}>
              <FeatherIcon icon="folder" />
            </NavLink>
          )
        }
        key="project"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/admin-project`}>
          Project
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/categories`}>
              <FeatherIcon icon="layers" />
            </NavLink>
          )
        }
        key="categories"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/categories`}>
          Categories
        </NavLink>
      </Menu.Item>

      { user.role === 0 ?
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/admin-users`}>
                <FeatherIcon icon="user" />
              </NavLink>
            )
          }
          key="admin-users"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/admin-users`}>
            Admin users
          </NavLink>
        </Menu.Item>
        :
        null 
      }

    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
