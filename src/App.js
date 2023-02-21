import {useSelector} from 'react-redux'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn";
import Company from "./components/Company";
import SignUp from "./components/SignUp";
import Unauthorized from "./components/Unauthorized";

function App() {

  const auth = useSelector(state => state.auth)

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='test-front' element={<SignIn/>}/>
                <Route path='signUp' element={<SignUp/>}/>

                {
                    auth.userToken ? <Route path='company' element={<Company />}/>
                        : <Route path='company' element={<Unauthorized/>}/>
                }
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
