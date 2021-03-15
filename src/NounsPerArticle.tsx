import React from 'react';
import { Articles, Genders, NounsByArticle, ArticleUnion } from './types';

import { NounColumn } from './NounColumn';

const genderArticle = {
    [Articles.der]: { title: Genders.Maskulin, color: 'DodgerBlue' },
    [Articles.die]: { title: Genders.Feminin, color: 'Tomato' },
    [Articles.das]: { title: Genders.Neutron, color: 'MediumSeaGreen' }
};

export const NounsPerArticle = (props: { nounsPerArticle: NounsByArticle }) => {
    const { nounsPerArticle } = props;

    const renderColumns = () => {
        const articles = Object.keys(nounsPerArticle) as Array<ArticleUnion>;
        return articles.map((article) => (
            <NounColumn
                key={genderArticle[article].title}
                color={genderArticle[article].color}
                title={genderArticle[article].title}
                percentage={nounsPerArticle[article].percentage}
                data={nounsPerArticle[article].data}
            />
        ));
    };

    return <div className="nouns-per-article"> {renderColumns()} </div>;
};
