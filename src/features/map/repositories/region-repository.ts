export type Region = {
    id: string,
    name: string,
    booklets: string[]
}

interface RegionRepository {
    getAll: () => Region[],
    getById: (id: string) => Region | null
}

class RegionRepositoryImpl implements RegionRepository {
    private readonly regions: Region[] = [
        {id: 'path3115', name: 'Руднянский МО', booklets: ['https://smolenskkraeved.ru/d/rudnya-1.jpg', 'https://smolenskkraeved.ru/d/rudnya-2.jpg']},
        {id: 'path3027', name: 'Демидовский МО', booklets: ['https://smolenskkraeved.ru/d/demidov-1.jpg', 'https://smolenskkraeved.ru/d/demidov-2.jpg']},
        {id: 'path3021', name: 'Гагаринский МО', booklets: ['https://smolenskkraeved.ru/d/gagarin-1.jpg', 'https://smolenskkraeved.ru/d/gagarin-2.jpg']},
        {id: 'path3023', name: 'Вяземский МО', booklets: ['https://smolenskkraeved.ru/d/page-1.jpg', 'https://smolenskkraeved.ru/d/page-2.jpg']},
        {id: 'path3103', name: 'Дорогобужский МО', booklets: ['https://smolenskkraeved.ru/d/dorogobuzh-1.jpg', 'https://smolenskkraeved.ru/d/dorogobuzh-2.jpg']},
        {id: 'path3037', name: 'Ельнинский МО', booklets: ['https://smolenskkraeved.ru/d/elnya-1.jpg', 'https://smolenskkraeved.ru/d/elnya-2.jpg']},
        {id: 'path3039', name: 'Велижский МО', booklets: ['https://smolenskkraeved.ru/d/velizh-1.jpg', 'https://smolenskkraeved.ru/d/velizh-2.jpg']},
        {id: 'path3117', name: 'Краснинский МО', booklets: ['https://smolenskkraeved.ru/d/krasnyj-1.jpg', 'https://smolenskkraeved.ru/d/krasnyj-2.jpg']},
        {id: 'path3061', name: 'Смоленский МО', booklets: ['https://smolenskkraeved.ru/d/smolensk-1.jpg', 'https://smolenskkraeved.ru/d/smolensk-2.jpg']},
        {id: 'path3051', name: 'Шумячский МО', booklets: ['https://smolenskkraeved.ru/d/shumyachi-1.jpg', 'https://smolenskkraeved.ru/d/shumyachi-2.jpg']},
        {id: 'path3057', name: 'Угранский МО', booklets: ['https://smolenskkraeved.ru/d/ugra-1.jpg', 'https://smolenskkraeved.ru/d/ugra-2.jpg']},
        {id: 'path3015', name: 'Новодугинский МО', booklets: ['https://smolenskkraeved.ru/d/novodugino-1.jpg', 'https://smolenskkraeved.ru/d/novodugino-2.jpg']}
    ]
    
    public getAll() {
        return this.regions
    }

    public getById(id: string) {
        return this.regions.find(item => item.id === id) ?? null
    }
}

export default new RegionRepositoryImpl()