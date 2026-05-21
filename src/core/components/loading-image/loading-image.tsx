import { useState } from 'react'

type Props = {
    src: string
    alt: string
    className?: string
    wrapperClassName?: string
    loading?: 'eager' | 'lazy'
}

const LoadingImage: React.FC<Props> = props => {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
    const isLoaded = loadedSrc === props.src

    return (
        <div className={`loading-image ${props.wrapperClassName ?? ''}`}>
            {!isLoaded && (
                <div className='loading-image__skeleton' aria-hidden='true' />
            )}
            <img
                className={`loading-image__img ${isLoaded ? 'loading-image__img--loaded' : ''} ${props.className ?? ''}`}
                src={props.src}
                alt={props.alt}
                loading={props.loading}
                onLoad={() => setLoadedSrc(props.src)}
                onError={() => setLoadedSrc(props.src)}
            />
        </div>
    )
}

export default LoadingImage
