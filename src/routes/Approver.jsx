import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClaimsPage from '@/pages/approver/ClaimApprovalPage'
import Profile from '@/pages/approver/Profile'

const Approver = () => {
  return (
    <Routes>
      <Route path="claims" element={<ClaimsPage />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  )
}

export default Approver
