/// <reference types="vite-plugin-svgr/client" />
import { MapSvg } from '@/features/map'
import '@/core/app.base.css'

const App: React.FC = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <MapSvg/>
    </div>
  )
}

export default App