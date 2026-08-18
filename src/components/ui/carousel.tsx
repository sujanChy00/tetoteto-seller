import { LegendList } from "@legendapp/list/react-native";
import { Link } from "expo-router";
import { useRef } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";
import { AnimatedView } from "./animated-view";
import { StyledImage } from "./image";

export const Carousel = ({ images }: { images: string[] }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("window").width;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const renderItem = ({ item }: { item: string }) => (
    <Link
      href={{
        pathname: "/image/[image]",
        params: {
          image: item,
        },
      }}
      asChild
    >
      <Pressable>
        <StyledImage
          source={item}
          style={{ width, height: 300 }}
          contentFit="contain"
        />
      </Pressable>
    </Link>
  );

  return (
    <View>
      <LegendList
        recycleItems
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        keyExtractor={(item) => item}
        data={images}
        renderItem={renderItem}
        decelerationRate="fast"
        snapToInterval={width}
      />
      {images.length > 1 && (
        <View className="flex-row items-center justify-center gap-3 -translate-y-2">
          {images?.map((_, imageIndex) => {
            const viewWidth = scrollX.interpolate({
              inputRange: [
                width * (imageIndex - 1),
                width * imageIndex,
                width * (imageIndex + 1),
              ],
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            return (
              <AnimatedView
                key={imageIndex}
                className={"bg-muted"}
                style={{
                  width: viewWidth,
                  height: 8,
                  borderRadius: 100,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
