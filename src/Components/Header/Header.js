
import React, {useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useFirebase } from '../../store/FirebaseContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../Pages/GoogleSignIn';

function Header() {
    const { user, logOut } = useFirebase()
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="brandName">
                    <Link to='/' ><OlxLogo></OlxLogo></Link>
                </div>
                <div className="placeSearch">
                    <Search></Search>
                    <input type="text" />
                    <Arrow></Arrow>
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Find car,mobile phone and more..."
                        />
                    </div>
                    <div className="searchAction">
                        <Search color="#ffffff"></Search>
                    </div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    <Arrow></Arrow>
                </div>
                <div className="loginPage ">
                    {
                        user ? 
                        <div className='relative group'> 
                            <button className='' onClick={() => {
                                logOut()
                                navigate('/login')
                            }}>Log Out</button> 
                            <span className="pt-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap min-w-max">
                            {user.displayName}
                            </span>
                        </div>

                        : 
                        <button onClick={()=>setIsModalOpen(true)} >Log in</button>
                    }
                    <hr />

                </div>
                <div className="sellMenu">
                    <Link to='/sell'>
                        <SellButton></SellButton>
                        <div className="sellMenuContent">
                            <SellButtonPlus></SellButtonPlus>
                            <span>SELL</span>
                        </div>
                    </Link>
                </div>
            </div>
            {isModalOpen && <GoogleSignIn onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default Header;
