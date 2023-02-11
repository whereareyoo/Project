import { useEffect } from "react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog()
{
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    },[productsLoaded, dispatch])

    if(status.includes('pending')) return <LoadingComponents message="Loading products..."/>
    return(
        <>
            <ProductList products={products} />
        </>
        
    )
}