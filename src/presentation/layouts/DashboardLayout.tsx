import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  )
}