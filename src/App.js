import React, { Component } from 'react';
import './App.css';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';

class App extends Component {
  render() {

    const chartTabDatas = [];

    return (
      <div className="App">
        <RepoFormComponent/>
        <TabsComponent tabDatas={chartTabDatas}/>
      </div>
    );
  }
}

export default App;
