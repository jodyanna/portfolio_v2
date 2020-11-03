import React from "react";
import GitRepoPercentBar from "./GitRepoPercentBar";
import {ajaxRequest} from "../../util";
import styles from "../../styles/modules/GitAccount.module.css";


export default class GitAccountSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const promise = this.githubAPIRequest(this.props.username);
    promise.then(data => data.map(obj => obj.name))
      .then(data => this.setState({isLoading: false, repos: data}));
  }

  githubAPIRequest(username) {
    return ajaxRequest(`https://api.github.com/users/${username}/repos`)
  }

  render() {
    const renderOverview = () => {
      if (!this.state.isLoading) {
        return (
          <span>Programming languages across <a href={`https://github.com/${this.props.username}?tab=repositories`}>
          {this.state.repos.length}</a> repositories</span>
        );
      }
    }

    const renderBar = () => {
      if (!this.state.isLoading) {
        return <GitRepoPercentBar username={this.props.username} repos={this.state.repos} />
      }
    }

    return(
      <div className={styles.container}>
        <h3>GitHub Summary</h3>
        {this.props.hr}
        {renderOverview()}
        {renderBar()}
      </div>
    )
  }
}