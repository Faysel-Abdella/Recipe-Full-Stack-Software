import { ImageSourcePropType } from "react-native";

type foodProps = {
  id: number;
  img: ImageSourcePropType;
  title: string;
  favorite: boolean;
  power: string;
  minute: string;
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
