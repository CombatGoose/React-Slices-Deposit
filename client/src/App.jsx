import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './Components/Auth';
import Header from './Components/Header';
import User from './Components/User';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Auth/>} />
                <Route path='/user' element={<User/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;