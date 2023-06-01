import { useState } from 'react';

// Componente de selección de opciones
export function SearchOptionSelect({ onChange }:any) {
  const [selectedOption, setSelectedOption] = useState('id');

  const handleOptionChange = (event:any) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select className='form-select mb-3' value={selectedOption} onChange={handleOptionChange}>
      <option value="id">ID</option>
      <option value="taskId">Task ID</option>
      <option value="projectName">Project Name</option>
      <option value="taskDescription">Task Description</option>
    </select>
  );
}