import React from 'react'
import classes from './Meal.module.css'
import Counter from '../../UI/Counter/Counter'

/* 食物组件 要用到食物清单组件中*/
/* 下边框 */
const Meal = (props) => {
    return (
        <div className={classes.Meal}>
            <div className={classes.ImgBox} >
                <img src={props.meal.img} alt="" />
            </div>
            <div className={classes.DescBox}>
                <h2 className={classes.Title}>{props.meal.title}</h2>
                {props.noDesc ? null : <p className={classes.Desc}>{props.meal.desc}</p>}
                <div className={classes.PriceWrap}>
                    <span className={classes.Price}>{props.meal.price}</span>
                    <Counter meal={props.meal} />   //直接传meal
                </div>
            </div>
        </div>
    )
}
export default Meal;