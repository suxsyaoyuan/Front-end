import React, { useSyncExternalStore, useState, useEffect } from 'react'
import classes from './FilterMeals.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";

/* 搜索框组件 */
const FilterMeals = (props) => {

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            props.onFilter(keyword);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [keyword]);

    const inputChangeHandler = e => {
        setKeyword(e.target.value.trim());
    };


    return (
        <div className={classes.FilterMeals}>
            <div >
                <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
                <input
                    onChange={inputChangeHandler}
                    className={classes.SearchInput}
                    type="text"
                    placeholder={"请输入关键字"} />
            </div>
        </div>
    )
}

export default FilterMeals;