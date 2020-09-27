import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DirectorsTable from './components/DirectorsTable/DirectorsTable';
import MoviesList from './components/DirectorsTable/MoviesList/MoviesList';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={DirectorsTable}/>
            <Route path="/director/:id" component={MoviesList}/>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
