// regionData.ts
export const regionData = {
    'Kanto': {
        start: 1,
        end: 151,
        starters: [
            { id: 1, name: 'bulbasaur' },
            { id: 4, name: 'charmander' },
            { id: 7, name: 'squirtle' }
        ]
    },
    'Johto': {
        start: 152,
        end: 251,
        starters: [
            { id: 152, name: 'chikorita' },
            { id: 155, name: 'cyndaquil' },
            { id: 158, name: 'totodile' }
        ]
    },
    'Hoenn': {
        start: 252,
        end: 386,
        starters: [
            { id: 252, name: 'treecko' },
            { id: 255, name: 'torchic' },
            { id: 258, name: 'mudkip' }
        ]
    },
    'Sinnoh': {
        start: 387,
        end: 494,
        starters: [
            { id: 387, name: 'turtwig' },
            { id: 390, name: 'chimchar' },
            { id: 393, name: 'piplup' }
        ]
    },
    'Unova': {
        start: 495,
        end: 649,
        starters: [
            { id: 495, name: 'snivy' },
            { id: 498, name: 'tepig' },
            { id: 501, name: 'oshawott' }
        ]
    },
    'Kalos': {
        start: 650,
        end: 721,
        starters: [
            { id: 650, name: 'chespin' },
            { id: 653, name: 'fennekin' },
            { id: 656, name: 'froakie' }
        ]
    },
    'Alola': {
        start: 722,
        end: 809,
        starters: [
            { id: 722, name: 'rowlet' },
            { id: 725, name: 'litten' },
            { id: 728, name: 'popplio' }
        ]
    },
    'Galar': {
        start: 810,
        end: 898,
        starters: [
            { id: 810, name: 'grookey' },
            { id: 813, name: 'scorbunny' },
            { id: 816, name: 'sobble' }
        ]
    }
};

export type Region = keyof typeof regionData;