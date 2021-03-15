import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import './styles/app.css';
import originalNouns from './nouns.json';
import { NounsPerArticle } from './NounsPerArticle';
import { FilterNouns } from './FilterNouns';
import {
    Articles,
    Nouns,
    NounsByArticle,
    ArticleUnion,
    FilterData,
    FilterTypes
} from './types';

const defaultNounsByArticle: NounsByArticle = {
    [Articles.der]: { data: [], percentage: 0 },
    [Articles.die]: { data: [], percentage: 0 },
    [Articles.das]: { data: [], percentage: 0 }
};

const calcPercentage = (
    nouns: NounsByArticle,
    total?: number
): NounsByArticle => {
    let totalNouns = total || 0;
    let article: ArticleUnion;

    if (!total) {
        for (article in nouns) {
            totalNouns += nouns[article].data.length || 0;
        }
    }

    for (article in nouns) {
        nouns[article].percentage =
            totalNouns &&
            Math.round(
                (((nouns[article].data.length || 0) * 100) / totalNouns) * 100
            ) / 100;
    }

    return nouns;
};

const sortNounsByArticle = (nouns: Nouns) => {
    let newNounsByArticle = { ...defaultNounsByArticle };
    for (const noun in nouns) {
        const { article, groups } = nouns[noun];
        const value = {
            groups,
            value: nouns[noun].value
        };

        newNounsByArticle = {
            ...newNounsByArticle,
            [article]: {
                ...newNounsByArticle[article],
                data: [...newNounsByArticle[article].data, value]
            }
        };
    }
    const totalNouns = Object.keys(nouns).length;
    return calcPercentage(newNounsByArticle, totalNouns);
};

const endMatch = (noun: string, str: string): boolean => {
    const length = str.length;
    const end = noun.slice(noun.length - length, noun.length).toLowerCase();
    return str === end;
};

const prefixMath = (noun: string, str: string): boolean => {
    const prefix = noun.slice(4, str.length + 4).toLowerCase();
    return str === prefix;
};

const filterNouns = (
    initialNouns: NounsByArticle,
    filterData: FilterData
): NounsByArticle => {
    const { type, value } = filterData;
    let isMatch: (noun: string, str: string) => boolean;

    if (!value) return initialNouns;

    if (type === FilterTypes.ending) {
        isMatch = endMatch;
    } else if (type === FilterTypes.prefix) {
        isMatch = prefixMath;
    }

    let newNounsByArticle = { ...defaultNounsByArticle };
    let article: ArticleUnion;

    if (type === FilterTypes.ending || type === FilterTypes.prefix) {
        for (article in initialNouns) {
            newNounsByArticle[article].data = initialNouns[article].data.filter(
                (noun) => {
                    return isMatch(noun.value, value) && noun;
                }
            );
        }
    } else {
        for (article in initialNouns) {
            newNounsByArticle[article].data = initialNouns[
                article
            ].data.filter((noun) => noun.groups.includes(value));
        }
    }

    return calcPercentage(newNounsByArticle);
};

const nouns = originalNouns as Nouns;

const App = (): ReactElement => {
    const nounsLength = useMemo(() => Object.keys(nouns).length, [nouns]);
    const [initialNounsByArticle, setInitialNounsByArticle] = useState(
        defaultNounsByArticle
    );
    const [filteredNounsByArticle, setFilteredNounsByArticle] = useState(
        defaultNounsByArticle
    );
    const [filterData, setFilterData] = useState({
        type: FilterTypes.ending,
        value: ''
    } as FilterData);

    useEffect(() => {
        const initialNouns = sortNounsByArticle(nouns);
        setInitialNounsByArticle(initialNouns);
        setFilteredNounsByArticle(initialNouns);
    }, []);

    useEffect(() => {
        setFilteredNounsByArticle(
            filterNouns(initialNounsByArticle, filterData)
        );
    }, [initialNounsByArticle, filterData]);

    return (
        <div className="main-container">
            <h1>German nouns by gender</h1>
            <h2>Percentage from {nounsLength} nouns</h2>
            <FilterNouns
                onChangeFilter={(filterData) => {
                    setFilterData(filterData);
                }}
            />
            <NounsPerArticle nounsPerArticle={filteredNounsByArticle} />
        </div>
    );
};

export default App;
