import React from "react";
import { Segment, Checkbox } from "semantic-ui-react";
import { useMutation, MutationHookOptions } from "@apollo/react-hooks";
import { COMPLETE_TODO, UNCOMPLETE_TODO } from "../../graphql/mutations";

interface TodoProps {
  id: string;
  description: string;
  complete: boolean;
}

const Todo: React.FC<TodoProps> = ({
  id,
  description,
  complete,
}) => {
  const [completeTodo] = useMutation(COMPLETE_TODO);
  const [uncompleteTodo] = useMutation(UNCOMPLETE_TODO);

  return (
    <>
      <Segment>
        <Checkbox
          label={description}
          onChange={handleOnChange(
            id,
            completeTodo,
            uncompleteTodo,
          )}
          checked={complete}
        />
      </Segment>
    </>
  );
};

const handleOnChange = (
  id: string,
  completeTodo: Function,
  uncompleteTodo: Function,
) => (e: React.FormEvent<HTMLInputElement>, d: any) => {
  console.log(d.checked);
  const options: MutationHookOptions = { variables: { id }, refetchQueries: ["GET_TODO_LIST"] }

  if (d.checked) {
    completeTodo(options);
  } else {
    uncompleteTodo(options)
  }

};

export default Todo;
