import { LoadingButton } from "@mui/lab";
import { Divider, Grid, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails()
{
    const dispatch = useAppDispatch();
    const {basket, status} = useAppSelector(state => state.basket);
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const[quantity, setQuantity] = useState(0);
    const[submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id)

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id!)));
    }, [id, item, dispatch, product])

    function handleInputChange(event: any)
    {
        if (event.target.value >= 0)
        {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart()
    {
        setSubmitting(true);
        if (!item || quantity > item.quantity)
        {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
        else
        {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }


    if(productStatus.includes('pending')) return <LoadingComponents message="Loading product..."/>
    if(!product)return <h3>Product not found</h3>
    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.picUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleInputChange}
                            variant = 'outlined'
                            type = 'number'
                            label = 'Quantity in cart'
                            fullWidth
                            value = {quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color = 'primary'
                            size = 'large'
                            variant = 'contained'
                            fullWidth
                        >
                            {item ? 'Update quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function dispatch() {
    throw new Error("Function not implemented.");
}
