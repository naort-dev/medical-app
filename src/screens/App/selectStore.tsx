import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { getStores } from '../../backend/Catalog'
import { selectStoreAction } from '../../Redux/Actions/Auth'
import AppColors from '../../utills/AppColors'

interface StoreAddress {
  lat: number
  lng: number
  street: string
  city: string
  state: string
  country: string
  zipcode: string
}

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

type StoreHours = {
  [key in DayOfWeek]: StoreDayHours
}

interface StoreDayHours {
  opens_at: number
  closes_at: number
}

export interface Store {
  id: string, 
  company_id: string
  name: string
  website_url?: string
  phone: string
  email?: string
  address: StoreAddress
  hours: StoreHours
  photos: string[]
  description: string
}

type StoreSectionProps = {
  store: Store
}

export function StoreSection({ store }: StoreSectionProps) {
  const style = storeSectionStyle
  const addressText = `${store.address.street}, ${store.address.city} ${store.address.state}, ${store.address.zipcode}`
  return <View style={style.background}>
    <Image style={style.image} source={{uri: store.photos[0]}}/>
    <View style={style.textContainer}>
      <Text style={style.nameText}>{store.name}</Text>
      <Text style={style.addressText}>{addressText}</Text>
    </View>
  </View>
}

const storeSectionStyle = StyleSheet.create({
  background: {
    backgroundColor: AppColors.containerBackground, 
    marginBottom: 12
  },
  image: {
    height: 150
  },
  nameText: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  addressText: {
    color: 'silver',
    fontSize: 15,
  },
  textContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  }
})


type Props = {
  stores: Store[]
  onSelect: (store: Store) => void
}

export function SelectStore({ stores, onSelect }: Props) {
  const style = styles
  const header = <Text style={style.header}>Select a Store</Text>
  
  function section(store: Store) {
    return <Pressable onPress={e => onSelect(store)}>
      <StoreSection store={store}/>
    </Pressable>
  }

  return <View style={{ flex: 1 }}>
    <SafeAreaView>
      <FlatList
      ListHeaderComponent={header}
      data={stores ?? []}
      renderItem={store => section(store.item) }
      keyExtractor={store => store.id}
      style={{overflow: 'visible'}}
      />
    </SafeAreaView>
  </View>
}

const styles = StyleSheet.create({
  header: {
    color: 'white', 
    fontSize: 30, 
    marginVertical: 12, 
    marginHorizontal: 12
  }
})


type LoaderProps = Omit<Props, 'stores'> & Pick<SelectStoreScreenProps, 'autoSelectSingleStore'>
export function SelectStoreLoader({ onSelect, autoSelectSingleStore = true }: LoaderProps) {
  const [stores, setStores] = useState<Store[] | null>(null)
  async function fetchStores() {
    const s = await getStores() as Store[]
    if (autoSelectSingleStore && s.length === 1) {
      onSelect(s[0])
    } 
    setStores(s)
  }
  useEffect(() => { 
    fetchStores()
  }, [])

  if (stores === null) {
    return <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white', fontSize: 20}}>Loading...</Text>
    </View>
  } else {
    return <SelectStore stores={stores} onSelect={onSelect}/>
  }
}


type SelectStoreScreenProps = {
  onSelect?: (Store) => void
  autoSelectSingleStore?: boolean
}

export function SelectStoreScreen({ onSelect, autoSelectSingleStore = true }: SelectStoreScreenProps) {
  const dispatch = useDispatch()
  async function storeSelected(store: Store) {
    await AsyncStorage.setItem('STORE_ID', store.id);
    dispatch(selectStoreAction(store))
    onSelect && onSelect(store)
  }
  return <View style={{backgroundColor: AppColors.background, height: '100%'}}>
    <SelectStoreLoader onSelect={storeSelected}/>
  </View>
}