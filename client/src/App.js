import React from 'react'; 

// Route will be used to define the different routes of our application 

import {Route, Routes} from "react-router-dom"; 

// import the component we will need 

import Navbar from "./components/navbar"; 
import SubscriptionList from './components/recordList';
import Edit from './components/edit';
import Create from './components/create';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<SubscriptionList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App; 