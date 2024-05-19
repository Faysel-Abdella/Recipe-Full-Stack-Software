import { ImageSourcePropType } from "react-native";

type foodProps = {
  id: number;
  img: ImageSourcePropType;
  title: string;
  favorite: boolean;
  power: string;
  minute: string;
};
