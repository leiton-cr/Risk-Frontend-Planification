/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { matrixRowHeaders, matrixcColHeaders } from "../../utils/helpers";
import "./matrix.css"
import useAlerts from "../../hooks/useAlerts";

const Matrix = () => {

    const { id } = useParams();

    const {toastAlert} = useAlerts()

    if(!id){
        toastAlert("No matrix provided", "error")
    }

    const handleClick = (e: any) => {
        const probability = e.target.dataset.probability;
        const impact = e.target.dataset.impact;

        if (probability && impact) {
            console.log(probability, impact);
        }
    }

    return (
        <>
            {id}
            <div className="matrix_axis">Impact</div>
            <div className="matrix_container">
                <div className="matrix_axis">Probability</div>
                <table className="matrix">
                    <thead>
                        <tr> {matrixRowHeaders.map((header, i) => <th key={i}>{header}</th>)} </tr>
                    </thead>
                    <tbody onClick={handleClick}>
                        {[1, 2, 3, 4, 5].map(i =>
                            <tr key={i}>
                                {
                                    [0, 1, 2, 3, 4, 5].map(j => (j == 0) ?
                                        <td key={j}> {matrixcColHeaders[i - 1]} </td> :
                                        <td key={j} className={`mat_cell p-${i} i-${j}`} data-probability={i} data-impact={j}>{i * j}</td>
                                    )
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Matrix