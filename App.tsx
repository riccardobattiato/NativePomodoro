/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, View } from 'react-native';
import './global.css';
import { usePomodoro } from '@/hooks/usePomodoro';
import Timer from '@/components/timer';
import Controls from '@/components/controls';
import { PortalHost } from '@rn-primitives/portal';
import TopBar from '@/components/top-bar';

function App(): React.JSX.Element {
  const { play, pomodoro, time, isRunning, skip, restart } = usePomodoro();

  return (
    <SafeAreaView className="bg-background h-full p-8 macos:p-4">
      <View className="flex-[2] macos:flex-1">
        <TopBar onReset={restart} />
      </View>
      <View className="flex-[4] justify-center">
        <Timer type={pomodoro.type} value={time} />
      </View>
      <View className="flex-[2] items-center justify-center">
        <Controls isPlaying={isRunning} onPlay={play} onSkip={skip} />
      </View>
      <PortalHost />
    </SafeAreaView>
  );
}

export default App;
