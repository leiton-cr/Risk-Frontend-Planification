/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props{
    index: number
    data: any
    handleDelete: any
}

const DataRow = ({index, data, handleDelete}:Props) => {

  return (
    <tr>
        {
            Object.values(data).map((value:any, i) => <td key={i}>{value.val}</td>)
        }
        <td> <button onClick={()=>{handleDelete(index)}}>Del</button> </td>
    </tr>
  )
}

export default DataRow