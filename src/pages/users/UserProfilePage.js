import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';

const UserProfilePage = () => {

  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== ROLE.USER) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row py-20'>

      <aside className='bg-white w-full md:max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col pt-10'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ) : (
                <FaRegCircleUser />
              )
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        {/* Navigation */}
        <div className='p-4 pt-6'>
          <nav className='grid gap-2'>
            <Link to={"UserEditProfile"} className='px-2 py-1 rounded hover:bg-slate-100'>Edit Profile</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default UserProfilePage
