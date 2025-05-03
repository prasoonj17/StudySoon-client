import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OpenRoute from './component/core/HomePage/Auth/OpenRoute'
import VerifyEmail from './pages/verifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import Dashboard from './pages/Dashboard'
import MyProfile from './component/core/Dashboard/MyProfile'
import PrivateRoute from './component/core/HomePage/Auth/PRivateRoute'
import Settings from './component/core/Dashboard/setting'
import EnrolledCourses from './component/core/Dashboard/EnrolledCourses'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from './utils/constants'
import Cart from './component/core/Dashboard/Cart'
import AddCourse from './component/core/Dashboard/AddCourse'
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-[#000e00] flex flex-col font-inter" >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="login" element={
          <OpenRoute >
            <Login />
          </OpenRoute>
        } />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="contact"
          element={
            <OpenRoute>
              <ContactPage />
            </OpenRoute>
          }
        />
        <Route path="dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="cart" element={<Cart />} />
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }
           {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                {/* <Route path="dashboard/instructor" element={<Instructor />} /> */}
                <Route path="add-course" element={<AddCourse />} />
                {/* <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} /> */}
                </>
              )
            }
        </Route>

      </Routes>
    </div>
  )
}

export default App
