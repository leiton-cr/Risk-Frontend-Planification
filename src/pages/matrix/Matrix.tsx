/* eslint-disable @typescript-eslint/no-explicit-any */

import { matrixRowHeaders, matrixcColHeaders } from "../../utils/helpers";
import RegisterCard from "./components/RegisterCard";
import "./matrix.css"
import useMatrix from "./useMatrix";

import ScrollToTop from "./components/ScrollToTop";

const Matrix = () => {

    const { handleClick, loadContent, pickedRegisters } = useMatrix();

    return (
        <>

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
                                        <td key={j} className={`mat_cell p-${i} i-${j}`} data-probability={i} data-impact={j}>{loadContent(i, j)}</td>
                                    )
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pickedRegisters && (pickedRegisters as any).length > 0 && <div className="card-container-title">Attached registers</div>}

            <div className="register__card-container">
                {pickedRegisters && (pickedRegisters as any).map((risk: any) => <RegisterCard risk={risk} />)}
            </div>

            <ScrollToTop />

        </>
    )
}

export default Matrix