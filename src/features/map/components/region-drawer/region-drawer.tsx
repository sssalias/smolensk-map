import { LoadingImage } from '@/core/components'
import { useHandleOutsideClick } from '@/core/hooks'
import type { Region } from '@/features/map/repositories/region-repository'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

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
            className='pointer-events-auto fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,.4)]'
        >
            <motion.div
                ref={ref}
                initial={{ translateX: 100}}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className='region-drawer h-dvh w-full overflow-y-auto bg-white sm:w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-1/3 xl:max-w-[760px]'
            >
                <div className='flex min-h-full flex-col gap-6 p-4 sm:gap-8 sm:p-6 lg:gap-10'>
                    <div className='flex items-start justify-between gap-4'>
                        <h1 className='pr-2 text-xl font-semibold wrap-break-word sm:text-2xl'>{props.region.name}</h1>
                        <button className='flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-2xl font-black' onClick={() => props.onClose()}>✕</button>
                    </div>
                    
                    <Swiper
                        slidesPerView={1}
                        className='w-full'
                        modules={[Navigation]}
                        navigation
                    >
                        {props.region.booklets.map(booklet => <SwiperSlide key={booklet}>
                            <LoadingImage
                                wrapperClassName='loading-image--region-slide w-full'
                                className='h-full w-full object-contain'
                                loading='lazy'
                                src={booklet}
                                alt={props.region.name}
                            />
                        </SwiperSlide>)}
                    </Swiper>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RegionDrawer
