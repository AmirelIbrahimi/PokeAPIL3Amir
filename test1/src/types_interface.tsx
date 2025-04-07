// types.ts
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

export interface StarterSprites {
    [region: string]: string[];
}