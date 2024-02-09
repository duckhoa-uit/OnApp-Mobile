export const images = {
  bg_wallpaper: require('./source/bg.png'),
  default: require('./source/default.png'),
  default_avt: require('./source/default-avatar.webp'),
  logo: require('./source/OnAppIcon.png'),
  doctor: require('./source/doctor.png'),
};

export type ImageTypes = keyof typeof images;
