import type { MyDb } from "~/types/database";
import { Icon } from "./icons";

export const IconSwith = ({
  iconName,
}: {
  iconName: MyDb["programme"]["sections"][number]["bullets"]["icon"];
}) => {
  if (iconName === "feather") {
    return <Icon.Bullet.Feather weight="bold" />;
  }
  if (iconName === "fish-simple") {
    return <Icon.Bullet.Fish weight="bold" />;
  }
  if (iconName === "flame") {
    return <Icon.Bullet.Flame weight="bold" />;
  }
  if (iconName === "flower-lotus") {
    return <Icon.Bullet.Lotus weight="bold" />;
  }
  if (iconName === "flower-tulip") {
    return <Icon.Bullet.Tulip weight="bold" />;
  }
  if (iconName === "grains") {
    return <Icon.Bullet.Grains weight="bold" />;
  }
  if (iconName === "leaf") {
    return <Icon.Bullet.Leaf weight="bold" />;
  }
  if (iconName === "moon") {
    return <Icon.Bullet.Moon weight="bold" />;
  }
  if (iconName === "mountains") {
    return <Icon.Bullet.Mountains weight="bold" />;
  }
  if (iconName === "orange") {
    return <Icon.Bullet.Orange weight="bold" />;
  }
  if (iconName === "plant") {
    return <Icon.Bullet.Plant weight="bold" />;
  }
  if (iconName === "potted-plant") {
    return <Icon.Bullet.PottedPlant weight="bold" />;
  }
  if (iconName === "star") {
    return <Icon.Bullet.Star weight="bold" />;
  }
  if (iconName === "sun") {
    return <Icon.Bullet.Sun weight="bold" />;
  }
  if (iconName === "tipi") {
    return <Icon.Bullet.Tipi weight="bold" />;
  }
  return <Icon.Bullet.Tree weight="bold" />;
};
