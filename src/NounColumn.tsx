import React from 'react';

import { Noun } from './types';

export const NounColumn = (props: {
    color: string;
    percentage: number;
    title: string;
    data: Noun[];
}) => {
    const { title, percentage, data, color } = props;
    return (
        <div className="nouns-per-article__column">
            <h3 className="nouns-per-article__title" style={{ color }}>
                {title}
                <span style={{ color }}>{data.length}</span>
            </h3>
            <p
                className="nouns-per-article__percentage"
                style={{ backgroundColor: color }}
            >
                <span className="nouns-per-article__percentage-symb-around">
                    ∽
                </span>
                {percentage}
                <span className="nouns-per-article__percentage-symb">%</span>
            </p>
            <div className="nouns-per-article__list">
                <ol>
                    {data.map((noun) => (
                        <li key={noun.value}>{noun.value}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
