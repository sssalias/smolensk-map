import { getMapData } from './get-map-data.js'
import { hoverHandler } from './handlers/hover-handler.js'
import { getDreamByRegion } from './storage/dreams.js'
const mapContainer = document.querySelector('#svg2')

const mapData = await getMapData()

/**
 * Рендерит попап в указанных координатах с заданными данными
 * @param {MouseEvent} event - событие клика для координат
 * @param {Object} region - объект региона с полем title
 * @param {Object} dream - объект сказки (dreamHero, text, dreamLink)
 */
function renderPopup(event, region, dream = {}) {
    // Пытаемся найти существующий попап или создаем новый
    let popup = document.getElementById('map-popup');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'map-popup';
        Object.assign(popup.style, {
            position: 'absolute',
            zIndex: '1000',
            background: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            pointerEvents: 'auto',
            fontFamily: 'sans-serif',
            transition: 'opacity 0.2s ease',
            maxWidth: '340px'
        });
        document.body.appendChild(popup);
    }

    const title = region?.title ?? 'Регион'
    const hero = dream?.dreamHero ?? 'Герой сказки не найден'
    const text = dream?.text ?? 'Текст сказки отсутствует'
    const audioLink = dream?.dreamLink
    const articleLink = region?.url
    const imageUrl = region?.main_image

    popup.innerHTML = `
        <strong style="font-size: 16px; display: block; margin-bottom: 8px;">${title}</strong>
        <div style="overflow: hidden; margin-bottom: 10px;">
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="float:left; width: 110px; height: auto; margin: 0 12px 10px 0; border-radius: 8px; object-fit: cover;">` : ''}
            <div style="font-size: 14px; line-height: 1.5;">
                <div style="margin-bottom: 8px;"><strong>Герой сказки:</strong> ${hero}</div>
                <p style="margin: 0 0 12px;">${text}</p>
            </div>
        </div>
        ${audioLink ? `<div style="margin-bottom: 8px;"><a href="${audioLink}" target="_blank" rel="noreferrer noopener" style="color:#1a0dab; text-decoration:underline;">Послушать сказу</a></div>` : ''}
        ${articleLink ? `<div><a href="${articleLink}" target="_blank" rel="noreferrer noopener" style="color:#1a0dab; text-decoration:underline;">Читать про ${title}</a></div>` : ''}
    `;

    // Показываем и позиционируем
    popup.style.display = 'block';
    popup.style.left = `${event.pageX + 15}px`;
    popup.style.top = `${event.pageY + 15}px`;
}


// mapData.forEach(element => {
//     const item = document.getElementById(`path${element.title}`);

//     if (item) {
//         const bbox = item.getBBox();
//         const svg = item.ownerSVGElement;
        
//         let point = svg.createSVGPoint();
//         point.x = bbox.x + bbox.width / 2 / 1.5;
//         point.y = bbox.y + bbox.height / 2;

//         const matrix = item.getCTM(); 
//         const centralPoint = point.matrixTransform(matrix);

//         const imgSize = 50;
//         const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "image");

//         svgImg.setAttribute("href", element.main_image);
//         svgImg.setAttribute("width", imgSize);
//         svgImg.setAttribute("height", imgSize);

//         svgImg.setAttribute("x", centralPoint.x - imgSize / 2);
//         svgImg.setAttribute("y", centralPoint.y - imgSize / 2);
        
//         svgImg.style.pointerEvents = "none";
//         mapContainer.appendChild(svgImg);
//     }
// });

mapData.forEach(element => {
    const item = document.getElementById(`path${element.title}`);

    if (item) {
        const bbox = item.getBBox();
        const svg = item.ownerSVGElement;
        
        let point = svg.createSVGPoint();
        point.x = bbox.x + bbox.width / 2 / 1.5;
        point.y = bbox.y + bbox.height / 2;

        const matrix = item.getCTM(); 
        const centralPoint = point.matrixTransform(matrix);

        const imgSize = 50;
        const radius = imgSize / 2;

        // 1. Создаем уникальный ID для маски, чтобы они не конфликтовали
        const clipId = `clip-${element.title}`;

        // 2. Создаем clipPath и круг внутри него
        const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        clipPath.setAttribute("id", clipId);

        const clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        clipCircle.setAttribute("cx", centralPoint.x);
        clipCircle.setAttribute("cy", centralPoint.y);
        clipCircle.setAttribute("r", radius);
        
        clipPath.appendChild(clipCircle);
        mapContainer.appendChild(clipPath); // Добавляем маску в контейнер

        // 3. Создаем само изображение
        const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
        svgImg.setAttribute("href", element.main_image);
        svgImg.setAttribute("width", imgSize);
        svgImg.setAttribute("height", imgSize);
        svgImg.setAttribute("x", centralPoint.x - radius);
        svgImg.setAttribute("y", centralPoint.y - radius);
        
        // 4. Привязываем маску к изображению
        svgImg.setAttribute("clip-path", `url(#${clipId})`);
        
        svgImg.style.pointerEvents = "none";
        mapContainer.appendChild(svgImg);
    }
})


const MAP_WRAPPER_ID = 'path4119'

mapContainer.addEventListener('click', async (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region) return

    const foundRegion = await hoverHandler(region, mapData)
    const dream = getDreamByRegion(foundRegion)

    console.log(foundRegion, dream);
    

    renderPopup(event, foundRegion, dream)
    

    // region.classList.toggle('hovered-region')

})


mapContainer.addEventListener('mouseover', (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region || region.id === MAP_WRAPPER_ID) return

    region.classList.add('hovered-region')
    // hoverHandler(region, mapData)
})

mapContainer.addEventListener('mouseout', (event) => {
    const region = event.target.closest('[id^="path"]')
    if (!region || region.id === MAP_WRAPPER_ID) return

    region.classList.remove('hovered-region')

})

document.addEventListener('click', (event) => {
    const popup = document.getElementById('map-popup')
    if (!popup || popup.style.display === 'none') return

    const clickedInsidePopup = popup.contains(event.target)
    const clickedRegion = event.target.closest('[id^="path"]')

    if (!clickedInsidePopup && !clickedRegion) {
        popup.style.display = 'none'
    }
})

