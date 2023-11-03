import { Avatar } from '@components/Avatar';
import { Button } from '@components/shared/Button';
import { Text } from '@components/shared/Text';

import { theme } from '@styles/theme';

import { PATH_NAME } from '@consts/pathName';

import { AllowCardContainer, FlexBox } from './AllowCard.style';

type AllowCardProps = {
  player: Player;
  moveToProfile: (path: string) => void;
};

type Player = {
  id: string;
  nickname: string;
  profileImageUrl: string;
};

const buttonOverlappedProps = {
  width: '3.5rem',
  height: '2.5rem',
  fontSize: theme.FONT_SIZE.MD,
  fontWeight: theme.FONT_WEIGHT.MEDIUM,
  backgroundColor: 'white',
};

export const AllowCard = ({ player, moveToProfile }: AllowCardProps) => {
  const handleClickProfile = () => {
    moveToProfile(PATH_NAME.GET_PROFILE_PATH(player.id));
  };

  const handleAllowClick = () => {};

  const handleRejectClick = () => {};

  return (
    <AllowCardContainer>
      <FlexBox>
        <Avatar
          src={player.profileImageUrl}
          size={40}
          onClick={handleClickProfile}
        />
        <Text
          size="1rem"
          weight={500}
          lineHeight="40px"
          ellipsis={1}
          onClick={handleClickProfile}
        >
          {player.nickname}
        </Text>
      </FlexBox>
      <FlexBox>
        <Button
          textColor={theme.PALETTE.RED_400}
          borderColor={theme.PALETTE.RED_400}
          onClick={handleAllowClick}
          {...buttonOverlappedProps}
        >
          수락
        </Button>
        <Button
          textColor={theme.PALETTE.GRAY_400}
          borderColor={theme.PALETTE.GRAY_400}
          onClick={handleRejectClick}
          {...buttonOverlappedProps}
        >
          거절
        </Button>
      </FlexBox>
    </AllowCardContainer>
  );
};