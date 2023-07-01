import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Profile = () => {


    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)

    const [fname, setFname] = useState(user.fname)
    const [lname, setLname] = useState(user.lname)
    const [email, setEmail] = useState(user.email)
    const [profile, setProfile] = useState('')
   
   
    const handleImageupload = (event) => {

        setProfile(event.target.files[0])


    }

    
    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-center'>
                <p class="text-lg-center">
                    <p class="font-monospace">
                        <p class="fs-6">

                            <img class="rounded-circle shadow-4-strong" alt="profile"
                                src="/assets/images/user.png" height={150} width={150} /><br></br>
                            Welcome, {user.fname}<br></br>
                            <hr></hr>
                            {user.fname} {user.lname}<br></br>
                            {user.email}
                        </p>
                    </p>



                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Edit Profile <i class="fas fa-user-edit"></i>
                    </button>
                </p>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">editing profile</h5>
                            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action=''>
                                <label htmlFor='fname'>FirstName</label>
                                <input value={fname} 
                                onChange={(e)=> setFname(e.target.value)}
                                type="text" name="fname" id="fname" className='form-control' />

                                <label htmlFor='lname'>LastName</label>
                                <input value={lname} 
                                onChange={(e)=> setLname(e.target.value)}
                                type="text" name="lname" id="name" className='form-control' />

                                <label htmlFor='email'>Email Address</label>
                                <input 
                                onChange={(e)=> setEmail(e.target.value)}
                                value={email} type="text" name="email" id="email" className='form-control' />

                                <label htmlFor='profile'>Profile</label>
                                <input 
                                onChange={handleImageupload}
                                type="file" className='form-control' />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Profile