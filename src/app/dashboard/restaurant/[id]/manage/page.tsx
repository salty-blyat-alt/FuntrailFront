import PageContainer from '@/app/dashboard/components/page-container'
import DashboardLayout from '@/app/dashboard/dashboard-layout'
import React from 'react'
import { restaurantNavItem } from '../page'

const Manage = () => {
  return (
    <DashboardLayout navItems={restaurantNavItem}>
      <PageContainer scrollable={true}>
        sdfgdsfgdsfgsfdg
      </PageContainer>

    </DashboardLayout>
  )
}

export default Manage