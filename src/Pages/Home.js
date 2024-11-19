
import React from 'react';

import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import { getProducts } from '../store/FirebaseContext';

function Home(props) {

  return (
    <div className="homeParentDiv">
      
      <Banner />
      <Posts />
      
    </div>
  );
}

export default Home;
 
