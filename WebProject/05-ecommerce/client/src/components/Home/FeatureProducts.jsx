import React from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';
import './FeatureProducts.scss';

export default function FeatureProducts({ type }) {
    const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

    return (
        <div className='featureProducts'>
            <div className="top">
                <h1>{type} products</h1>
                <p>balabala</p>
            </div>
            <div className="bottom">
                {error
                    ? "Something went wrong!"
                    : loading
                        ? "loading"
                        : data.map((item) => <Card item={item} key={item.id} />)}
            </div>
        </div>
    );
};
