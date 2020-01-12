import React, { MouseEvent } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_LIST } from "../../graphql/mutations";
import styled from "styled-components";
import { Container, Segment, Header, Button, Icon, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

const NavbarContainer = styled.div`
  margin-bottom: 10px;
`;

type TodoListIntroProps = {
  text: string;
};

const TodoListIntro: React.FC<TodoListIntroProps> = ({ text }) => {
  const [createTodoList, { data }] = useMutation(CREATE_TODO_LIST);
  
  const history = useHistory();


    if (data) {
      console.log(data.createTodoList.id)
       history.replace(`/${data.createTodoList.id}`)
       return (
          <Container textAlign="center" style={{ margin: 20 }}>
             <Input focus placeholder="Add todo" />
          </Container>
       )
    }

  return (
    <div>
      <Container style={{ margin: 20 }}>
        <Segment placeholder raised>
          <Header icon>
            <Icon name="edit outline" />
            You have no todos!
          </Header>
          <Button primary onClick={handleOnClick(createTodoList)}>Add one!</Button>
        </Segment>
      </Container>
    </div>
  );
};

const handleOnClick = (createTodoList: Function) => (e: MouseEvent) => {
  e.preventDefault();
  createTodoList();
};

export default TodoListIntro;
