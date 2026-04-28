export type Story = {
    region_id: string,
    hero: string
    text: string,
    image_path: string
    audio_path: string | null
}


interface StoryRepository {
    getByRegionId: (region_id: string) => Story | null
    getAll: () => Story[]
    getImagePathByRegionId: (region_id: string) => string | null
}

class StoryRepositoryImpl implements StoryRepository {

    private readonly stories: Story[] = [
        {
            region_id: 'path3115',
            hero: 'Крылатый дед',
            text: 'Летучий старик – огромный, сильный мужик с крыльями. Где он живёт, чем промышляет, неизвестно. Говорят, никто никогда его не видел, потому что летает этот крылатый мужик над землей исключительно ночью. Но, если никто старика не видел, откуда известно, где и когда он летает? Наверное, есть всё-таки люди, которые его полёт наблюдали. видели, как он на поля приземляется, слышали, какой хруст стоит, когда жуёт репу, или свёклу: хрум! хрум! чавк! чавк! - только ботва через поле летит да в кучу складывается: шмяк! плюх! шмяк! плюх! Эх, интересно бы узнать, кто он такой и куда свой ум и силищу применяет!..',
            image_path: 'https://smolenskkraeved.ru/d/4_ded_1_removebg-preview.png',
            audio_path: 'https://smolenskkraeved.ru/f/skazka_o_letuchem_starike.mp4'
        },
        {
            region_id: 'path3027',
            hero: 'Снежная Хозяйка',
            text: 'Есть на земле места с редкими, почти сказочными, растениями или животными. Эти места называют заповедными: их надо беречь и охранять. В сказочной смоленской земле есть Заповедная пуща - лес, в котором всегда зима, но главное: в этом лесу живут необыкновенные белые звери, каких не найти больше нигде на свете. Никто не должен знать, где находится этот лес! Охраняет пущу и её тайну от незваных гостей Снежная хозяйка. В рукавах у неё спрятаны метели, она может наказать и помиловать, может врага в ледяную статую превратить, одним словом, настоящая хозяйка - очень строгая, но очень справедливая.',
            image_path: 'https://smolenskkraeved.ru/d/1_snezhnaya_hozyajka-removebg-preview.png',
            audio_path: null
        }
    ]

    public getAll() {
        return this.stories
    }

    public getByRegionId(region_id: string) {
        return this.stories.find(item => item.region_id === region_id) ?? null
    }

    public getImagePathByRegionId(region_id: string) {
        return this.stories.find(item => item.region_id === region_id)?.image_path || null
    }
}


export default new StoryRepositoryImpl()