import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api'
import UserInfoMap from './UserInfoMap'
import { fromAddress } from '../../services/geocode'

jest.mock('../../services/geocode')
jest.mock('@react-google-maps/api')

// FIXME
test.skip('renders map and marker from location', () => {
  GoogleMap.mockImplementation(
    ({ children }) => <div data-testid="GoogleMap">{children}</div>
  )
  Marker.mockReturnValue(<div data-testid="Marker" />)
  useJsApiLoader.mockReturnValue({ isLoaded: true })
  fromAddress.mockResolvedValue({ lat: 0, lng: 0 })

  render(<UserInfoMap location="London, UK" />)

  expect(fromAddress).toHaveBeenCalled()
  expect(screen.getByTestId('GoogleMap'))
    .toBeInTheDocument()
  expect(screen.getByTestId('Marker'))
    .toBeInTheDocument()
})
