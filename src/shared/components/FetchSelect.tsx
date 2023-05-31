/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

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
// import { FormEventHandler, useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch";
// import Select from "react-select";
// import { CSSProperties } from "react";

// interface Option {
//   id: string;
//   name: string;
// }

// interface Props {
//   id: string;
//   state: string;
//   onInput: FormEventHandler;
//   size?: string;
// }

// const pluralizeMap: any = {
//   impact: "impacts",
//   priority: "priorities",
//   probability: "probabilities",
//   project: "projects",
// };

// const FetchSelect = ({ id, state, onInput, size }: Props) => {
//   const pluralId = pluralizeMap[id];
//   console.log(pluralId);

//   const { getData } = useFetch();
//   const [options, setOptions] = useState<Option[]>([]);

//   const updatedOptionsx = options.map((option) => ({
//     value: option.id,
//     label: option.name,
//   }));

//   console.log(updatedOptionsx);

//   useEffect(() => {
//     getData(`https://localhost:7071/${pluralId}`).then((response: Option[]) => {
//       setOptions(response);
//     });
//   }, []);

//   return (
//     <div style={{ width: size }}>
//       <Select
//         value={state}
//         onChange={() => onInput}
//         id={id}
//         options={updatedOptionsx}
//         placeholder={`Select ${id}`}
//       />
//     </div>
//   );
// };

