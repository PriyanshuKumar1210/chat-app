
import NavBar from '../Components/NavBar.jsx'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <div>
            <>
                <NavBar />
                <Outlet />
               
            </>
        </div>
    )
}

export default Layout
