const Footer = () => {
  return (
    <footer className="rounded-lg shadow m-4 dark:bg-gray-800" style={{ backgroundColor: '#FFF8EA' }}>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span  style={{ color: '#9E7676' }} className="text-sm text-9E7676 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline"  style={{ color: '#9E7676' }}>MARKAZ™</a>. All Rights Reserved.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-9E7676 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6"
              style={{ color: '#9E7676' }}>About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6"
              style={{ color: '#9E7676' }}>Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6"
              style={{ color: '#9E7676' }}>Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline"
              style={{ color: '#9E7676' }}>Contact</a>
          </li>
        </ul>
      </div>
    </footer>

  );
};

export default Footer