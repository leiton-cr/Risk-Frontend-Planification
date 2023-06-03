/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

interface Props {
  id: string;
  state: string;
  onInput: FormEventHandler;
  size?: string;
  isColorized?: boolean;
}

const pluralizeMap: any = {
  impact: "impacts",
  priority: "priorities",
  probability: "probabilities",
  project: "projects",
};

const FetchSelect = ({ id, state, onInput, size, isColorized }: Props) => {
  const pluralId = pluralizeMap[id];
  const [selectedOption, setSelectedOption] = useState("");
  const handleInputChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const getBorderColor = () => {
    const colors = ["#3AB34A", "#2F903B", "#F8EB10", "#F79122", "#BB121A"];
    if (selectedOption !== "") {
      return colors[parseInt(selectedOption) - 1];
    } else {
      const index = parseInt(state) % 5;

      return colors[index - 1];
    }
  };

  const { getData } = useFetch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getData(`https://localhost:7071/${pluralId}`).then((response) => {
      setOptions(response);
    });
  }, []);

  return (
    <select
      style={{
        width: size,
        border: isColorized ? `1px solid ${getBorderColor()}` : "",
      }}
      className="form-select"
      value={state}
      onChange={(event) => {
        onInput(event);
        handleInputChange(event);
      }}
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
