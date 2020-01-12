import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoListIntro from "./components/TodoListIntro/TodoListIntro";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./graphql/graphqlClient";
import TodoList from "./components/TodoList/TodoList";

export default function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/">
            <TodoListIntro text="hello" />
          </Route>
          <Route path="/:todoListId">
            <TodoList />
          </Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}
