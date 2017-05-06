import React, { Component } from 'react';
import mediator from './../Mediator';
import './FormComponent.css';

const DEFAULT_REPO_ENTERED = 'git@github.com:nodejs/node.git';

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
          defaultValue={ DEFAULT_REPO_ENTERED }
          ref={(ref) => {
            this._repoUrlRef = ref;
          }}/>
      </form>
    );
  }

  _handleRepoEntered(event) {
    const repoUrl = this._repoUrlRef.value;
    mediator.emit('github_repo:entered', {'repoUrl': repoUrl});
    event.preventDefault();
  }
}

export default FormComponent;
