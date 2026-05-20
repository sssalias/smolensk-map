import { useHandleOutsideClick } from '@/core/hooks'
import SmolMap from '@/features/map/assets/smol-map.svg?react'
import { RegionDrawer } from '@/features/map/components/region-drawer'
import { useRegionDrawer } from '@/features/map/hooks'
import { type Region } from '@/features/map/repositories/region-repository'
import { clickRegionUseCase } from '@/features/map/use-cases'
import { StoryPopover } from '@/features/story'
import { type Story } from '@/features/story/repositories/story-repository'
import { useState } from 'react'

const WRAPPER_ID = 'path4119'

const MapSvg: React.FC = () => {
    const [regionInfo, setRegionInfo] = useState<Region | undefined | null>()
    const [storyInfo, setStoryInfo] = useState<Story | undefined | null>()
    const [postion, setPosition] = useState<{x: number, y: number} | null>(null)

    const ref = useHandleOutsideClick<HTMLDivElement>(() => setRegionInfo(null))

    const { isOpen, onOpen, onClose } = useRegionDrawer()

    const handleButtonClick = (
        event: React.MouseEvent<SVGSVGElement> 
    ) => {
        const target = event.target as SVGElement
        const { region, story } = clickRegionUseCase.onClick(target.id)
        console.log({region, story})
        const rect = event.currentTarget.getBoundingClientRect()
        if (region && story) {
            setPosition({x: event.clientX - rect.left, y: event.clientY - rect.top})
            setRegionInfo(region)
            setStoryInfo(story)
        } else {
            setRegionInfo(null)
            setStoryInfo(null)
        }
    }
    const handleMouseOver = (event: React.MouseEvent<SVGSVGElement>) => {
        const target = event.target as SVGElement
        if (target.id !== WRAPPER_ID) {
            target.style.fill = 'red'
            target.style.transition = 'fill 0.2s'
        }
    }

    const handleMouseOut = (event: React.MouseEvent<SVGSVGElement>) => {
        const target = event.target as SVGElement
        if (target.id !== WRAPPER_ID) {
            target.style.fill = 'rgb(242, 247, 247)';
        }
    }

    return (
        <div ref={ref} className='h-150 w-150 relative'>
            <SmolMap className='cursor-pointer' onClick={handleButtonClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
            {regionInfo && storyInfo && (
                <StoryPopover 
                    position={postion!}
                    region={regionInfo!}
                    story={storyInfo!}
                    onRegionDrawerOpen={onOpen}
                >
                </StoryPopover>
            )}
            {regionInfo && <RegionDrawer isOpen={isOpen} onClose={onClose} region={regionInfo!}/>}
        </div>
    )
}

export default MapSvg