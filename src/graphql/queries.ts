import gql from "graphql-tag"

export const GET_TODO_LIST = gql`
   query GET_TODO_LIST($todoListId: ID!) {
      getTodoList(id: $todoListId) {
         id
         todos {
            id
            description
            complete
         }
      }
   }
`

export const GET_TODO_LIST_CACHE = gql`
   query GET_TODO_LIST($todoListId: ID!) {
      getTodoList(id: $todoListId) {
         id
         todos {
            id
            description
            complete @client
         }
      }
   }
`