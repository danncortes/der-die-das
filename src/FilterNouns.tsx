import React, { useState } from 'react';
import { FilterData, UnionFilterTypes, FilterTypes, Groups } from './types';

export const FilterNouns = (props: {
    onChangeFilter: (filterBy: FilterData) => void;
}) => {
    const [filterBy, setFilterBy] = useState({
        type: 'ending',
        value: ''
    } as FilterData);
    const { onChangeFilter } = props;

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const filterData = { ...filterBy, value: ev.target.value.toLocaleLowerCase() };
        setFilterBy(filterData);
        onChangeFilter(filterData);
    };

    const onSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        let value = ev.target.value;
        let type = value;
        if (value !== FilterTypes.ending && value !== FilterTypes.prefix) {
            type = FilterTypes.group;
        } else {
            value = '';
        }

        const filterData = { type, value };
        setFilterBy(filterData);
        onChangeFilter(filterData);
    };

    const renderGroupOptions = () => {
        const groupKeys = Object.keys(Groups) as `${Groups}`[];
        return groupKeys.map((group) => (
            <option key={Groups[group]} value={Groups[group]}>
                {group}
            </option>)
        );
    };

    return (
        <div className="filter">
            <label htmlFor="" className="filter__label">
                Filter by
            </label>
            <select name="" id="" onChange={onSelectChange}>
                <option value="ending">Ending</option>
                <option value="prefix">Prefix</option>
                {renderGroupOptions()}
            </select>
            { filterBy.type !== FilterTypes.group ? <input type="text" onChange={onChange} placeholder="Type to filter"/> : ''}
        </div>
    );
};
