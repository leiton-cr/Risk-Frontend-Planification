
interface Props{
    headers: Array<string>
}

const TableHead = ({headers}:Props) => {
  
   
  
    return (
    <thead>
        <tr>
            { headers.map((header) => <th key={header}>{header}</th>) }    
        </tr>
    </thead>
  )
}

export default TableHead