import React, { useEffect } from 'react'
import { useState } from "react";
import { addProductApi, deleteProductApi, getAllProductApi, getCount } from '../../../apis/Api';

import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
const Admindashboard = () => {

    const [productImage, setproductImage] = useState(null);
    const [previewImage, setpreviewImage] = useState(null);
    const [productName, setproductName] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [productCategory, setproductCategory] = useState('');

    //for count
    const [productCount, setProductCount] = useState(0)
    const [pendingOrderCount, setPendingOrderCount] = useState(0)
    const [deliveredOrderCount, setDeliveredOrderCount] = useState(0)
    const [userCount, setUserCount] = useState(0)


    //for response data
    const [products, setproducts] = useState([]);
    const handleImageupload = (event) => {

        setproductImage(event.target.files[0])

        const reader = new FileReader()
        reader.onload = () => {

            setpreviewImage(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])

    }


    //handel asubmit
    const handleSubmit = () => {

        if (!validate()) {
            return;
        }

        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        formData.append('productImage', productImage)

        addProductApi(formData).then(res => {
            toast.success("product added successfully")
        }).catch(err => {
            toast.error("product add failed!")
        })

    }
    // handling delete
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("are you sure you you want to delete?")
        if (confirmDelete) {
            deleteProductApi(id).then(res => {
                toast.success("product deleted successfully")
            }).catch(err => {
                toast.error("product deleted failed")
            })
        }
    }
    //for getting all products in table
    useEffect(() => {
        getAllProductApi().then(res => {
            setproducts(res.data)
        }).catch(err => {
            console.log(err)
        })

        getCount().then(res => {
            setProductCount(res.data.productCount)
            setPendingOrderCount(res.data.pendingOrderCount)
            setDeliveredOrderCount(res.data.deliveredOrderCount)
            setUserCount(res.data.userCount)
        })
    }, [])

    const [productNameError, setProductNameError] = useState('')
    const [productPriceError, setProductPriceError] = useState('')
    const [productCategoryError, setProductCategoryError] = useState('')
    const [productDescriptionError, setProductDescriptionError] = useState('')
    const [productImageError, setProductImageError] = useState('')

    const validate = () => {
        let isValid = true;
        if (productName === "") {
            setProductNameError("required");
            isValid = false;
        }

        if (productPrice === "") {
            setProductPriceError("required");
            isValid = false;
        }

        if (productCategory === "") {
            setProductCategoryError("required");
            isValid = false;
        }

        if (productDescription === "") {
            setProductDescriptionError("required");
            isValid = false;
        }

        if (productImage === "") {
            setProductImageError("required");
            isValid = false;
        }

        return isValid;
    }
    return (
        <>
            <div className='container mt-2'>
                <div class="row row-cols-1 row-cols-md-4 g-4 mb-5">
                    <div className="col">
                        <div class="card text-white bg-danger mb-3" button>
                            <div class="card-header">Total Products</div>
                            <div class="card-body">
                                <h5 class="card-title">{productCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card text-white bg-warning mb-3" button>
                            <div class="card-header">Total Pending Orders</div>
                            <div class="card-body">
                                <h5 class="card-title">{pendingOrderCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card text-white bg-success mb-3" button>
                            <div class="card-header">Total Delivered Product</div>
                            <div class="card-body">
                                <h5 class="card-title">{deliveredOrderCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card text-white bg-primary mb-3" button>
                            <div class="card-header">Total User</div>
                            <div class="card-body">
                                <h5 class="card-title">{userCount}</h5>
                            </div>
                        </div>
                    </div>
                </div>



                <div className='d-flex justify-content-between'>
                    <h3> showing all products</h3>

                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Add Product
                    </button>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action=''>
                                        <div class="mb-3" >
                                            <label htmlFor=''> Product name</label>

                                            <input
                                                onChange={(e) => setproductName(e.target.value)}
                                                type='text' class="form-control" placeholder='enter product name' />
                                            {
                                                productNameError && <div className="text-danger">{productNameError}</div>
                                            }
                                            <label className='mt-2' htmlFor=''> Product Price</label>
                                            <input
                                                onChange={(e) => setproductPrice(e.target.value)}

                                                type='text' class="form-control" placeholder='enter product price' />
                                            {
                                                productPriceError && <div className="text-danger">{productPriceError}</div>
                                            }
                                            <label className='mt-2' htmlFor=''> Product Category</label>
                                            <input
                                                onChange={(e) => setproductCategory(e.target.value)}

                                                type='text' class="form-control" placeholder='enter product category' />
                                            {
                                                productCategoryError && <div className="text-danger">{productCategoryError}</div>
                                            }
                                            <label className='mt-2' htmlFor=''> Product description</label>
                                            <input
                                                onChange={(e) => setproductDescription(e.target.value)}

                                                type='text' class="form-control" placeholder='enter product description' rows='4' />
                                            {
                                                productDescriptionError && <div className="text-danger">{productDescriptionError}</div>
                                            }
                                            <label className='mt-2' htmlFor=''> Product Image</label>
                                            <input
                                                onChange={handleImageupload}
                                                type='file' class="form-control" placeholder='enter product image' />
                                            {
                                                previewImage && <img src={previewImage} alt="" className='object-cover rounded-3 mt-2' height={'300px'} width={'100%'} />
                                            }
                                            {
                                                productImageError && <div className="text-danger">{productImageError} </div>
                                            }

                                                </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary"
                                        onClick={handleSubmit}
                                    >Add </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col"> Product Images</th>
                            <th scope="col"> Product Name</th>
                            <th scope="col"> Product price</th>
                            <th scope="col"> Product category</th>
                            <th scope="col"> Description</th>
                            <th scope="col"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => {
                                return (
                                    <tr>
                                        <td>
                                            <img src={product.image} height={75} width={75}
                                            ></img>
                                        </td>
                                        <td> {product.name}</td>
                                        <td> {product.price}</td>
                                        <td> {product.category}</td>
                                        <td> {product.description}</td>
                                        <td>


                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <Link to={`/admin/product/edit/${product._id}`} type="button" class="btn btn-success m-1">edit</Link>
                                                <button type="button" class="btn btn-danger m-1" onClick={() => handleDelete(product._id)}>delete</button>
                                            </div>
                                        </td>



                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Admindashboard