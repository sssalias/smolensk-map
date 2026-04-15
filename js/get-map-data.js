export const BASE_URL = 'https://smolenskkraeved.ru'
const url = `${BASE_URL}/map-data-loader`


export const getMapData = async () => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.map(item => ({
        ...item,
        url: `${BASE_URL}${item.url}`,
        main_image: `${BASE_URL}${item.main_image}`,
        images: item.images.map(image => `${BASE_URL}${image}`)
    }))
}