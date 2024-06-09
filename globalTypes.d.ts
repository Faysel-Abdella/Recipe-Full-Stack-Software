import { ImageSourcePropType } from "react-native";

type foodProps = {
  id: string;
  title: string;
  imgUrl: string;
  description?: string;
  video?: string;
  power: string;
  minute: string;
  onPress?: any;
};

type postFeedProps = {
  category: string;
  title: string;
  description: string;
  minutes: string;
  calory: string;
  thumbnail: string;
  video: string;
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
