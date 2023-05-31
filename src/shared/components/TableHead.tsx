
interface Props{
    headers: Array<string>
}

const TableHead = ({headers}:Props) => {
  
   
  
    return (
    // <thead>
    //     <tr>
    //         { headers.map((header) => <th key={header}>{header}</th>) }    
    //     </tr>
    // </thead>

    <thead>
  <tr>
    {headers.map((header, index) => (
      <th key={header} className={index === headers.length - 1 ? 'sticky-delete bg-light' : ''}>
        {header}
      </th>
    ))}
  </tr>
</thead>
  )
}

export default TableHead