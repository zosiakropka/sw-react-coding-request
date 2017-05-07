import React, { Component } from 'react';
import './App.css';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';

import { default as CodeFrequencyComponent } from './repo_stats/code_frequency/Component';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const chartTabDatas = [
      {
        name: 'Code Frequency',
        children:
          <CodeFrequencyComponent />
      }
    ];

    return (
      <div className="App">
        <RepoFormComponent />
        <TabsComponent tabDatas={chartTabDatas} />
      </div>
    );
  }
}

export default App;
