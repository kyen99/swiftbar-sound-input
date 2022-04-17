# Swiftbar Sound Input

I created this plugin to give me a quick way to see what the current sound input is on my mac, and to auto change it when I'm in a zoom meeting and my Elgato mic is plugged in.

You will need to edit the script to use all features.

## Dependencies

node 16+, zx, switchaudio-osx

## Main features

- menu bar shows an icon for the currently selected sound input device
- dropdown shows selected and all available inputs
- dropdown allows changing to another device
- automatically sets the sound input to your preferred input for Zoom, if the Zoom client is in a meeting

## To use this

- Copy or synlink to your switbar plugin folder and rename to sound-input.10s.js (or however often you want it to run)
- Edit the preferred zoom input (if you want to use that auto change feature)
- Change the icons and inputs according to what you normally use on your system
