import { findRegion } from "../utils/find-region.js"

export const hoverHandler = async (region, data) => {
    console.log(region) // -> path{Рудняжский МО}
    console.log(data) // -> [{id: 1, name: 'Рудняжский МО', ...}, {...}, ...]
    const foundRegion = findRegion(data, region)
    
    return foundRegion
    
}