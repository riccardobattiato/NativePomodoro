import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Play } from '@/lib/icons/Play';
import { Pause } from '@/lib/icons/Pause';
import { SkipForward } from '@/lib/icons/SkipForward';

type Props = {
  isPlaying?: boolean;
  onPlay?: () => void;
  onSkip?: () => void;
};

const Controls = ({ isPlaying = false, onPlay, onSkip }: Props) => {
  return (
    <View className="flex-row items-center gap-x-4">
      <View>
        <Button
          variant={isPlaying ? 'secondary' : 'default'}
          size="lg"
          onPress={onPlay}
          className="flex-row gap-x-2 w-40">
          {isPlaying ? (
            <Pause className="text-secondary-foreground" />
          ) : (
            <Play className="text-primary-foreground" />
          )}
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </Button>
      </View>
      <View>
        <Button size="icon" variant="ghost" onPress={onSkip}>
          <SkipForward className="text-accent-foreground" />
        </Button>
      </View>
    </View>
  );
};

export default Controls;
