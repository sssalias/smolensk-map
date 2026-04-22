import SmolMap from '@/map/assets/smol-map.svg?react'
import { regionRepository } from '@/map/repositories'

const MapSvg: React.FC = () => {
    return (
        <div className='h-150 w-150'>
            <SmolMap onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                const targetId = (e.target as Element).id
                const region = regionRepository.getById(targetId)
                console.log(region)
            }} />
        </div>
    )
}

export default MapSvg