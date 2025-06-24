'use client';

import { useParams } from 'next/navigation';
import { useShowDetail } from '../../hooks/useDetailShow';
import ThreeContainer, {
  CenterContainer,
  LeftContainer,
  RightContainer,
} from '@/components/layout/ThreeContainer';
import ShowDescription from '../view/show-description';
import ShowCalendarAndTimer from '../view/show-calendar-and-timer';
import Poster from '@/components/poster';
import Gradient from '@/components/gradient';

export default function ShowDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: show } = useShowDetail(Number(id));

  const { title, ticketDateTime, startDate, endDate, imgSource } = show;

  return (
    <ThreeContainer title={title}>
      <LeftContainer>
        <Poster image={imgSource || ''} />
        <Gradient />
      </LeftContainer>
      <CenterContainer>
        <ShowDescription {...show} />
      </CenterContainer>
      <RightContainer>
        <ShowCalendarAndTimer
          ticketDateTime={ticketDateTime}
          id={id}
          startDate={startDate}
          endDate={endDate}
        />
      </RightContainer>
    </ThreeContainer>
  );
}
