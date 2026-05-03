import { useHandleOutsideClick } from '@/core/hooks'
import type { Region } from '@/features/map/repositories/region-repository'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

type Props = {
    region: Region,
    isOpen: boolean,
    onClose: () => void,
}

const RegionDrawer: React.FC<Props> = props => {

    const ref = useHandleOutsideClick<HTMLDivElement>(props.onClose)


    if (!props.isOpen) return null

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{ opacity: 1 }} 
            className='pointer-events-auto flex justify-end w-screen h-screen bg-[rgba(0,0,0,.4)] fixed top-0 left-0'
        >
            <motion.div
                ref={ref}
                initial={{ translateX: 100}}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className='h-screen w-1/3 bg-white'
            >
                <div className='p-6 flex flex-col gap-4'>
                    <h1 className='text-2xl font-semibold'>{props.region.name}</h1>
                    
                    <Swiper
                        slidesPerView={1}
                        className='w-full'
                    >
                        {props.region.booklets.map(booklet => <SwiperSlide>
                            <img src={booklet} alt="" />
                        </SwiperSlide>)}
                    </Swiper>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RegionDrawer