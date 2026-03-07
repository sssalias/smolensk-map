const mapContainer = document.querySelector('#svg2')

const MAP_WRAPPER_ID = 'path4119'

mapContainer.addEventListener('click', (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region) return

    // region.classList.toggle('hovered-region')

})


mapContainer.addEventListener('mouseover', (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region || region.id === MAP_WRAPPER_ID) return

    region.classList.add('hovered-region')

})

mapContainer.addEventListener('mouseout', (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region || region.id === MAP_WRAPPER_ID) return

    region.classList.remove('hovered-region')

})


fetch('https://smolenskkraeved.ru/map-data-loader').then(response => response.json())
    .then(data => {
        console.log('Map data loaded:', data)
    })
    .catch(error => {
        console.error('Error loading map data:', error)
    })