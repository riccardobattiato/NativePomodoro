import * as React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { RotateCcw } from '@/lib/icons/RotateCcw';

type Props = {
  onReset?: () => void;
};

const TopBar = ({ onReset }: Props) => {
  return (
    <View className="ml-auto flex-row items-center">
      <Button variant="ghost" onPress={onReset}>
        <RotateCcw className="text-foreground" />
      </Button>
    </View>
  );
};

export default TopBar;
