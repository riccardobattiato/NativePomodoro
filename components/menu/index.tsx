import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from '@/lib/icons/EllipsisVertical';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/lib/useColorScheme';

const Menu = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleChange = (theme: string) => {
    console.log('HELLO', theme);
    switch (theme) {
      case 'system':
      case 'light':
      case 'dark':
        setColorScheme(theme);
        break;
      default:
        throw new Error('Wrong param for theme change');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mt-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={colorScheme}
            onValueChange={handleChange}>
            <DropdownMenuRadioItem
              value="system"
              onPress={() => {
                handleChange('system');
              }}>
              <Text>System</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="light"
              onPress={() => {
                handleChange('light');
              }}>
              <Text>Light</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              onPress={() => {
                handleChange('dark');
              }}>
              <Text>Dark</Text>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
