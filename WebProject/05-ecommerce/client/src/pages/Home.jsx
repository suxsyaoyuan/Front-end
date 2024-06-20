import React from 'react'
import Slider from '../components/Home/Slider'
import './Home.scss'
import FeaturedProducts from '../components/Home/FeatureProducts'
import Categories from '../components/Home/Categories'
import Contact from '../components/Home/Contact'

export default function Home() {
    return (
        <div className='home'>
            <Slider />
            <FeaturedProducts type="feature" />
            <Categories />
            <FeaturedProducts type="trending" />
            <Contact />
        </div>
    )
}
