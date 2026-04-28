export type Region = {
    id: string,
    name: string
}

interface RegionRepository {
    getAll: () => Region[],
    getById: (id: string) => Region | null
}

class RegionRepositoryImpl implements RegionRepository {
    private readonly regions: Region[] = [
        {id: 'path3115', name: 'Руднянский МО'},
        {id: 'path3027', name: 'Демидоский МО'}
    ]
    
    public getAll() {
        return this.regions
    }

    public getById(id: string) {
        return this.regions.find(item => item.id === id) ?? null
    }
}

export default new RegionRepositoryImpl()