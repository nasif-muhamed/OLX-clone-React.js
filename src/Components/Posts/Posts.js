import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { getProducts } from '../../store/FirebaseContext';
import { Link } from 'react-router-dom';

import r15 from "../../assets/productImages/r15.jpg"
import maruti from "../../assets/productImages/maruti800.jpg"
import i20 from "../../assets/productImages/i20.jpg"
import bmw from "../../assets/productImages/bmw.jpg"
import ducati from "../../assets/productImages/ducati.jpg"
import tv from "../../assets/productImages/tv.jpg"
import intercetor from '../../assets/productImages/interceptor.jpg'
import s24 from "../../assets/productImages/s24.jpg"
import iphone from "../../assets/productImages/iphone.jpg"

function Posts() {
    const [products, setProducts] = useState([]);
    const images = [maruti, ducati, intercetor, s24, tv, r15, bmw, iphone]
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getProducts();
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(items); // Set products in state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards gap-4 flex">
                    {
                        products.map((product, i) => {
                            const index = (i % images.length)
                            console.log(index, i, images.length)
                            return(
                                <Link to={`/product/${product.id}/${index}`} key={product.id}>
                                    <div className="card border border-black">
                                        <div className="favorite">
                                            <Heart></Heart>
                                        </div>
                                        <div className="image">
                                            <img src={images[index]} alt="product" />
                                        </div>
                                        <div className="content">
                                            <p className="rate">&#x20B9; {product.price}</p>
                                            <span className="kilometer font-bold">{product.title}</span>
                                            <p className="name font-bold"> {product.category}</p>
                                        </div>
                                        <div className="date flex justify-between">
                                            <span>{product.location}</span>
                                            <span>{product.createdAt && product.createdAt.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards ">
                    {
                        products.map((product, i) => {
                            const index = images.length-(i % images.length + 1)
                            console.log(index)

                            return (
                                <Link to={`/product/${product.id}/${index}`} key={product.id}>
                                    <div  className="card border border-black">
                                        <div className="favorite">
                                            <Heart></Heart>
                                        </div>
                                        <div className="image">
                                            <img src={images[index]} alt="product" />
                                        </div>
                                        <div className="content">
                                            <p className="rate">&#x20B9; {product.price}</p>
                                            <span className="kilometer font-bold">{product.title}</span>
                                            <p className="name font-bold"> {product.category}</p>
                                        </div>
                                        <div className="date flex justify-between">
                                            <span>{product.location}</span>
                                            <span>{product.createdAt && product.createdAt.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        
                    }
                </div>
            </div>

        </div>
    );
}

export default Posts;
