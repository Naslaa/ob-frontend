import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()
  //get user from local storage
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  //get cart value from reducer
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart

  }));

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <Link to={'/'} class="navbar-brand me-2">

            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
              height="50"
              alt="MDB Logo"
              loading="lazy"
            />
            <h2 className='text-danger'> Online<span className='text-black'>Bazar</span> </h2>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">Dashboard</a>
              </li>
            </ul>

            <Link to={'/cart'} className='m-4'>
              <i className='fa fa-shopping-cart fa-lg'></i>
              <span className='badge rounded-pill badge-notification bg-danger'>{cart.length}</span>
            </Link>

            <div class="d-flex align-items-center">
              {

                user ? (
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.fname}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {
                        user.isAdmin ? (
                          <>
                          <li><Link to={'/Admindashboard'} class="dropdown-item" >Admin Dashboard</Link> </li>
                          <li><Link to={'/order'} class="dropdown-item">My orders</Link> </li>
                          <li><Link to={'/admin/orders'} class="dropdown-item">customer orders</Link> </li>

                          </>
                        ) : <>
                        
                          <li><Link to={'/profile'} class="dropdown-item" >Profile</Link> </li>
                          
                          <li><Link to={'/order'} class="dropdown-item" >My orders</Link> </li>
                        
                        
                        </>
                      }
                      <li><Link to={'/login'} class="dropdown-item" onClick={logout}>Logout</Link></li>
                    </ul>
                  </div>


                ) : (
                  <>
                    <Link to={'/register'}>
                      <button type="button" class="btn btn-primary px-3 me-2">
                        register

                      </button>
                    </Link>

                    <Link to={'/login'}>
                      Login
                    </Link>
                  </>
                )
              }

              {/* <button type="button" class="btn btn-primary me-3">
          Sign up for free
        </button>
        <a
          class="btn btn-dark px-3"
          href="https://github.com/mdbootstrap/mdb-ui-kit"
          role="button"
          ><i class="fab fa-github"></i
        ></a> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar;