import React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Animated, { BounceIn } from "react-native-reanimated";

const exposureOptionsAndroid = [-10, -5, 0, 5, 10];
const exposureOptionsIOS = [-2, -1, 0, 1, 2];
const exposureOptions =
  Platform.OS === "android" ? exposureOptionsAndroid : exposureOptionsIOS;

export default function ExposureControls({
  setExposure,
  setShowExposureControls,
  exposure,
}: {
  setExposure: (exposure: number) => void;
  setShowExposureControls: (show: boolean) => void;
  exposure: number;
}) {
  const { width, height } = useWindowDimensions();
  const radius = Math.min(width, height - 100) * 0.35;

  const handleExposurePress = (exposureValue: number) => {
    setExposure(exposureValue);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {exposureOptions.map((exp, i) => {
        const angle =
          (i / exposureOptions.length / 3) * 2 * Math.PI - Math.PI / 2;
        const x = width - Math.cos(angle) * radius - 90; // Align to the right
        const y = Math.sin(angle) * radius + height / 4;

        return (
          <Animated.View
            key={i}
            entering={BounceIn.delay(i * 100)}
            style={{
              position: "absolute",
              left: x,
              top: y,
            }}
          >
            <TouchableHighlight
              onPress={() => handleExposurePress(exp)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: exposure === exp ? "#ffffff" : "#ffffff30",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: exposure === exp ? "black" : "white",
                  fontWeight: "600",
                }}
              >
                {exp > 0 ? `+${exp}` : exp}
              </Text>
            </TouchableHighlight>
          </Animated.View>
        );
      })}
      <TouchableOpacity
        onPress={() => setShowExposureControls(false)}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#ffffff30",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 30,
          top: height / 4,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
