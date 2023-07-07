import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { ApiManager } from "../../../backend/ApiManager"
import { confirmCheckout, getCheckout, postCheckout, cancelCheckout, getProducts } from "../../../backend/Catalog"
import Button from "../../../components/Button"
import { ScreenWrapper } from "../../../components/ScreenWrapper"
import checkoutActions from "../../../Redux/Actions/Checkout"
import * as cartActions from "../../../Redux/Actions/Cart"
import AppColors from "../../../utills/AppColors"
import { width } from "react-native-dimension"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from "react-native-element-dropdown"
import styles from "../CheckoutLoading/styles"
import { FlatList } from "react-native-gesture-handler"
import ProductCard from "../../../components/ProductCard"


export function CheckoutContainer({
  LoadingView, 
  SummaryView, 
  SendingView, 
  OrderView,
  completeHandler=() => {}, 
  cancelHandler=() => {},
  ...props
}) {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const checkoutId = useSelector(state => state.checkout?.checkoutId)
  const isCheckingOut = useSelector(state => state.checkout?.isCheckingOut)
  const [checkout, setCheckout] = useState(props.checkout)
  const [order, setOrder] = useState(null)
  const [isSending, setSending] = useState(false)
  const [error, setError] = useState(null)

  console.log(checkoutId)

  function useErrorHandledEffect(handler, failure) {
    useEffect(async () => {
      try {
        await handler()
      } catch(e) {
        handleError(e)
        if (failure) { failure(e) }
      }
    })
  }

  function handleError(error) {
    setError(`${error}`)
  }

  async function cancel() {
    if (checkoutId) { 
      await cancelCheckout(checkoutId) 
      setCheckout(undefined)
      dispatch(checkoutActions.cancelCheckout())
    }
    if (cancelHandler) { cancelHandler() }
  }

  async function submitCheckoutHandler(payload) {
    if (!isSending) {
      setError(null)
      setSending(true)
      try {
        console.log(payload)
        const order = await confirmCheckout(checkoutId, payload)
        setOrder(order)
        dispatch(cartActions.clearCart())
      } catch (e) {
        handleError(error)
      } finally {
        setSending(false)
      }
    }
  }

  async function fetchExistingCheckout() {
    let newCheckout;
    try {
      newCheckout = await getCheckout(checkoutId)
    } catch (e) {
      console.log(e)
      switch (e.response?.status) {
        case 404: 
          dispatch(checkoutActions.startCheckout(undefined))
        default: 
          throw e;
      }
    }
    
    console.log(newCheckout)
    setCheckout(newCheckout)
  }

  async function startNewCheckout() {
    const items = cart.items.map((item) => {
      return {
        product_id: item.product_id, 
        option_id: item.option_id, 
        quantity: item.quantity
      }
    })
    const newCheckout = await postCheckout(items)
    console.log(`New Checkout ID: ${newCheckout.id}`)
    dispatch(checkoutActions.startCheckout(newCheckout.id))
    setCheckout(newCheckout)
  }

  useErrorHandledEffect(() => {
    if (isCheckingOut && !order && !checkout) {
      if (checkoutId) {
        fetchExistingCheckout()
      } else if (cart.items.length > 0) {
        startNewCheckout()
      } else {
        dispatch(checkoutActions.closeCheckout())
      }
    }
  })

  function closeHandler() {
    if (completeHandler) {
      completeHandler()
    }
    console.log("CLOSING CHECKOUT!")
    dispatch(checkoutActions.closeCheckout())
  }
  // View Logic
  const ContentView = (props) => {
    if (order) {
      // 4: show the order confirmation view
      return OrderView({ order, closeHandler })

    } else if (checkout) {
      if (isSending) {
        // 3: show the sending order view
        return SendingView({checkout, error})
        
      } else {
        // 2: show summary or redirect view. view must call submit handler in order to start sending. 
        return SummaryView({
          checkout, 
          cart,
          submitHandler: submitCheckoutHandler, 
          cancelHandler: cancel
        })
      }

    } else if (isCheckingOut) {
      // 1: if no order or checkout exist, creste or fetch the checkout and show loading view
      if (checkoutId) {
        // useErrorHandledEffect(fetchExistingCheckout)
        return LoadingView({message: "Loading your checkout", error})

      } else {
        // useErrorHandledEffect(startNewCheckout)
        return LoadingView({message: "Preparing your checkout", error})
      }
    } else {
      return <View/>
    }
  }

  return <SafeAreaView style={containerStyles.container}>
    <ContentView/>
  </SafeAreaView>
}

