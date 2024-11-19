
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../store/FirebaseContext'
import { MapPin, Clock, Calendar, CircleChevronRight } from 'lucide-react';

import maruti from '../assets/productImages/maruti800.jpg'
import r15 from "../assets/productImages/r15.jpg"
import i20 from "../assets/productImages/i20.jpg"
import bmw from "../assets/productImages/bmw.jpg"
import ducati from "../assets/productImages/ducati.jpg"
import tv from "../assets/productImages/tv.jpg"
import intercetor from '../assets/productImages/interceptor.jpg'
import s24 from "../assets/productImages/s24.jpg"
import iphone from "../assets/productImages/iphone.jpg"

function ProductDetails() {
    const { productId, index } = useParams();
    const [product, setProduct] = useState(null);

    const images = [maruti, ducati, intercetor, s24, tv, r15, bmw, iphone]
    const navigate = useNavigate()

    useEffect(() => {
        const productDetails = async () => {
            const [productObject, seller] = await fetchProduct(productId)
            if (seller) {
                setProduct({ ...productObject, seller: seller[0].toUpperCase() + seller.substring(1) });
                console.log(productObject)
            } else {
                console.log('No such document!');
                navigate('*')
            }
        }

        productDetails();
    }, [productId]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className='bg-slate-200 min-h-screen pt-16'>
            <div className=" shadow-md rounded-lg overflow-hidden ">
                <div className='bg-black w-full flex justify-center my-5'>
                <img src={images[index]} alt="Vehicle" className="w-[50%] object-cover" />
                </div>
                <div className=' flex justify-center mb-5'>
                    <div className='bg-white lg:flex w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]'>

                        <div className='lg:w-[60%]'>
                            <div className="p-5">
                                <div className='m-5'>
                                    <h3 className="font-bold text-3xl">{product.title}</h3>
                                </div>
                                <div className='m-5'>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-500 font-bold text-sm">{product.location}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-500 font-bold text-sm">{product.createdAt && product.createdAt.toDate().toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-500 font-bold text-sm">{product.category}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='m-5'>
                                    <h1 className='font-bold'>Description</h1>
                                    <p className='text-gray-500'>{product.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className='lg:w-[40%] p-5'>
                            <div className='m-5'>
                                <h1 className="text-green-950 text-3xl font-bold">₹ {product.price}</h1>
                                <button className="text-white bg-green-950 text-xl font-bold px-4 rounded">Make Offer</button>
                            </div>

                            <div className='m-5'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center '>
                                        <img className='w-[20%]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="" />
                                        <h1 className='ml-2 text-xl'>{product.seller}</h1>
                                    </div>
                                    <CircleChevronRight size={40} />
                                </div>
                                <div className='text-center mt-4'><button className='text-green-950 border-2 border-green-950 font-bold px-4 rounded-lg hover:border-4'>Chat with Seller</button></div>
                            </div>

                            <div className='w-full aspect-square'><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=calicut+(Calicut)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">
                                gps Seller tracker
                            </a></iframe></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails