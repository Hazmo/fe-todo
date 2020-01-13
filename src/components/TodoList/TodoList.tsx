import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  MutationHookOptions
} from "@apollo/react-hooks";
import { CREATE_TODO } from "../../graphql/mutations";
import { Container, Form } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { GET_TODO_LIST } from "../../graphql/queries";
import Todo from "../todo/Todo";

interface Todo {
  id: string;
  description: string;
  complete: boolean;
}

interface TodoList {
  id: string;
}

interface Params {
  todoListId: string;
}

const TodoList: React.FC = () => {
  const { todoListId } = useParams<Params>();

  const { data } = useQuery(GET_TODO_LIST, {
    variables: { todoListId }
  });
  console.log(data);
  const [createTodo] = useMutation(CREATE_TODO);
  const [description, setDescription] = useState("");

  return (
    <Container textAlign="center" style={{ margin: 20 }}>
      {renderTodos(data)}
      <Form
        onSubmit={handleOnSubmit(
          createTodo,
          todoListId,
          description,
          setDescription
        )}
      >
        <Form.Input
          focus
          placeholder="Add todo"
          onChange={handleOnChange(setDescription)}
          value={description}
        />
      </Form>
    </Container>
  );
};

const renderTodos = (data: any) => {
  if (data) {
    const todos = data.getTodoList && data.getTodoList.todos;
    return (
      <>
        {todos.map((todo: Todo, index: number) => (
          <Todo
            key={index}
            id={todo.id}
            description={todo.description}
            complete={todo.complete}
          />
        ))}
      </>
    );
  }

  return null;
};

const handleOnChange = (setDescription: Function) => (
  e: React.FormEvent<HTMLInputElement>
) => {
  e.preventDefault();
  setDescription(e.currentTarget.value);
};

const handleOnSubmit = (
  createTodo: Function,
  todoListId: string,
  description: string,
  setDescription: Function
) => (e: any) => {
  e.preventDefault();
  const options: MutationHookOptions = {
    variables: { todoListId, description },
    refetchQueries: ["GET_TODO_LIST"]
  };

  createTodo(options);
  setDescription("");
};

export default TodoList;
