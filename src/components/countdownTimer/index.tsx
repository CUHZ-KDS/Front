import { cn } from '@/lib/utils';
import React, { useState, useEffect, memo } from 'react';

interface CountdownTimerProps {
  /** 카운트다운을 시작할 전체 시간 (초 단위) */
  initialSeconds: number;
  /** 타이머의 크기 (px) */
  size?: number;
  /** 원의 두께 (px) */
  strokeWidth?: number;
  isTitle?: boolean;
  /** 시간이 다 되었을 때 호출될 함수 */
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = memo(
  ({
    className,
    initialSeconds,
    size = 40, // 기본 크기 40px
    strokeWidth = 4, // 기본 두께 4px
    onComplete,
  }) => {
    // 1. 남은 시간을 state로 관리
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    // 2. useEffect로 타이머 설정 및 정리
    useEffect(() => {
      // 시간이 0 이하면 타이머를 멈추고 onComplete 콜백 실행
      if (secondsLeft <= 0) {
        onComplete?.(); // onComplete 함수가 있으면 실행
        return;
      }

      // 1초마다 secondsLeft를 1씩 감소시키는 인터벌 설정
      const intervalId = setInterval(() => {
        setSecondsLeft(prevSeconds => prevSeconds - 1);
      }, 1000);

      // 컴포넌트가 언마운트되거나 secondsLeft가 바뀔 때 인터벌 정리
      return () => clearInterval(intervalId);
    }, [secondsLeft, onComplete]);

    // 3. SVG와 시간 표시를 위한 계산
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius; // 원의 둘레
    const progress = secondsLeft / initialSeconds; // 진행률 (1.0 ~ 0.0)

    // strokeDashoffset: 시간이 흐를수록 0에 가까워져 원이 채워짐
    const strokeDashoffset = circumference * (1 - progress);

    // 남은 시간을 HH:MM:SS 형식으로 변환
    const hours = Math.floor(secondsLeft / 3600); // 시간 계산
    const minutes = Math.floor((secondsLeft % 3600) / 60); // 분 계산
    const seconds = secondsLeft % 60; // 초 계산

    const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
      <div className="flex items-center justify-end gap-4 rounded-lg p-2 text-white">
        <span className={cn('text-xl font-bold tracking-wider select-none', className)}>
          {timeFormatted}
        </span>

        {/* 원형 프로그레스 바 */}
        <div style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            // SVG의 시작점을 12시 방향으로 돌리기 위해 transform 사용
            className="-rotate-90"
          >
            {/* 배경 원 (연한 색) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#FFB6C1" // 연한 핑크색
              strokeWidth={strokeWidth}
            />
            {/* 진행 상태 원 (진한 색) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#DC143C" // 진한 빨간색
              strokeWidth={strokeWidth}
              strokeLinecap="round" // 선 끝을 둥글게 처리
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300" // 부드러운 전환 효과
            />
          </svg>
        </div>
      </div>
    );
  }
);

export default CountdownTimer;
CountdownTimer.displayName = 'CountdownTimer';
