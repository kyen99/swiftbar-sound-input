#!/usr/bin/env zx

/*

Shows currently selected sound input and allows changing
Automatically sets sound input to preferred zoom input if zoom is in a meeting

by Kai Yen

<xbar.title>Sound Input</xbar.title>
<xbar.version>0.1</xbar.version>
<xbar.author>Kai Yen</xbar.author>
<xbar.author.github>kyen99</xbar.author.github>
<xbar.desc>Shows selected sound input and allows changing.</xbar.desc>
<xbar.dependencies>node>=16,zx,switchaudio-osx</xbar.dependencies>
<swiftbar.hideAbout>true</swiftbar.hideAbout>
<swiftbar.hideRunInTerminal>true</swiftbar.hideRunInTerminal>
<swiftbar.hideLastUpdated>true</swiftbar.hideLastUpdated>
<swiftbar.hideDisablePlugin>true</swiftbar.hideDisablePlugin>
<swiftbar.hideSwiftBar>true</swiftbar.hideSwiftBar>

*/

const PREFERRED_ZOOM_INPUT = 'Elgato Wave:3'
const CMD = '/opt/homebrew/bin/SwitchAudioSource'

const zoomIsInMeeting = async () =>
  (await quiet($`ps ax`).pipe(quiet($`grep CptHost`))).stdout
    .split('\n')
    .filter((i) => i !== '' && !i.match(/grep/)).length > 0

const getSelectedInput = async () =>
  (await quiet($`${CMD} -t input -c`)).stdout.replace('\n', '')

const getIcon = (s) => {
  if (s === PREFERRED_ZOOM_INPUT) return '🎙'
  if (s === 'MacBook Pro Microphone') return '💻'
  if (s.match(/^SOUNDPEATS/)) return '🎧'
  return '🎤'
}

;(async function () {
  const availableInputs = (await quiet($`${CMD} -t input -a`)).stdout
    .split('\n')
    .filter((i) => i !== '' && i !== 'ZoomAudioDevice')

  let selectedInput = await getSelectedInput()

  if (
    availableInputs.includes(PREFERRED_ZOOM_INPUT) &&
    selectedInput !== PREFERRED_ZOOM_INPUT &&
    (await zoomIsInMeeting())
  ) {
    await quiet($`${CMD} -t input -s "${PREFERRED_ZOOM_INPUT}"`)
    selectedInput = await getSelectedInput()
  }

  const changeInputCmds = availableInputs.map((input) => {
    const command = [
      `bash=${CMD}`,
      'param0=-t',
      'param1=input',
      'param2=-s',
      `param3="${input}"`,
      'terminal=false',
      'refresh=true',
      `checked=${input === selectedInput}`,
    ].join(' ')

    return input + ' | ' + command
  })

  console.log(getIcon(selectedInput))
  console.log('---')
  console.log(`Select sound input`)
  console.log('---')
  changeInputCmds.forEach((cmd) => console.log(cmd))
})()
