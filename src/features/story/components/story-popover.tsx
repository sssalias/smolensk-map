import type { Region } from '@/features/map/repositories/region-repository'
import type { Story } from '@/features/story/repositories/story-repository'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
    children?: React.ReactNode
    position: { x: number, y: number },
    region: Region
    story: Story
    onRegionDrawerOpen: () => void
}

const StoryPopover: React.FC<Props> = props => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className='bg-white shadow-xl absolute p-4 rounded-md w-100 cursor-default'
                style={{
                    left: props.position.x,
                    top: props.position.y,
                    translateX: 15,
                    translateY: 15
                }}
            >
                <div className='flex flex-col gap-2'>
                    <h2 className='text-[16px] font-semibold'>{props.region.name}</h2>
                    <div>
                        <div className='max-h-161.5 w-30 float-left mr-4 mb-4'>
                            <img className='object-cover h-full w-full' src={props.story.image_path} alt={props.story.hero} />
                        </div>
                        <p className='text-[14px]'>{props.story.text}</p>
                    </div>
                    <div className='flex flex-col items-start text-[14px] text-blue-500'>
                        {props.story.audio_path && <a href={props.story.audio_path}>Слушать сказку</a>}
                        {props.story.video_path && <a href={props.story.video_path}>Смотреть фильм</a>}
                        <button className='cursor-pointer' onClick={() => props.onRegionDrawerOpen()}>Читать про {props.region.name}</button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
  )
}

export default StoryPopover