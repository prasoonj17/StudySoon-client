import ChangeProfilePicture from "./changeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import React from 'react'

import UpdatePassword from "./UpdateProfile"
export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-gray-50 ">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}