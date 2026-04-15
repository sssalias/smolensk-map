export const findRegion = (data, region) => {
    return data.find(item => item.title === region.id.replace(/^path/, ""))
}