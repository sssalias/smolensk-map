/// <reference types="vite-plugin-svgr/client" />
import { MapSvg } from '@/map'
import '@/core/app.base.css'

const App: React.FC = () => {
  return (
    <MapSvg />
  )
}

export default App