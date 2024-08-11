#import "AppDelegate.h"

#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  self.moduleName = @"NativePomodoro";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Call the super method
  [super applicationDidFinishLaunching:notification];

  // Get the main window
  NSWindow *window = [[[NSApplication sharedApplication] windows] firstObject];

  // Set the window title
  window.title = @"Native Pomodoro";

  // Set the window size
  [window setFrame:NSMakeRect(0, 0, 400, 300) display:YES]; // Position (x, y) and size (width, height)

  // Make the window unresizable by removing the resizable style mask
  window.styleMask &= ~NSWindowStyleMaskResizable;

  // Ensure the window is displayed
  [window makeKeyAndOrderFront:nil];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)concurrentRootEnabled
{
#ifdef RN_FABRIC_ENABLED
  return true;
#else
  return false;
#endif
}

@end