const sharedStyles = {
  backgroundColor: "black",
  textColor: "white"
}


const containerStyles = StyleSheet.create({
  container: {
    backgroundColor: sharedStyles.backgroundColor,
    width: '100%',
    height: '100%',
    color: sharedStyles.textColor
  }
})

// loading view

function LoadingView({ message, error, closeHandler }) {
  const style = loadingStyles
  const dispatch = useDispatch()

  return <View style={style.background}>
    {closeHandler && 
      <SafeAreaView>
        <Ionicons 
          name="close" 
          size={40} 
          style={style.close}
          onPress={e => closeHandler()}
        />
      </SafeAreaView>
    } 
      <View style={style.container}>
        <Text style={style.message}>{message}</Text>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={style.error}>{error}</Text>
      </View>
    </View>
}

const loadingStyles = StyleSheet.create({
  background: {
    flex: 1, 
    backgroundColor: AppColors.background
  },  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: AppColors.mainText,
    fontSize: 20,
    paddingVertical: 100
  },
  error: {
    color: AppColors.red,
    paddingVertical: 50
  },
  close: {
    color: 'white', 
    paddingLeft: 16,
    paddingTop: 16, 
    alignSelf: 'flex-start'
    
  }
});

function SummaryView({checkout, cart, submitHandler, cancelHandler}) {
  const [windowId, setWindowId] = useState(checkout.pickup_windows?.find(s => s.available)?.id)
  const style = summaryStyles

  function PickupTimeDropdown() {
    const dropdownItems = checkout.pickup_windows?.map(w => ({value: w.id, label: w.text }))
    return <Dropdown
      style={style.dropdown}
      containerStyle={{backgroundColor: AppColors.background}}
      selectedTextStyle={{color: AppColors.mainText}}
      activeColor={AppColors.accentColor}
      labelField="label"
      valueField="value"
      data={dropdownItems}
      value={windowId}
      onChange={item => {setWindowId(item.value)}}
    />
  }

  function CartItems() {
    const Item = ({item}) => {
      function errorMessage(error) {
        switch (error) {
          case 'na': 
            return 'Not Available'
          case 'oos': 
            return 'Out of Stock'
          default: 
            return undefined
        }
      }
      return (
        <View style={styles.productWrapper}>
          <ProductCard
            item={item.product}
            isLoading={false}
            quat={item.quantity}
            inCart
            canEdit={false}
            error={errorMessage(item.error)}
            selectedOption={item.option}
          />
        </View>
      );
    };
    const mergedItems = cart.items.map(cartItem => {
      const checkoutItem = checkout.items.find(i => i.product_id == cartItem.product_id && i.option_id == cartItem.option_id) ?? {}
      return {
        ...cartItem, 
        ...checkoutItem
      }
    })
    return <View style={style.cartContainer}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={mergedItems}
        renderItem={Item}
        keyExtractor={(item) => item.product_id + item.option_id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  }


  function PriceSummary() {
    function PriceRow({ title, value }) {
      const formattedPrice = `$${Math.abs(value / 100).toFixed(2)}`
      return <View style={{flexDirection: 'row', paddingVertical: 2}}>
        <Text style={style.priceTitleText}>{title}</Text>
        <View style={{flexGrow: 1}}/>
        <Text style={[style.priceValueText]}>{formattedPrice}</Text>
      </View>
    }
    return <View style={style.priceSummary}>
      <PriceRow title='Subtotal:' value={checkout.price.subtotal}/>
      <PriceRow title='Savings:' value={checkout.price.discount}/>
      <PriceRow title='Total:' value={checkout.price.total}/>
    </View>
  }

  function errorMessage() {
    if (checkout.items.filter(i => i.error).length) {
      return 
    } else if (!windowId) {
      return "Please select a pickup window"
    }
  }

  function submitButtonPressed(e) {
    console.log("SUBMITTING")
    submitHandler({pickup_window: windowId})
  }

  function ActionButton() {
    if (checkout.items.filter(i => i.error).length) {
      const errorMessage = ""
      return <>
        <Text style={style.errorMessage}>
          One or more products have issues. Please go back and remove the items with issues.
        </Text>
        <Button title="Go Back" onPress={e => cancelHandler()}/>
      </>
    } else {
      return <Button title="Submit Order" onPress={e => submitButtonPressed(e)}/>
    }
  }

  return <SafeAreaView style={style.background}>
    <View style={style.background}>
      <View stype={style.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[style.sectionTitleText, {paddingBottom: 12}]}>Your Bag</Text>
          <View style={{flexGrow: 1}}/>
          <Ionicons 
            name="close" 
            size={40} 
            style={style.close}
            onPress={e => cancelHandler()}
          />
        </View>
        
        <CartItems/>
        <Text style={style.sectionTitleText}>Select a pickup time:</Text>
        <PickupTimeDropdown/>
        <PriceSummary/>
        
        <ActionButton/>
      </View>
    </View>
    </SafeAreaView>
}

const summaryStyles = StyleSheet.create({
  background: {
    width: '100%', 
    height: '100%', 
    backgroundColor: AppColors.background
  }, 
  container: {
    flexDirection: 'column',
  },
  cartContainer: {
    // flex: 1,
    marginBottom: 20
  },
  sectionTitleText: {
    color: AppColors.mainText,
    fontSize: 25,
    fontWeight: 'bold',
    paddingStart: 20
  }, 
  cartItem: {
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  priceSummary: {
    backgroundColor: AppColors.containerBackground,
    borderRadius: 8, 
    padding: 8, 
    margin: 20
  },
  priceTitleText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start'
  }, 
  priceValueText: {
    color: 'white', 
    fontSize: 16, 
    alignSelf: 'flex-end'
  },
  dropdown: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: AppColors.accentColor,
    backgroundColor: 'black',
    margin: 20
  },
  errorMessage: {
    color: 'red', 
    textAlign: 'center', 
    marginHorizontal: 20
  },
  close: {
    color: 'white', 
    alignSelf: 'flex-end', 
    paddingEnd: 20
  },
})

