export enum Articles {
    der = 'der',
    die = 'die',
    das = 'das'
}

export enum Genders {
    Maskulin = 'Maskulin',
    Feminin = 'Feminin',
    Neutron = 'Neutron'
}

export type ArticleUnion = Articles.der | Articles.die | Articles.das;

export type DataPerGender = {
    percentage: number;
    data: Noun[];
};

export interface NounsByArticle {
    [Articles.der]: DataPerGender;
    [Articles.die]: DataPerGender;
    [Articles.das]: DataPerGender;
}

export interface NounRaw {
    groups: string[];
    value: string;
    article: ArticleUnion;
}

export interface Noun {
    groups: string[];
    value: string;
}

export interface Nouns {
    [key: string]: NounRaw;
}

export enum FilterTypes {
    group = 'group',
    ending = 'ending',
    prefix = 'prefix'
}

export type UnionFilterTypes =
    | FilterTypes.group
    | FilterTypes.ending
    | FilterTypes.prefix;

export type FilterData = {
    type: string;
    value: string;
};

export enum Groups {
    animals = 'animals',
    automotive = 'automotive',
    body = 'body',
    clothing = 'clothing',
    computer = 'computer',
    family = 'family',
    fruits = 'fruits',
    furniture = 'furniture',
    house = 'house',
    mathematics = 'mathematics',
    nautical = 'nautical',
    nobility = 'nobility',
    spices = 'spices',
    tools = 'tools',
    trees = 'trees',
    vegetables = 'vegetables',
    weather = 'weather'
}
