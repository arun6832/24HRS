'use client'

import { ConfigurationProvider } from '@web/core/configuration'
import { CoreStoreProvider } from '@web/core/store'
import { DesignSystem, MrbHtml, MrbMain } from '@web/designSystem'
import { useMichelangelo } from '@web/libraries/michelangelo'
import { AuthenticationProvider } from '@web/modules/authentication'
import { GoogleOauth } from '@web/modules/googleOauth'
import { ReactNode } from 'react'
import { SocketProvider } from '../core/socket'

export default function AppLayout({ children }: { children: ReactNode }) {
  useMichelangelo()

  return (
    <>
      <MrbHtml>
        <DesignSystem.Provider>
          <ConfigurationProvider>
            <GoogleOauth.Provider>
              <CoreStoreProvider>
                <AuthenticationProvider>
                  <SocketProvider>
                    <MrbMain name="farmkit">{children}</MrbMain>
                  </SocketProvider>
                </AuthenticationProvider>
              </CoreStoreProvider>
            </GoogleOauth.Provider>
          </ConfigurationProvider>
        </DesignSystem.Provider>
      </MrbHtml>
    </>
  )
}
