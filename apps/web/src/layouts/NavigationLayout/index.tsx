import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [
    {
      key: '/submit-data',
      label: 'Submit Data',
      onClick: () => goTo('/submit-data'),
    },

    {
      key: '/suggestions/crop-production',
      label: 'Crop Production Suggestions',
      onClick: () => goTo('/suggestions/crop-production'),
    },

    {
      key: '/community/forum',
      label: 'Community Forum',
      onClick: () => goTo('/community/forum'),
    },

    {
      key: '/marketplace',
      label: 'Marketplace',
      onClick: () => goTo('/marketplace'),
    },

    {
      key: '/collaboration',
      label: 'Collaborate',
      onClick: () => goTo('/collaboration'),
    },

    {
      key: '/suggestions/irrigation',
      label: 'Irrigation Suggestions',
      onClick: () => goTo('/suggestions/irrigation'),
    },

    {
      key: '/announcements',
      label: 'Announcements',
      onClick: () => goTo('/announcements'),
    },

    {
      key: '/suggestions/crop-rotation',
      label: 'Crop Rotation',
      onClick: () => goTo('/suggestions/crop-rotation'),
    },

    {
      key: '/expert-consultation',
      label: 'Expert Help',
      onClick: () => goTo('/expert-consultation'),
    },
  ]

  const itemsUser = []

  const itemsTopbar = []

  const itemsSubNavigation = [
    {
      key: '/submit-data',
      label: 'Submit Data',
    },

    {
      key: '/suggestions/crop-production',
      label: 'Crop Production Suggestions',
    },

    {
      key: '/community/forum',
      label: 'Community Forum',
    },

    {
      key: '/marketplace',
      label: 'Marketplace',
    },

    {
      key: '/collaboration',
      label: 'Collaborate',
    },

    {
      key: '/suggestions/irrigation',
      label: 'Irrigation Suggestions',
    },

    {
      key: '/announcements',
      label: 'Announcements',
    },

    {
      key: '/suggestions/crop-rotation',
      label: 'Crop Rotation',
    },

    {
      key: '/expert-consultation',
      label: 'Expert Help',
    },

    {
      key: '/marketplace/product/:id',
      label: 'Marketplace',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
