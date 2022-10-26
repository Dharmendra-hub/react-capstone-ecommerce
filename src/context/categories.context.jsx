import { createContext, useState, useEffect } from "react";

//import { addCollectionAndDocuments } from '../utils/firebase.utils';

//Get data
import { getCategoriesAndDocuments } from '../utils/firebase.utils';

//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //This is used to write data to fire base, with key and data
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    //Gotcha :  WHEN YOU ARE USING A EXISTING ASYNC FUNCTION INSIDE THE USEEFFECT YOU NEED TO CREATE A NEW ASYNC FUNCTION IN THE USEEFFECT'S ASYNC FUNCTION
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}