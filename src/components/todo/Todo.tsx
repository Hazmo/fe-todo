import React, { useState } from "react";
import { Segment, Checkbox } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_TODO, UNCOMPLETE_TODO } from "../../graphql/mutations";

interface TodoProps {
  id: string;
  description: string;
  complete: boolean;
  refetchTodoList: Function;
}

const Todo: React.FC<TodoProps> = ({
  id,
  description,
  complete,
  refetchTodoList
}) => {
  const [completeTodo] = useMutation(COMPLETE_TODO);
  const [uncompleteTodo] = useMutation(UNCOMPLETE_TODO);
  const [checked, setChecked] = useState(complete);

  return (
    <>
      <Segment>
        <Checkbox
          label={description}
          onChange={handleOnChange(
            id,
            completeTodo,
            uncompleteTodo,
            setChecked,
            refetchTodoList
          )}
          checked={checked}
        />
      </Segment>
    </>
  );
};

const handleOnChange = (
  id: string,
  completeTodo: Function,
  uncompleteTodo: Function,
  setChecked: Function,
  refetchTodoList: Function
) => (e: React.FormEvent<HTMLInputElement>, d: any) => {
  console.log(d.checked);
  const options = { variables: { id } }
  setChecked(d.checked)

  if (d.checked) {
    completeTodo(options);
  } else {
    uncompleteTodo(options)
  }

  refetchTodoList();
};

export default Todo;
