/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, useEffect, useState } from 'react'
import useFetch from '../../utils/useFetch'

interface Props {
    id: string,
    state: string,
    onInput: FormEventHandler
}

const pluralizeMap:any = { impact: "impacts", priority: "priorities", probability: "probabilities", project: "projects" }

const FetchSelect = ({ id, state, onInput}: Props) => {
    const pluralId = pluralizeMap[id]
   
    const { getData } = useFetch();
    const [options, setOptions] = useState([])

    useEffect(() => {
        getData(`https://localhost:7071/${pluralId}`)
            .then((response => {
                setOptions(response)
            }));

    }, [])

    return (
        <select value={state} onChange={onInput} id={id}>
            <option disabled={true} value={"-1"}>Select {id}</option>
            {
                options.map((option: {id:string, name:string}, i) => <option key={i} value={option.id}>{option.name}</option>)
            }
        </select>
    )
}

export default FetchSelect