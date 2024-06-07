import { ImageSourcePropType } from "react-native";

type foodProps = {
  id: number;
  title: string;
  img: ImageSourcePropType;
  description?: string;
  favorite: boolean;
  power: string;
  minute: string;
  onPress?: any;
};

type signUpInfo = {
  username: string;
  email: string;
  password: string;
};

interface signInInfo {
  email: string;
  password: string;
}
