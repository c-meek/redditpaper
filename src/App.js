import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      'CityPorn':[],
      'EarthPorn':[],
      'SpacePorn':[]
    };
  }

  componentDidMount() {
    Object.keys(this.state).forEach(function(subreddit) {
      fetch('https://www.reddit.com/r/' + subreddit + '/search.json?q=url%3A.jpg+OR+url%3A.png&sort=top&restrict_sr=on&t=day')
            .then(result=>result.json())
            .then(function(json) {
              var state = {};
              state[subreddit] = json.data.children.slice(0,5);
              this.setState(state);
            }.bind(this));
    }.bind(this));
    

  }

  renderEntry(item) {
      return(
        <Col key={item.data.id} xs={6} md={4}>
          <a href={item.data.url}>
            <Thumbnail src={item.data.thumbnail}>
              <p>{item.data.title}</p>
            </Thumbnail>
          </a>
        </Col>
      );
    
  }

  renderSubreddit(title, index) {
    return(
      <Tab eventKey={title} key={title} title={title}>
        <Panel header={title}>
          <Grid>
            {this.state[title].map(this.renderEntry)}
          </Grid>
        </Panel>
      </Tab>
    );
  }

  render() {
    return (
      <div className="App">
        <PageHeader>redditpaper</PageHeader>
        <Tabs defaultActiveKey={'CityPorn'} id="tabs">
          {Object.keys(this.state).map(key=>this.renderSubreddit(key))}
        </Tabs>
      </div>
    );
  }

}

export default App;
