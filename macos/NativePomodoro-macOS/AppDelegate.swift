//
//  AppDelegate.swift
//  NativePomodoro-macOS
//
//  Created by Riccardo Mario Battiato on 12/08/24.
//

import Foundation
import Cocoa
import React

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {
    var window: NSWindow!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
          let jsCodeLocation: URL
          #if DEBUG
            jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
          #else
            jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
          #endif
          let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "NativePomodoro", initialProperties: nil, launchOptions: nil)
          let rootViewController = NSViewController()
          rootViewController.view = rootView

          #if DEBUG
             window = NSWindow(
               contentRect: NSRect(x: 0, y: 0, width: 1, height: 1),
               styleMask: [.titled, .closable],
               backing: .buffered,
               defer: false)

             window.contentViewController = rootViewController
             window.center()
             window.setFrameAutosaveName("Native Pomodoro Main Window")
             window.isReleasedWhenClosed = false
             window.makeKeyAndOrderFront(self)
             let screen: NSScreen = NSScreen.main!
             let midScreenX = screen.frame.midX
             let posScreenY = 200
             let origin = CGPoint(x: Int(midScreenX), y: posScreenY)
             let size = CGSize(width: 400, height: 350)
             let frame = NSRect(origin: origin, size: size)
             window.setFrame(frame, display: true)
             #endif
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        window.makeKeyAndOrderFront(nil)
        return true
    }
}
