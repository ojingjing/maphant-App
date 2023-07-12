import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const homeBlockLayoutWidth: number = SCREEN_WIDTH;
const homeBlockLayoutHeight: number = SCREEN_HEIGHT / 7;

interface Tags {
  id: string | undefined;
  title: string | undefined;
}

const Home: React.FC = () => {
  // * Search
  const [text, setText] = useState<string>();

  const clearTextHandler = () => {
    console.log("Search Text Delete Done");
    setText("");
  };
  // Search *

  // * Info
  const [currentinfoPage, setCurrentinfoPage] = useState(0);
  const infoPageCount = 3; // 페이지 수

  const [info, setInfo] = useState<Image[]>([
    require("../../assets/image1.png"),
    require("../../assets/image2.png"),
    require("../../assets/image3.png"),
  ]); // 들어갈 컨텐츠

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const infoPage = Math.round((offsetX / windowWidth) * 0.9);
    setCurrentinfoPage(infoPage);
  };

  const createInfoView = (info: Image[], index: number) => {
    return info.map((image: Image, index: number) => (
      <View
        key={index}
        style={{
          width: windowWidth * 0.9,
          height: "100%",
        }}
      >
        <Image
          source={image}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        />
      </View>
    ));
  };

  // function mapInfo() {
  //   return info.map((info, index) => createInfoView(info, index));
  // }

  // Info *
  // * HotTags
  const [tags, setTags] = useState<Tags[]>([
    //useState를 이용해 상태 변경
    { id: "1", title: "#오정민" }, //초기값 설정
    { id: "2", title: "#앗뜨거 앗뜨" },
    { id: "3", title: "#부트캠프" },
    { id: "4", title: "#React" },
    { id: "5", title: "#React-Native" },
    { id: "6", title: "Node.js" },
    { id: "7", title: "과끼리" },
    { id: "8", title: "Tovelop" },
  ]);

  useEffect(() => {
    // 백엔드에서 데이터를 받아 상태 변경 tagFetchData();
  }, []);

  /*const tagFetchData = async () => {
    try {
      // 백엔드에서 데이터를 받아오는 비동기 요청
      const response = await fetch('API');
      const data = await response.json();

      // 받아온 데이터를 기반으로 배열 생성 후 상태 변경
      const tagList: Tags[] = data.map((tag: any) => ({
        id: tags.id,
        title: tags.title,
      }));

      setTags(tagList);
    } catch (error) {
      console.error('Fetching data error :', error);
    }
  };*/

  const createTagView = (tag: Tags, index: number) => {
    const colors = [
      "#FFC0CB",
      "#B5EEEA",
      "#CCCCCC",
      "#FFA07A",
      "#FFD700",
      "#ADFF2F",
      "#00FFFF",
      "#EE82EE",
      "#FFFF00",
    ];

    return (
      <View
        key={tag.id}
        style={{
          flex: 1,
          backgroundColor: colors[index % colors.length],
          justifyContent: "flex-start",
          alignItems: "center",
          marginRight: Dimensions.get("window").width * 0.02,
          padding: Dimensions.get("window").width * 0.025,
          height: 36,
          borderRadius: 30,
        }}
      >
        <Text style={{}}>{tag.title}</Text>
      </View>
    );
  };

  function mapTag() {
    return tags.map((tag, index) => createTagView(tag, index));
  }
  // HotTags *

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>software</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
            }}
          >
            <Icon
              name="moon-outline"
              size={35}
              color="black"
              style={{
                marginRight: "3%",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
            }}
          >
            <Icon
              name="notifications-outline"
              size={35}
              color="black"
              style={{
                marginRight: "7%",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View>
            <Icon name="search" size={28} color="black" style={{}} />
          </View>
          <TextInput
            value={text}
            onChangeText={setText}
            returnKeyType="search"
            onEndEditing={() => console.log("Search Text Update Done")}
            // onTouchStart={() => console.log("start")}
            // onTouchEnd={() => console.log("end")}
            style={{
              flex: 1,
              //backgroundColor: "pink",
              height: "100%",
              marginLeft: "3%",
              marginRight: "3%",
            }}
          />
          <TouchableOpacity onPress={clearTextHandler}>
            <Icon name="close" size={28} color="black" style={{}} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ height: Dimensions.get("window").height }}>
        <View style={styles.infoContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ borderRadius: 18 }}
          >
            {/* <View style={[styles.infoPage, { backgroundColor: "red" }]}>
              
            </View>
            <View style={[styles.infoPage, { backgroundColor: "blue" }]}>
            
            </View>
            <View style={[styles.infoPage, { backgroundColor: "green" }]}>
              
            </View> */}
            {createInfoView(info, currentinfoPage)}
          </ScrollView>

          <View style={styles.infoDotBox}>
            {Array.from({ length: infoPageCount }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.infoDot,
                  index === currentinfoPage
                    ? styles.activeinfoDot
                    : styles.unactiveinfoDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.todaysHotContainer}>
          <View style={styles.todaysHotTitleBox}>
            <Text style={styles.todaysHotTitleText}> 🔥오늘의</Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {" "}
              HOT
            </Text>
            <Text style={styles.todaysHotTitleText}> 키워드🔥</Text>

            <View
              style={{
                width: "13%",
                height: "80%",
                marginLeft: "-3%",
                marginBottom: "2%",
                //backgroundColor: "gray",
              }}
            ></View>
          </View>

          <ScrollView
            horizontal={true}
            keyboardDismissMode="none"
            showsHorizontalScrollIndicator={false}
            style={styles.todaysHotTagBox}
          >
            {mapTag()}
          </ScrollView>
        </View>

        <View style={styles.advertisementContainer}>
          <Image
            source={require("../../assets/adv1.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View style={styles.homeBlockLayout}>
          <View style={styles.homeBlockContainer}>
            <TouchableOpacity style={styles.homeBlock}>
              <Text>즐겨찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeBlock}>
              <Text>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeBlock}>
              <Text>Point</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeBlock}>
              <Text>아몰랑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  mainScroll: {
    height: "100%",
    backgroundColor: "#fff",
  },
  titleContainer: {
    height: Dimensions.get("window").height * 0.07,
    flexDirection: "row",
    //backgroundColor: "blue",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 40,
    marginLeft: "4%",
    fontWeight: "bold",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor : 'skyblue',
    justifyContent: "flex-end",
  },
  searchContainer: {
    height: Dimensions.get("window").height * 0.07,
    flexDirection: "row",
    //backgroundColor: "teal",
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
    backgroundColor: "#e5e5e5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    height: Dimensions.get("window").height * 0.28,
    //backgroundColor: "yellow",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },

  infoDotBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeinfoDot: {
    backgroundColor: "black",
  },
  unactiveinfoDot: {
    backgroundColor: "gray",
  },
  todaysHotContainer: {
    height: Dimensions.get("window").height * 0.13,
    //backgroundColor: "green",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  todaysHotTitleBox: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "skyblue",
    alignItems: "center",
  },

  todaysHotTitleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  todaysHotTagBox: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "purple",
  },
  advertisementContainer: {
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: "pink",
  },
  homeBlockLayout: {
    width: "100%",
    height: homeBlockLayoutHeight,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  homeBlockContainer: {
    width: "90%",
    height: "100%",
    //backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-around",

    flexDirection: "row",
  },
  homeBlock: {
    width: "23%",
    height: "50%",
    backgroundColor: "skyblue",
    alignItems: "center",
    borderColor: "black",
    justifyContent: "center",
    borderRadius: 15,
    marginRight: "2%",
  },
});

export default Home;