function SendingView(props) {
  return <LoadingView message="Sending your order..."/>
}

function OrderView(props) {
  const style = loadingStyles
  return <View style={style.container}>
    <Text style={{fontSize: 20, color: "white"}}>Your order has been completed!</Text>
    <Text style={{fontSize: 20, color: "white"}}>Order Number: {props.order.order_number}</Text>
    <Button title="Back to Menu" onPress={e => props.closeHandler()}/>
  </View>
}

export default function CheckoutPreview(props) {
  // const dispatch = useDispatch()
  /*
  const cart = useSelector(state => state.cart)
  const mockCheckout = {
    "id": "62acec3fb49c795b54527c91",
    "price": {
      "subtotal": 2000,
      "discount": 0,
      "total": 1800
    },
    "pickup_windows": [
      {
        "id": "Today, June 17, Mid-day (12PM - 5PM)",
        "text": "Today, June 17, Mid-day (12PM - 5PM)",
        "available": true
      },
      {
        "id": "Today, June 17, Evening (5PM - 11PM)",
        "text": "Today, June 17, Evening (5PM - 11PM)",
        "available": false
      },
      {
        "id": "Tomorrow, June 18, Morning (8AM - 12PM)",
        "text": "Tomorrow, June 18, Morning (8AM - 12PM)",
        "available": true
      },
      {
        "id": "Tomorrow, June 18, Mid-day (12PM - 5PM)",
        "text": "Tomorrow, June 18, Mid-day (12PM - 5PM)",
        "available": true
      },
      {
        "id": "Tomorrow, June 18, Evening (5PM - 11PM)",
        "text": "Tomorrow, June 18, Evening (5PM - 11PM)",
        "available": true
      }
    ],
    "status": "draft",
    "store_id": "6278e29e86591055a8955011",
    "created_at": "2022-06-17T21:03:58.990Z",
    "items": [
      {
        "product_id": "627acecc60514ea4de15a596",
        "option_id": "92644",
        "quantity": 1,
        "price": 1800,
        "error": "na"
      }
    ],
    "updated_at": "2022-06-17T21:57:30.324Z",
    "user_id": "628248e796baa23e9723d3fc"
  }
  */
  // return SummaryView({ checkout: mockCheckout, cart, submitHandler: () => {}, cancelHandler: () => {}})
  // return LoadingView({ message: "Loading your Checkout", error: "Unable to load checkout!" })
  return <CheckoutContainer
    // checkout={mockCheckout}
    LoadingView={LoadingView}
    SummaryView={SummaryView}
    SendingView={SendingView}
    OrderView={OrderView}
  />
}

