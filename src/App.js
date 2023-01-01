import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Crud from './components/Crud_Table/Crud_Table';
import Home from './Home';

const App = () => {
    const [login, setLogin] = useState(false);

    return ( 
        <div>
            <Routes>
                <Route element={<Crud />} path="/inventory" />
                <Route element={<Home setLogin={setLogin} />} path="/" />
            </Routes>
        </div>
     );
}
 
export default App;