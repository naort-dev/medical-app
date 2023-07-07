import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import styles from './styles';
import Header from '../../../components/Header';
import Product from '../../../components/Products';
// import {RecommendedData} from '../../../utills/Data/recommended';
import Search from '../../../components/Search';
import AppColors from '../../../utills/AppColors';
import ProductModal from '../../../components/ProductModal';
import {getProducts} from '../../../backend/Catalog';
// import {set} from 'react-native-reanimated';
import {recordAnalytics} from '../../../backend/Analytics';
import {EVENT} from '../../../utills/Constants';
import ProductCard from '../../../components/ProductCard';

export default function Category({navigation, route}) {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [inprogress, setInProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousCount, setPreviousCount] = useState(false);
  const [offset, setOffset] = useState(0);
  const loadProducts = async (params = {}, isRefresh = false) => {
    setLoading(true);
    let mergedParams = params;
    let refresh = isRefresh || (!params.offset ? true : false);
    if (search) {
      mergedParams.query = search;
    }
    if (route?.params.category && route?.params.category !== 'all') {
      mergedParams.category_id = route?.params.category;
    }
    if (route?.params.brand) {
      mergedParams.brand_id = route?.params.brand;
    }
    setPreviousCount(data.length);
    console.log('Category:', params, mergedParams, data.length);
    const rep = await getProducts(mergedParams);
    await setData([...(refresh ? [] : data), ...rep]);
    setOffset((refresh ? 0 : offset) + rep.length);
    setLoading(false);
    setInProgress(false);
  };
  useEffect(() => {
    setInProgress(true);
    loadProducts({offset, limit: offset + 25}, true);
  }, [search, route]);
  const CategoryProduct = ({item}) => {
    const openProduct = async (item) => {
      setSelectedProduct(item);
      console.log(item);
      // recordAnalytics(EVENT.VIEW_PRODUCT, {product_id, })
      recordAnalytics(EVENT.VIEW_PRODUCT, {
        // brand_id: item.brand.id,
        product_id: item.id,
        category_id: item.category.id,
        attributes: 'menu',
      });
      setTimeout(() => {
        setModalVisible(true);
      }, 600);
    };
    return (
      <View style={styles.productWrapper}>
        <ProductCard
          item={item}
          isLoading={loading}
          navigation={navigation}
          onPress={() => openProduct(item)}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <View style={{backgroundColor: AppColors.background}}>
            <Header
              title={
                search
                  ? `"${search}"`
                  : route?.params.category || route?.params.brand
              }
              onPress={() => navigation.goBack()}
            />
            <Search
              onChangeText={(text) => setSearch(text)}
              typing={search}
              value={search}
              onCancelPress={() => setSearch('')}
            />
          </View>
        );
      }}>
      <View style={styles.mainViewContainer}>
        <Text style={styles.headerText}>
          {search
            ? `"${search}"`
            : route?.params.categoryLabel || route?.params.brand}
          <Text style={{fontSize: 16}}>{` (${data.length} Search Found)`}</Text>
        </Text>
        <FlatList
          data={data}
          renderItem={CategoryProduct}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            console.log('Loaded', offset);
            if (!inprogress && previousCount !== data.length) {
              setInProgress(true);
              loadProducts({offset, limit: offset + 25});
            }
          }}
          numColumns={2}
        />
        <Text>
          {search && data.length === 0 && !loading ? 'No Products Found' : ''}
        </Text>
        {loading && <ActivityIndicator color={'#fff'} size="large" />}
      </View>
      <ProductModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
      />
    </ScreenWrapper>
  );
}
