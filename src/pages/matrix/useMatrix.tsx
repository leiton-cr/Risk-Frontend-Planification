/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAlerts from "../../hooks/useAlerts";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const useMatrix = () => {

    const { id } = useParams();

    const { toastAlert } = useAlerts()

    const { getData } = useFetch();

    const navigate = useNavigate();

    const [register, setRegister] = useState(null);

    const [pickedRegisters, setPickedRegisters] = useState(null);



    if (!id) {
        toastAlert("No matrix provided", "error") 
    }

    useEffect(() => {
        getData(`https://localhost:7071/Register/${id}`)
            .then(res => {
                if (res.status && res.status == "error") {
                    toastAlert("Error fetching the register", "error")
                    return navigate("/")
                }
                setRegister(res);
            })

    }, [])

    const handleClick = (e: any) => {
        const probability = e.target.closest("td").dataset.probability;
        const impact = e.target.closest("td").dataset.impact;

        if (probability && impact) {
            setPickedRegisters(getRegistersByParams(probability, impact));
        }
    }

    const getRegistersByParams = (probability: number, impact: number) => {
        if (!register) return;
        return (register as any).tblDetails.filter((detail: any) => (detail.impact.value + 1 == impact && detail.probability.value + 1 == probability))
    }

    const loadContent = (probability: number, impact: number) => {
        if (!register) return;
        const sortedRegisters = getRegistersByParams(probability, impact)
        if (sortedRegisters.length == 0) return

        return <><p>{`Risk Count ${sortedRegisters.length}`}</p><p>{`Total Points ${probability * impact * sortedRegisters.length}`}</p></>
    }

    useEffect(() => {

        if ( pickedRegisters && (pickedRegisters as any).length > 0) {
            window.scrollTo({
                top: 600,
                behavior: 'smooth',
            });
        }

    }, [pickedRegisters])


    return { id, handleClick, loadContent, pickedRegisters }
}

export default useMatrix