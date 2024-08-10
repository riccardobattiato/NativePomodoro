import * as React from 'react';
import { Duration } from 'luxon';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SessionType } from '@/lib/pomodoro/types';
import { cn } from '@/lib/utils';

type Props = {
  value: Duration;
  type: SessionType;
};

const Timer = ({ type, value }: Props) => {
  let label;
  switch (type) {
    case SessionType.SHORT_BREAK:
      label = 'Short break';
      break;
    case SessionType.LONG_BREAK:
      label = 'Long break';
      break;
    case SessionType.FOCUS:
    default:
      label = 'Focus';
  }

  const formatted = value.toFormat("mm':'ss");

  return (
    <View className="gap-y-4">
      <Text className="text-2xl text-center">{label}</Text>
      <View className="flex-row justify-center">
        {formatted.split('').map((char, i) => (
          <Text
            key={`char-${i}`}
            className={cn('text-9xl text-center', {
              'w-20': char !== ':',
            })}>
            {char}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Timer;
