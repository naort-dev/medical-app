import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, ActivityIndicator, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import styles from './styles';
import MenuWeedCategory from '../../../components/MenuWeedCategory';
import Brand from '../../../components/Brand';
import Logo from '../../../assets/images/logo.png';
import {getAssetUrl} from '../../../utills/Methods';
import {getImgAssetUrl} from '../../../backend/Config';
import ProductModal from '../../../components/ProductModal';
import Product from '../../../components/Products';
import {s3Service} from '../../../backend/StoreFront';
import {getProducts} from '../../../backend/Catalog';
import {getBrands} from '../../../backend/Catalog';
import Search from '../../../components/Search';
export default function Menu({navigation, route}) {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const storefront = useSelector((state) => state.Config.storefront);
  const [loading, setLoading] = useState(true);
  const [previousCount, setPreviousCount] = useState(false);
  const [offset, setOffset] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [inprogress, setInProgress] = useState(false);
  const {company} = useSelector((state) => state.Auth);
  const assetUrl = getImgAssetUrl(company.handle);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const s3 = new s3Service();
      const {brands, categories} = await s3.getMenuFile('explore_page');
      setCategories(categories);
      setBrands(brands);
      setLoading(false);
    })();
  }, []);
  const loadProducts = async (params = {}, reset = false) => {
    setLoading(true);
    let mergedParams = params;
    mergedParams.query = search;
    if (reset) {
      setPreviousCount(0);
    } else {
      setPreviousCount(data.length);
    }
    const rep = await getProducts(mergedParams);
    console.log('^^^^^^^^^^^^^^^^^', mergedParams, rep.length);
    if (reset) {
      setData([...rep]);
      setOffset(0);
    } else {
      setData([
        ...data,
        ...rep.filter(
          (item) => !data.map((item1) => item1.id).includes(item.id),
        ),
      ]);
      setOffset(offset + rep.length);
    }
    setLoading(false);
    setInProgress(false);
    setIsUpdated(!isUpdated);
  };
  useEffect(() => {
    if (search) {
      setInProgress(true);
      loadProducts({offset, limit: offset + 25}, true);
    }
  }, [search]);
  const CategoiesOfWeed = ({item}) => {
    return (
      <View style={styles.categoryView}>
        <MenuWeedCategory
          name={item.name}
          image={getAssetUrl(item.image, assetUrl)}
          onPress={() =>
            navigation.navigate('Category', {
              category: item.id,
              categoryLabel: item.title,
            })
          }
          isLoading={loading}
        />
      </View>
    );
  };
  const BrandsOfWeed = ({item}) => {
    return (
      <View style={styles.categoryView}>
        <MenuWeedCategory
          name={item.name}
          image={getAssetUrl(item.image, assetUrl)}
          onPress={() => navigation.navigate('Category', {brand: item.name})}
          isLoading={loading}
        />
        {/* <Brand
          image={item.image}
          name={item.name}
          onPress={() => navigation.navigate('Category', {brand: item.name})}
          isLoading={loading}
        /> */}
      </View>
    );
  };
  const CategoryProduct = ({item}) => {
    return (
      <View>
        <Product
          item={item}
          modalVisible={modalVisible}
          onPress={() => {
            setSelectedProduct(item);
            // recordAnalytics(EVENT.VIEW_PRODUCT, {
            //   brand_id: item.brand.id,
            //   product_id: item.id,
            //   category_id: item.category.id,
            //   attributes: 'menu',
            // });
            setTimeout(() => {
              setModalVisible(true);
            }, 600);
          }}
        />
      </View>
    );
  };
  // const categories =
  //   storefront?.sections?.find((section) => section._sectionID === 'categories')
  //     ?.categories || [];
  console.log(search, data.length, loading);
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View style={styles.headerView}>
            <View style={styles.logoContainer}>
              {/* {search ? `"${search}"` : 'Menu'} */}
              <View>
                <Image
                  source={Logo}
                  resizeMode="contain"
                  style={styles.logoImg}
                />
              </View>
            </View>
            <Search
              onChangeText={(text) => {
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&', text);
                setSearch(text);
              }}
              value={search}
              onCancelPress={() => setSearch('')}
            />
          </View>
        );
      }}>
      {search ? (
        <>
          <View style={styles.mainViewContainer}>
            <Text style={{color: '#fff'}}>
              {search && data.length === 0 && !loading
                ? 'No Products Found'
                : ''}
            </Text>
            {loading && <ActivityIndicator size="large" color="#fff" />}
            {data.length > 0 && (
              <FlatList
                data={data}
                renderItem={CategoryProduct}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                  if (!inprogress && previousCount !== data.length) {
                    setInProgress(true);
                    loadProducts({offset, limit: offset + 25});
                  }
                }}
              />
            )}
          </View>
          <ProductModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            navigation={navigation}
          />
        </>
      ) : (
        <View style={styles.mainViewContainer}>
          <Text style={styles.headerText}>Categories</Text>
          <FlatList
            data={categories?.filter((category) => category.id !== 'all')}
            renderItem={CategoiesOfWeed}
            keyExtractor={(item) => item.id}
            showsVerticleScrollIndicator={false}
            numColumns={2}
          />
          <Text style={styles.headerText}>Brands</Text>
          <FlatList
            data={brands}
            renderItem={BrandsOfWeed}
            keyExtractor={(item) => item.id}
            showsVerticleScrollIndicator={false}
            numColumns={2}
          />
        </View>
      )}
    </ScreenWrapper>
  );
}
