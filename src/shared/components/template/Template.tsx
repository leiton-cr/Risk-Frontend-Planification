import  { useContext, ReactElement} from 'react'
import "./template.css"
import icon from '/app_ico.png'
import { AuthContext } from '../../../contexts/AuthProvider'

interface Props {
    title: string
    children: ReactElement
}

const Template = ({ title, children }: Props) => {

    const { logout } = useContext(AuthContext);

    return (
        <>
            <header className='template_header'>
                <h1 className='template_title'>{title}</h1>
                <div className='header_logo'>
                    <button onClick={logout}>Logout</button>
                    <img src={icon} className='template_image'/>
                </div>
            </header>
                {children}
            <footer>
                &copy; Copyright 2023
            </footer>
        </>
    )
}

export default Template