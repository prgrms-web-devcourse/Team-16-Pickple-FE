import { useNavigate } from 'react-router-dom';

import { PositionItemBox } from '@pages/GamesDetailPage/GamesDetailPage.styles';

import { Avatar } from '@components/Avatar';
import { Button } from '@components/shared/Button';
import { Flex } from '@components/shared/Flex';
import { Image } from '@components/shared/Image';
import { Text } from '@components/shared/Text';

import { usePositionToast } from '@hooks/usePositionToast';

import { theme } from '@styles/theme';

import { Game } from '@type/models';

import { PATH_NAME } from '@constants/pathName';
import { WEEKDAY } from '@constants/weekday';

import Ball from '@assets/ball.svg';
import GameMember from '@assets/gameMember.svg';
import Money from '@assets/money.svg';

import {
  ContentText,
  GrayText,
  GuestName,
  Guests,
  GuestsContainer,
  InfoItem,
  PageContent,
  PageLayout,
  TextContainer,
  UserDataWrapper,
} from './GamesDetailPage.styles';

export const GamesDetailPage = ({
  match,
  onNavigate,
}: {
  match: Game | undefined;
  onNavigate?: VoidFunction;
}) => {
  const navigate = useNavigate();
  const { handleClickPosition } = usePositionToast();
  if (match === undefined) {
    return <></>;
  }
  const [year, month, day] = match!.playDate.split('-');
  const [hour, min] = match!.playStartTime.split(':');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const weekday = WEEKDAY[date.getDay()];
  return (
    match && (
      <PageLayout>
        <PageContent>
          <div>
            <TextContainer>
              <Text size={24} weight={700}>
                {match.addressDepth1}
              </Text>
              <Text size={24} weight={700}>
                {match.addressDepth2}
              </Text>
            </TextContainer>
            <TextContainer>
              <Text size={20} weight={700}>
                {`${month}월 ${day}일 ${weekday}요일 ${hour}시 ${min}분`}
              </Text>
            </TextContainer>
          </div>
          <UserDataWrapper>
            <Flex gap={5} align="center">
              <Avatar
                size={40}
                src={match.host.profileImageUrl}
                border={`1px solid ${theme.PALETTE.GRAY_400}`}
              />
              <Flex direction="column">
                <GrayText size={12}>호스트</GrayText>
                <Text size={16}>{match.host.nickname}</Text>
              </Flex>
            </Flex>
          </UserDataWrapper>
          <Text size={20} weight={700}>
            경기 정보
          </Text>
          <Flex direction="column" gap={5}>
            <Flex gap={20}>
              <GrayText>위치</GrayText>
              <Flex direction="column">
                <Text>{match.mainAddress}</Text>
                <Text>{match.detailAddress}</Text>
              </Flex>
            </Flex>
            <Flex gap={20}>
              <GrayText>날짜</GrayText>
              <Text>{`${year}.${month}.${day} ${weekday}요일`}</Text>
            </Flex>
            <Flex gap={20}>
              <GrayText>시간</GrayText>
              <Text>
                {`${match.playStartTime.slice(0, 5)}
                 ~ ${match.playEndTime.slice(0, 5)} (${
                   match.playTimeMinutes / 60
                 }h)`}
              </Text>
            </Flex>
            <Flex>
              <GrayText nowrap>선호 포지션</GrayText>
            </Flex>
            <Flex gap={10}>
              {match.positions.map((position) => (
                <PositionItemBox
                  key={position}
                  onClick={() => handleClickPosition(position)}
                >
                  {position}
                </PositionItemBox>
              ))}
            </Flex>
          </Flex>
          <Flex gap={10}>
            <InfoItem>
              <GrayText size={12}>참가비</GrayText>
              <Image width={40} src={Money} alt="money" />
              <Text size={16}>{`${match.cost.toLocaleString()}원`}</Text>
            </InfoItem>
            <InfoItem>
              <GrayText size={12}>현재원</GrayText>
              <Image width={40} src={Ball} alt="ball" />
              <Text size={16}>{`${match.memberCount}명`}</Text>
            </InfoItem>
            <InfoItem>
              <GrayText size={12}>정원</GrayText>
              <Image width={40} src={GameMember} alt="member" />
              <Text size={16}>{`${match.maxMemberCount}명`}</Text>
            </InfoItem>
          </Flex>
          <Text size={20} weight={700}>
            경기 소개
          </Text>
          <ContentText weight={300}>{match.content}</ContentText>
          <Text size={20} weight={700}>
            참여한 게스트
          </Text>
          <GuestsContainer>
            <Guests gap={10}>
              {match.members.map(({ id, profileImageUrl, nickname }) => (
                <Flex direction="column" key={id}>
                  <Avatar
                    radius="8px"
                    border={`1px solid ${theme.PALETTE.GRAY_200}`}
                    size={60}
                    src={profileImageUrl}
                  />
                  <GuestName size={12}>{nickname}</GuestName>
                </Flex>
              ))}
            </Guests>
          </GuestsContainer>
          <Button
            {...theme.BUTTON_PROPS.LARGE_RED_BUTTON_PROPS}
            height="50px"
            width="100%"
            onClick={() => {
              onNavigate?.();
              navigate(PATH_NAME.GET_GAMES_PATH(String(match.id)));
            }}
          >
            자세히보기
          </Button>
        </PageContent>
      </PageLayout>
    )
  );
};
