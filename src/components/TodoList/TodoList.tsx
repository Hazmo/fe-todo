import React, { FormEvent, useState, SyntheticEvent } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_TODO } from "../../graphql/mutations";
import styled from "styled-components";
import {
  Container,
  Segment,
  Header,
  Button,
  Icon,
  Input,
  Form,
  Checkbox
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { GET_TODO_LIST } from "../../graphql/queries";
import Todo from "../todo/Todo";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;
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

  const { loading, error, data, refetch: refetchTodoList } = useQuery(
    GET_TODO_LIST,
    {
      variables: { todoListId },
      // pollInterval: 500
    }
  );
  console.log(data);
  const [createTodo] = useMutation(CREATE_TODO);
  const [description, setDescription] = useState("");

  return (
    <Container textAlign="center" style={{ margin: 20 }}>
      {renderTodos(data, refetchTodoList)}
      <Form
        onSubmit={handleOnSubmit(
          createTodo,
          todoListId,
          description,
          refetchTodoList,
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

const renderTodos = (data: any, refetchTodoList: Function) => {
  if (data) {
    const todos = data.getTodoList && data.getTodoList.todos;
    return (
      <>
        {todos.map((todo: Todo, index: number) => (
          <Todo key={index} id={todo.id} description={todo.description} complete={todo.complete} refetchTodoList={refetchTodoList}/>
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
  refetchTodoList: Function,
  setDescription: Function
) => (e: any) => {
  e.preventDefault();
  console.log(e);
  createTodo({ variables: { todoListId, description } });
  refetchTodoList();
  setDescription("");
};

export default TodoList;
