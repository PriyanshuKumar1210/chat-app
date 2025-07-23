
import NavBar from './Components/NavBar'
import { Routes ,Route, Navigate} from 'react-router'
import Home from "../src/pages/Home.jsx"
import Signup from "../src/pages/Signup.jsx"
import Login from "../src/pages/Login.jsx"
import Profile from "../src/pages/Profile.jsx"
import Setting from "../src/pages/Setting.jsx"
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import Spinner from './Components/Spinner.jsx'
import {ToastContainer} from 'react-toastify'
// import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  //pass a state into the custom hook we created; this state will now be used to set and update the values

  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();

  useEffect(()=>{
    checkAuth()
  }, [checkAuth] );



//checking that user is autorized or not
  if(isCheckingAuth && !authUser){
    return (
        <Spinner />
    );
  }
  
  return (
    <div>
      <NavBar />

{/* Routes of diiferent pages */}
      <Routes>

        <Route path='/' element={ authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />}  />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/settings' element={<Setting/>} />
        <Route path='/profile' element={ authUser ? <Profile /> : <Navigate to="/login" />} />

      </Routes>


      <ToastContainer />
    </div>
  )
}

export default App
