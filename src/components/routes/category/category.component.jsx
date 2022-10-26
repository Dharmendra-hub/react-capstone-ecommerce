import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../product-card/product-card.component';

import { CategoriesContext } from '../../../context/categories.context';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    //This will depend only changes in category and category map
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    //This is one way of assigning products but this will hit api again and again so above we used state to manage products data
    // const products = categoriesMap[category];


    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    //HERE WE HAVE ASYNC REQUEST WHICH GETS DATA FROM THE FIREBASE SO TILL DATA IS NOT AVAILABLE THE CODE RUNS AND GIVES ERROR SO WE HAVE TO MAKE SURE THAT WE HAVE DATA AVAILABLE
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
    )
}
export default Category;