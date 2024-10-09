import PageContainer from '@/app/dashboard/components/page-container'
import DashboardLayout from '@/app/dashboard/dashboard-layout'
import { restaurantNavItem } from '@/app/dashboard/routes/routes'
import React from 'react' 

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
