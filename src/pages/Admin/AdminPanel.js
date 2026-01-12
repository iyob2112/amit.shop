import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLinks = () => (
    <nav className='grid gap-2 p-4'>
      <Link to='all-users' className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
      <Link to='all-sellers' className='px-2 py-1 hover:bg-slate-100'>All Seller</Link>
      <Link to='order-list' className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
      <Link to='AllProducts' className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
    </nav>
  );

  return (
    <div className='min-h-[calc(100vh-120px)] pt-24 flex flex-col md:flex-row'>
      {/* Mobile Header */}
      <div className='md:hidden bg-white shadow-md p-4 flex justify-between items-center'>
        <p className='text-lg font-semibold'>Admin Panel</p>
        <button onClick={() => setMenuOpen(!menuOpen)} className='text-2xl'>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className='hidden md:flex flex-col bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col pt-10'>
          <div className='text-5xl'>
            {user?.profilePic ? (
              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        <NavLinks />
      </aside>

      {/* Sidebar - Mobile */}
      {menuOpen && (
        <div
          ref={menuRef}
          className='fixed top-16 left-0 z-50 bg-white w-64 shadow-md h-full md:hidden transition-all'
        >
          <div className='p-4 flex flex-col items-center border-b'>
            {user?.profilePic ? (
              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
            ) : (
              <FaRegCircleUser className='text-5xl' />
            )}
            <p className='capitalize text-lg font-semibold mt-2'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
          </div>
          <NavLinks />
        </div>
      )}

      {/* Main Content */}
      <main className='w-full h-full p-4 mt-2 md:mt-0'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
