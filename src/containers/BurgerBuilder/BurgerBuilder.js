import React, { Component } from 'react';
import Aux1 from '../../hoc/Auxi/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';
import { Link } from 'react-router-dom';


const INGREDIENT_PRICE = {
    salad: 10,
    cheese: 5,
    meat: 30,
    bacon: 25
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        console.log(this.props);
        
        axios.get ('https://react-burger-builder-7240d.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response?.data});
        })
    }
    
    updatePurchaseState(ingredientsDup) {
        
        const sum = Object.keys (ingredientsDup)
        .map(igKey => {
            return ingredientsDup[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum>0})
    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAdditon = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdditon;
        this.setState({totalPrice:newPrice,
        ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }
    
    

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
            const updatedIngredient = {
                ...this.state.ingredients
            };
            updatedIngredient[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice:newPrice,
            ingredients: updatedIngredient});
            this.updatePurchaseState(updatedIngredient);
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("Good to go");
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Priyam',
        //         address: {
        //             street: 'Jai Prakash Nagar',
        //             zipcode: '826001',
        //             counrty: 'India'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'  
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        this.props.history.push('/checkout');
                
    }


    render() {


        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        

        

        let burger = <Spinner />

        if(this.state.ingredients) {
             burger = (
                <Aux1>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientDeducted = {this.removeIngredientHandler}
                        disabled = {disabledInfo}  
                        price = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                    />
                </Aux1>
            );
            orderSummary = <OrderSummary ingredients =
                {this.state.ingredients}
                clicked = {this.purchaseCancelHandler}
                alert = {this.purchaseContinueHandler}
                price = {this.state.totalPrice}>
                </OrderSummary>
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
       }
        
        
        

        return(

            <Aux1>
                <Modal show = {this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux1>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);


