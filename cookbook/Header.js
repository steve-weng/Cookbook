import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"


const Header = () => {
    return (
        <View style={styles.Header}>
          <View style={styles.Group842}>
            <Image
              style={styles.EmojionePotOfFood}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/psfm8uwqwwj-I63%3A60%3B6%3A5?alt=media&token=2a91f219-96c5-4e9c-abfe-ae2366617607",
              }}
            />
            <Text style={styles.Cookbook}>Cookbook</Text>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    Header: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: 225,
      height: 52,
      paddingLeft: 11,
      paddingRight: 39,
      paddingBottom: 9,
      boxSizing: "border-box",
    },
    Group842: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: "100%",
      boxSizing: "border-box",
    },
    EmojionePotOfFood: {
      width: 42,
      height: "100%",
    },
    Cookbook: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "rgba(0,0,0,1)",
      fontSize: 35,
      lineHeight: 35,
      fontFamily: "Playfair Display",
      fontWeight: 900,
      textAlign: "center",
      paddingLeft: 10,
    },
});

export default Header;

