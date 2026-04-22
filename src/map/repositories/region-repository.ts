type Region = {
    id: string,
    name: string
}

interface RegionRepository {
    getAll: () => Region[],
    getById: (id: string) => Region
}

class RegionRepositoryImpl implements RegionRepository {
    private readonly regions: Region[] = [
        {id: 'path3115', name: 'Руднянский МО'}
    ]
    
    public getAll() {
        return this.regions
    }

    public getById(id: string) {
        return this.regions.find(item => item.id === id)
    }
}

export default new RegionRepositoryImpl()