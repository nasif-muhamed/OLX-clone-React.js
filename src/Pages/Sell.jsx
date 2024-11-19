import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeProduct, useFirebase } from '../store/FirebaseContext';

const Sell = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    // const [imageFile, setImageFile] = useState(null);
    // const [imageURL, setImageURL] = useState(null);

    const { user } = useFirebase()
    

    // const handleFileChange = (e) => {
    //     if (e.target.files[0]) {
    //         setImageFile(e.target.files[0]);
    //     }
    // };

    // Handle image upload

    // const handleUpload = async () => {
    //     if (!imageFile) return;

    //     try {
    //         // Reference to Firebase Storage
    //         const imageRef = ref(storage, `images/${imageFile.name}`);

    //         // Upload the image
    //         await uploadBytes(imageRef, imageFile);

    //         // Get the download URL
    //         const downloadURL = await getDownloadURL(imageRef);
    //         setImageURL(downloadURL); // Update the state with the download URL

    //         // Save the image URL to Firestore
    //         await addDoc(collection(db, 'products'), {
    //             imageUrl: downloadURL,
    //             createdAt: new Date(),
    //         });

    //         alert('Image uploaded successfully!');
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //         alert('Error uploading image, please try again.');
    //     }
    // };

    const handleSubmit = () => {
        try{
            if (title && category && description && price && location && phone){
                let phoneNum = String(parseInt(phone))
                if (phoneNum.length == 10){
                    const userId = user.uid
                    storeProduct(userId, title, category, description, price, location, phone)
                    setTitle('')
                    setDescription('')
                    setPrice('')
                    setLocation('')
                    setPhone('')
                    setPhoto('')
                    setCategory('')
                    navigate('/')
                }else{
                    setError('Enter a valid phone number')
                }
            }else{
                setError('Fill all the field')
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product, please try again.');
        }

    }

    return (
        <div className='w-full '>
            <Link to='/'><button className='m-4 p-2 rounded bg-black text-white'>Home</button></Link>
            <div className="max-w-2xl border border-black mx-auto p-6 space-y-6">
                <h1 className='text-center font-bold text-xl'>POST YOUR AD</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-6">
                        <h2 className="text-sm font-semibold mb-4">INCLUDE SOME DETAILS</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Title*</label>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    type="text"
                                    className="w-full border rounded-md p-2"
                                    placeholder="Enter title"
                                />

                                <label className="block text-sm mb-1">Category*</label>
                                <input
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    type="text"
                                    className="w-full border rounded-md p-2"
                                    placeholder="Enter Category"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Description*</label>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-full border rounded-md p-2 h-32"
                                    placeholder="Describe what you're listing..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-sm font-semibold mb-4">SET A PRICE</h2>
                        <div>
                            <label className="block text-sm mb-1">Price*</label>
                            <div className="flex items-center">
                                <span className="mr-2">₹</span>
                                <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    type="number"
                                    className="border rounded-md p-2 w-32"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-sm font-semibold mb-4">UPLOAD A PHOTO</h2>
                        <div className="grid gap-4">
                            <div className={`w-[50%] relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors`}>
                                <input onChange={(e) => setPhoto(e.target.files[0])}
                                    required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*" />
                                <img src="data:image/png;base64,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" alt="" />
                                <p className="text-xs text-gray-500">Click or drag to upload</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Click to add photos</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-sm font-semibold mb-4">CONFIRM YOUR LOCATION</h2>
                        <div>
                            <input onChange={(e) => setLocation(e.target.value)}
                                required className="w-full border rounded-md p-2" placeholder='Enter Location' />
                        </div>
                    </div>

                    {/* Review Details */}
                    <div className="mb-6">
                        <div className="mt-4">
                            <label className="block text-sm mb-1">Mobile Phone Number*</label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                type="tel"
                                className="w-full border rounded-md p-2"
                                placeholder="+91 9999 9999 99"
                            />
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-xs my-2 text-center'>{error}</p>}
                    {/* Submit Button */}
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white rounded-md py-3 hover:bg-blue-700">
                        Post now
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Sell





