import React, { Component } from 'react';
import _ from 'lodash';
import './Tabs.css';

class TabsComponent extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0
    };
  }

  render() {
    const subComponents = {
      tabButtons: [],
      tabContents: []
    };

    _.each(this.props.tabDatas, (tabData, index) => {
      const isSelected = this.state.selectedTab === index;
      const isSelectedSuffix = isSelected ? 'selected' : 'hidden';
      const tabContent =
        <content
          className={ `tabs__content--${isSelectedSuffix}`}
          key={ index }>
            { tabData.children }
        </content>;
      const tabButton =
        <li
          key={ index }
          onClick={
            () => {
              this.setState({selectedTab: index});
            }
          }
          className={ `tabs__entry--${isSelectedSuffix}` }>
          <input
            className="tabs__entry-button"
            type="button"
            value={tabData.name}/>
        </li>;

      subComponents.tabButtons.push(tabButton);
      subComponents.tabContents.push(tabContent);
    });

    return (
      <div className="tabs-container">
        <nav>
          <ul className="tabs">{ subComponents.tabButtons }</ul>
        </nav>
        <div className="tabs-contents">
        { subComponents.tabContents }
        </div>
      </div>
    );
  }
}

const validateTabDatas = (props, propName) => {
  const tabDatas = props[propName];

  if (!_.isArray(tabDatas)) {
    return new Error('"tabDatas" must be an Array');
  }

  for (let i = 0; i < tabDatas.length; i += 1) {
    const tabName = tabDatas[i].name;
    if (!_.isString(tabName)) {
      return new Error('Each "tabDatas" item must have a String name');
    }
  }

  return null;
};

TabsComponent.propTypes = {
  tabDatas: validateTabDatas
};

export default TabsComponent;
