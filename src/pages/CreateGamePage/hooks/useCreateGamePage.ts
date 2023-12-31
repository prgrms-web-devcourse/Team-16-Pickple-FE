import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { LoginRequireError } from '@routes/LoginRequireBoundary';

import { useGameMutation } from '@hooks/games/useGameMutation';

import { useLoginInfoStore } from '@stores/loginInfo.store';

import { PostGameRequest } from '@type/api/games';
import { Position } from '@type/models/Position';

import { PATH_NAME } from '@constants/pathName';

import { formatDateToString } from '@utils/formatDateToString';

export const useCreateGamePage = () => {
  const loginInfo = useLoginInfoStore((state) => state.loginInfo);
  if (!loginInfo?.id) {
    throw new LoginRequireError();
  }
  const { mutate } = useGameMutation();
  const navigate = useNavigate();
  const methods = useForm();

  const [maxMemberCount, setMaxMemberCount] = useState<string>('');
  const [playDate, setPlayDate] = useState<string>('');
  const [playStartTimeHours, setPlayStartTimeHours] = useState<string>('');
  const [playStartTimeMinutes, setPlayStartTimeMinutes] = useState<string>('');
  const [playTimeMinutes, setPlayTimeMinutes] = useState<string>('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [mainAddress, setMainAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [cost, setCost] = useState<string>('0');
  const [content, setContent] = useState<string>('');

  const [isGuestCountModalOpen, setIsGuestCountModalOpen] =
    useState<boolean>(false);
  const [isMatchDateModalOpen, setIsMatchDateModalOpen] =
    useState<boolean>(false);
  const [isStartTimeModalOpen, setIsStartTimeModalOpen] =
    useState<boolean>(false);
  const [isPlayTimeModalOpen, setIsPlayTimeModalOpen] =
    useState<boolean>(false);

  const handleMaxMemberCount = (maxMemberCount: string) => {
    isGuestCountModalOpen || setMaxMemberCount(maxMemberCount);
  };

  const handlePlayStartTimeHours = (playStartTimeHours: string) => {
    isStartTimeModalOpen || setPlayStartTimeHours(playStartTimeHours);
  };

  const handlePlayStartTimeMinutes = (playStartTimeMinutes: string) => {
    isStartTimeModalOpen || setPlayStartTimeMinutes(playStartTimeMinutes);
  };

  const handlePlayTimeMinutes = (playTimeMinutes: string) => {
    isPlayTimeModalOpen || setPlayTimeMinutes(playTimeMinutes);
  };

  const handleAddressSelect = () => {
    new daum.Postcode({
      oncomplete: ({ address }: { address: string }) => {
        setMainAddress(address);
      },
    }).open();
  };

  const handleCost = (item: string) => {
    if (parseInt(item) < 0) {
      setCost('0');
    } else if (parseInt(item) > 100000) {
      setCost('100000');
    } else setCost(item);
  };

  const toggleGuestCountModal = () => {
    setIsGuestCountModalOpen((prev) => !prev);
  };

  const toggleMatchDateModal = () => {
    setIsMatchDateModalOpen((prev) => !prev);
  };

  const toggleStartTimeModal = () => {
    setIsStartTimeModalOpen((prev) => !prev);
  };

  const togglePlayTimeModal = () => {
    setIsPlayTimeModalOpen((prev) => !prev);
  };

  const onSubmit = () => {
    const gameData: PostGameRequest = {
      maxMemberCount: parseInt(maxMemberCount),
      playDate: playDate,
      playStartTime: `${playStartTimeHours}:${playStartTimeMinutes}`,
      playTimeMinutes: parseInt(playTimeMinutes),
      positions: positions,
      mainAddress: mainAddress,
      detailAddress: detailAddress,
      cost: parseInt(cost),
      content: content,
    };

    if (!validateStartTime()) {
      toast.error('현재시간 이전의 경기는\n생성할 수 없습니다.');
      throw new Error();
    }

    mutate(gameData, {
      onSuccess: ({ gameId }) => {
        navigate(PATH_NAME.GET_GAMES_PATH(String(gameId)));
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          error.response?.data.code === 'ADD-001' &&
            toast.error('서울시만 서비스중입니다.');
        }
      },
    });
  };
  const validateStartTime = () => {
    const [playYear, playMonth, playDay] = playDate.split('-').map(Number);
    const [currentYear, currentMonth, currentDay] = formatDateToString(
      new Date()
    )
      .split('-')
      .map(Number);
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    if (
      playYear > currentYear ||
      (playYear >= currentYear && playMonth > currentMonth) ||
      (playYear >= currentYear &&
        playMonth >= currentMonth &&
        playDay > currentDay)
    ) {
      return true;
    }

    if (
      Number(playStartTimeHours) > currentHours ||
      (Number(playStartTimeHours) >= currentHours &&
        Number(playStartTimeMinutes) > currentMinutes)
    ) {
      return true;
    }

    return false;
  };

  return {
    state: {
      maxMemberCount,
      playDate,
      playStartTimeHours,
      playStartTimeMinutes,
      playTimeMinutes,
      mainAddress,
      detailAddress,
      cost,
      isGuestCountModalOpen,
      isMatchDateModalOpen,
      isStartTimeModalOpen,
      isPlayTimeModalOpen,
    },
    methods,
    onSubmit,
    handleAddressSelect,
    handleCost,
    toggleGuestCountModal,
    toggleMatchDateModal,
    toggleStartTimeModal,
    togglePlayTimeModal,
    setPlayDate,
    setPositions,
    setDetailAddress,
    setContent,
    handleMaxMemberCount,
    handlePlayStartTimeHours,
    handlePlayStartTimeMinutes,
    handlePlayTimeMinutes,
  };
};
