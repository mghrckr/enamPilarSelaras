import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate()

  const handleSignOut = () => {
    Swal.fire({
      icon: 'success',
      title: 'Signed out successfully!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {

      setTimeout(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_server');
        localStorage.removeItem('access_db');
        localStorage.removeItem('access_user');
        localStorage.removeItem('startLocal');
        localStorage.removeItem('endLocal');
        localStorage.removeItem('pickedOperatorLocal');
        localStorage.removeItem('pickedBerdasarkanLocal');
        localStorage.removeItem('pickedJenisLocal');
        window.location.href = "/login";
      }, 500);
    });
  };

  return (
    <div style={{ backgroundColor: '#FFF8EA', marginBottom: '40px'}}>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative overflow-x-auto shadow-md sm:rounded-lg" >
        <div className="flex grid items-center justify-between grid-cols-2 lg:grid-cols-3" >
          {/* <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/")
                }}
                href="/"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                Member Transactions
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/module")
                }}
                href="/module"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                Module Transactions
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/saldo")
                }}
                href="/saldo"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                Member Saldo
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/inactive")
                }}
                href="/inactive"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                Inactive Member
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/listProduk")
                }}
                href="/listProduk"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                List Produk
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  navigate("/produk")
                }}
                href="/produk"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                style={{ color: '#9E7676' }}
              >
                Produk Terjual
              </a>
            </li>
          </ul> */}
         
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.removeItem('startLocal');
                  localStorage.removeItem('endLocal');
                  localStorage.removeItem('pickedOperatorLocal');
                  localStorage.removeItem('pickedBerdasarkanLocal');
                  localStorage.removeItem('pickedJenisLocal');
                  navigate("/")
                }}
                aria-label="Company"
                title="Company"
                className="inline-flex items-center "
              >
                <img src='/images/logoWebMarkaz.png' alt="Your Image"
                  style={{ width: '80px', maxWidth: '70%' }}
                />
              </a>
              <ul className="flex items-center lg:flex" style={{ justifyContent: 'flex-end', marginLeft: '680px', minWidth: '100px' }}>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                    aria-label="Sign up"
                    title="Sign up"
                    style={{ backgroundColor: '#594545' }}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
          <div className="ml-auto lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24" style={{ color: '#9E7676' }}>
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          localStorage.removeItem('startLocal');
                          localStorage.removeItem('endLocal');
                          localStorage.removeItem('pickedOperatorLocal');
                          localStorage.removeItem('pickedBerdasarkanLocal');
                          localStorage.removeItem('pickedJenisLocal');
                          navigate("/")
                        }}
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center lg:mx-auto"
                      >
                        <img src='/images/logoWebMarkaz.png' alt="Your Image"
                          style={{ width: '80px', maxWidth: '70%' }}
                        />
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24" style={{ color: '#9E7676' }}>
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {/* <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/")
                          }}
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          Member Transactions
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/module")
                          }}
                          href="/module"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          Module Transactions
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/saldo")
                          }}
                          href="/saldo"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          Saldo Member
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/inactive")
                          }}
                          href="/inactive"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          Inactive Member
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/listProduk")
                          }}
                          href="/listProduk"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          List Produk
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('startLocal');
                            localStorage.removeItem('endLocal');
                            localStorage.removeItem('pickedOperatorLocal');
                            localStorage.removeItem('pickedBerdasarkanLocal');
                            localStorage.removeItem('pickedJenisLocal');
                            navigate("/produk")
                          }}
                          href="/produk"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                          style={{ color: '#9E7676' }}
                        >
                          Produk Terjual
                        </a>
                      </li> */}
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="inline-flex items-center justify-center h-10 px-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                          style={{ backgroundColor: '#594545' }}
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
