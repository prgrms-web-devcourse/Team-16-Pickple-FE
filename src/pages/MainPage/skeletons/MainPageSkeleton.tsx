import { Header } from '@components/Header';
import { SkeletonCardList } from '@components/SkeletonCardList';
import { Button } from '@components/shared/Button';
import { Text } from '@components/shared/Text';

import { theme } from '@styles/theme';

import { MainPageContainer, MainPageSubContainer } from '../MainPage.style';

export const MainPageSkeleton = () => {
  return (
    <MainPageContainer>
      <Header isLogo={true} />
      <MainPageSubContainer>
        <Text children={'내 근처 게스트 매치'} weight={700} size={'1.25rem'} />
        <SkeletonCardList count={3} gap={10} />
        <Button {...MAIN_PAGE_BUTTON_PROP} onClick={() => {}}>
          더보기
        </Button>
      </MainPageSubContainer>
      <MainPageSubContainer>
        <Text children={'추천 크루'} weight={700} size={'1.25rem'} />
        <SkeletonCardList count={3} gap={10} />
        <Button {...MAIN_PAGE_BUTTON_PROP} onClick={() => {}}>
          더보기
        </Button>
      </MainPageSubContainer>
    </MainPageContainer>
  );
};

const MAIN_PAGE_BUTTON_PROP = {
  width: '100%',
  height: '2.5rem',
  fontSize: `${theme.FONT_SIZE.MD}`,
  fontWeight: theme.FONT_WEIGHT.BOLD,
  lineHeight: 0,
  textColor: `${theme.PALETTE.RED_400}`,
  borderColor: `${theme.PALETTE.RED_400}`,
  backgroundColor: 'white',
};
