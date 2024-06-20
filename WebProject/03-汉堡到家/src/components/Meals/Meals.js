import React from 'react'
import classes from './Meals.module.css'
import Meal from './Meal/Meal'

/* 食物列表的组件 */

const Meals = (props) => {
    return (
        // 食物多了之后有滚动条 要设置给谁 不想设置给body 设置给Meals
        <div className={classes.Meals}>
            {props.mealsData.map(item => <Meal key={item.id}
                meal={item}
            />)}

            {/* 遍历 把数字当中的数组转换成Meal 再渲染出来
        然后要把每一个数据传给Meal
        将一整个对象传给Meal */}

        </div>
    )
}

export default Meals;