import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';

import CodeFrequencyComponent from './repo_stats/code_frequency/Component';
import PunchCardComponent from './repo_stats/punch_card/Component';
import CommitActivityComponent from './repo_stats/commit_activity/Component';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const chartTabDatas = [
      {
        name: 'Code Frequency',
        children: <CodeFrequencyComponent />
      },
      {
        name: 'Punch Card',
        children: <PunchCardComponent />
      },
      {
        name: 'Commit Activity',
        children: <CommitActivityComponent />
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
