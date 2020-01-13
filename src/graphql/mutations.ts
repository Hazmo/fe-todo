import gql from "graphql-tag"

export const CREATE_TODO_LIST = gql`
   mutation {
      createTodoList {
         id
      }
   }
`;

export const CREATE_TODO = gql`
   mutation createTodo($todoListId: ID!, $description: String!) {
      createTodo(todoListid: $todoListId, description: $description) {
         id
         description
         complete
      }
   }
`;

export const COMPLETE_TODO = gql`
   mutation COMPLETE_TODO($id: ID!) {
      completeTodo(id: $id) {
         id
         complete
      }
   }
`;

export const UNCOMPLETE_TODO = gql`
   mutation UNCOMPLETE_TODO($id: ID!) {
      uncompleteTodo(id: $id) {
         id
         complete
      }
   }
`;