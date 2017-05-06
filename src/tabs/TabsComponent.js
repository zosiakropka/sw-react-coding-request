import React, { Component } from 'react';
import _ from 'lodash';

class TabsComponent extends Component {
  render() {
    const subComponents = {
      tabButtons: [],
      tabChildren: []
    };

    _.each(this.props.tabDatas, (tabData, index) => {
      const tabButton = <input
        className="tab-button"
        type="button"
        value={tabData.name}
        key={ index }/>;
      const tabContent = <content
        className="tab-content"
        key={ index }>{ tabData.children }</content>;
      subComponents.tabButtons.push(tabButton);
      subComponents.tabChildren.push(tabContent);
    });

    return (
      <div>
        { subComponents.tabButtons }
        { subComponents.tabChildren }
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
