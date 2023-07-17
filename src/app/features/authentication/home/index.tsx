import React, { memo } from 'react';
import { TextInput } from 'react-native';

import isEqual from 'react-fast-compare';

import { images } from '@assets/image';
import { logout } from '@common';
import {
  Block,
  Icon,
  Image,
  PostDelay,
  Screen,
  StackView,
  Text,
} from '@components';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';

import { useHomeStyle } from './style';

const podcasts = [
  {
    title: 'Giang ơi Radio',
    description:
      'Cảm ơn các bạn đã đến với Giang Ơi Radio, mình là Giang và ở đây mình tản mạn về chuyện làm người lớn.',
    coverUri:
      'https://i.scdn.co/image/210fc188aed15156a4b341702122cabca5caad93',
    categories: ['How-to', 'Self-help', 'Personal stories'],
  },
  {
    title: 'The Present Writer',
    description:
      'Podcast về bài học cuộc sống, phát triển bản thân và Chủ nghĩa tối giản. Podcast được host bởi Chi Nguyễn, Tiến sĩ Giáo dục tại Mỹ, blogger, và tác giả "Một Cuốn Sách về Chủ Nghĩa Tối Giản" A light-hearted podcast about life lessons, personal development, and minimalism. This podcast is hosted by Chi Nguyen, Ph.D. in Education, Blogger, and Author of "A Book about Minimalism"',
    coverUri:
      'https://i.scdn.co/image/72a2b9374211898d6a6aab4068f5084f172c06a6',
    categories: ['Education', 'Self-Improvement'],
  },
  {
    title: 'Nguyễn Hữu Trí Podcast',
    description: `Chào mừng các bạn đã đến với kênh Podcast chính thức của Nguyễn Hữu Trí. Hiện tại anh đang là Thầy giáo, một Youtuber, đồng thời là CEO, trực tiếp giảng dạy, đồng hành cùng các bạn trong chặng hành trình trưởng thành qua các khóa học kỹ năng mềm tại học viện AYP.
    Các bạn có thể tìm hiểu thêm thông tin về anh và học viện tại website: https://ayp.vn/
    Tập mới sẽ phát sóng vào mỗi tối thứ 3, 6 và chủ nhật hàng tuần. Hãy đăng kí kênh và thường xuyên tương tác với anh những chủ đề bạn muốn anh chia sẻ nhé!
    `,
    coverUri:
      'https://i.scdn.co/image/ab6765630000ba8aeddef33cb61887e516a21049',
    categories: ['Educational', 'Courses', 'How-to'],
  },
  {
    title: 'Sunhuyn Podcast',
    description:
      'Chào các bạn, mình là Sun. Các bạn đang lắng nghe Sunhuyn Podcast. Nếu có những ngày cảm thấy chênh vênh hãy quay về đây và yêu lấy chính mình. Cùng lắng nghe và thấu hiểu.',
    coverUri:
      'https://i.scdn.co/image/ab6765630000ba8aeb5b14182d1f591c2df02a7d',
    categories: ['Education', 'Self-help'],
  },
];

const HomeComponent = () => {
  const theme = useTheme();

  const styles = useHomeStyle();

  // const handleLogout = () => {
  //   navigateScreen(APP_SCREEN.CONSULTER_LIST);

  //   logout();
  // };

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.primaryLight}
        bottomInsetColor="transparent"
        statusBarStyle="light-content"
      >
        <Block style={styles.header}>
          <Text style={styles.headerText}>Tham vấn tâm lý cùng Ổn App</Text>
          <Icon color="#fff" icon="bell" onPress={logout} />
        </Block>

        <Block style={styles.whitePad}>
          <TextInput
            focusable={false}
            onChangeText={console.log}
            onPressIn={() => navigateScreen(APP_SCREEN.CONSULTER_LIST)}
            placeholder="Tìm kiếm"
            placeholderTextColor={'#C2C2C2'}
            style={styles.searchBar}
          />

          <Block style={styles.bigButtonSection}>
            <TouchableOpacity
              onPress={() => navigateScreen(APP_SCREEN.CONSULTER_LIST)}
              style={[styles.redBox]}
            >
              <Block style={styles.whiteBox}>
                <Image
                  resizeMode={'cover'}
                  source={images.doctor}
                  style={styles.coverImg}
                />
              </Block>
              <Text style={styles.bigButtonText}>Tham vấn tâm lý</Text>
            </TouchableOpacity>
          </Block>

          <Block
            direction="column"
            flex={1}
            marginTop={20}
            style={{ width: '100%', marginBottom: 40 }}
          >
            <Block direction="row" justifyContent="space-between">
              <Text colorTheme="text" fontSize={16} fontWeight="500">
                Podcast
              </Text>
              <Text colorTheme="primary" fontSize={12} fontWeight="600">
                Xem tất cả
              </Text>
            </Block>

            <StackView style={{ width: '100%', marginTop: 10 }}>
              {podcasts.map((podcast, idx) => (
                <PostDelay key={`${podcast.coverUri}_${idx}`}>
                  <Block
                    direction="row"
                    justifyContent="flex-start"
                    marginBottom={10}
                  >
                    <Block height={120} width={120}>
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: podcast.coverUri,
                        }}
                        style={{ borderRadius: 8 }}
                      />
                    </Block>
                    <Block
                      alignItems="flex-start"
                      height={120}
                      marginLeft={10}
                      style={{ width: '100%' }}
                    >
                      <Text
                        colorTheme="primary"
                        fontSize={12}
                        fontWeight="500"
                        lineBreakMode="clip"
                        style={{ marginTop: 10 }}
                      >
                        {podcast.categories.join(' | ')}
                      </Text>
                      <Text colorTheme="text" fontSize={14} fontWeight="500">
                        {podcast.title}
                      </Text>
                      <Block>
                        <Text
                          colorTheme="textSecondary"
                          fontSize={12}
                          fontWeight="500"
                          numberOfLines={3}
                        >
                          {podcast.description}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </PostDelay>
              ))}
            </StackView>
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};

export const Home = memo(HomeComponent, isEqual);
