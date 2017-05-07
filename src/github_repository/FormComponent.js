import React, { Component } from 'react';
import mediator from './../Mediator';
import './FormComponent.css';

const DEFAULT_REPO = 'git@github.com:nodejs/node.git';

const publishRepoUrl = (repoUrl) => {
  mediator.emit('github_repo:entered', {'repoUrl': repoUrl});
};

class FormComponent extends Component {
  constructor() {
    super();
    this._handleRepoEntered = this._handleRepoEntered.bind(this);
  }
  render() {
    return (
      <form className="repository-form" onChange={this._handleRepoEntered}>
        <input
          className="repository-form__repo-url"
          type="text"
          ref={(ref) => {
            this._repoUrlRef = ref;
          }}/>
      </form>
    );
  }

  componentDidMount () {
    this._repoUrlRef.value = DEFAULT_REPO;
    publishRepoUrl(DEFAULT_REPO);
  }

  _handleRepoEntered(event) {
    const repoUrl = this._repoUrlRef.value;
    publishRepoUrl(repoUrl);
    event.preventDefault();
  }
}

export default FormComponent;
