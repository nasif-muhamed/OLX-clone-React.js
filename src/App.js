
// App.js
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ReverselyProtectedRoute from './Components/Protected/ReverselyProtectedRoute';
import ProtectedRoute from './Components/Protected/ProtectedRoute';
import Sell from './Pages/Sell';
import { FirebaseProvider } from './store/FirebaseContext';
import ProductDetails from './Pages/ProductDetails';
import Header from './Components/Header/Header'

import Footer from './Components/Footer/Footer';
import NotFound from './Pages/NotFound';
import GoogleSignIn from './Pages/GoogleSignIn';
import { useState } from 'react';


function App() {
    

    return (
        <div className="App">
            <Router>
                <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signup' element={<ReverselyProtectedRoute><Signup /></ReverselyProtectedRoute>} />
                        <Route path='/login' element={<ReverselyProtectedRoute><Login /></ReverselyProtectedRoute>} />
                        <Route path='/sell' element={<ProtectedRoute><Sell /></ProtectedRoute>} />
                        <Route path='/product/:productId/:index' element={<ProductDetails />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
