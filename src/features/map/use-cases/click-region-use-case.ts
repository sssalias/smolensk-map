import { regionRepository } from '@/features/map/repositories'
import { storyRepository } from '@/features/story'

class ClickRegionUseCase {

    public onClick(
        region_id: string,
    ) {
        const region = regionRepository.getById(region_id)
        const story = storyRepository.getByRegionId(region_id)
        return {
            region,
            story
        }
    }
}

export default new ClickRegionUseCase()