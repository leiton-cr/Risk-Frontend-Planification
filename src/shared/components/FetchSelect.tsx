/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import Select from "react-select";

interface Props {
  id: string;
  state: string;
  onInput: FormEventHandler;
  size?:string;
}

const pluralizeMap: any = {
  impact: "impacts",
  priority: "priorities",
  probability: "probabilities",
  project: "projects",
};

const FetchSelect = ({ id, state, onInput, size}: Props) => {
  const pluralId = pluralizeMap[id];

  const { getData } = useFetch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getData(`https://localhost:7071/${pluralId}`).then((response) => {
      setOptions(response);
    });
  }, []);

  return (
    <select
      style={{ width: size}}
      className="form-select"
      value={state}
      onChange={onInput}
      id={id}
    >
      <option disabled={true} value={"-1"}>
        Select {id}
      </option>
      {options.map((option: { id: string; name: string }, i) => (
        <option key={i} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FetchSelect;
