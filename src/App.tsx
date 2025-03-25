import {
	faBolt,
	faDrum,
	faHandRock,
	faMicrophone,
	faMusic,
	faPlay,
	faStop,
	faVolumeDown,
	faVolumeUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './App.css'

interface Sound {
	key: number
	sound: string
	icon: React.ComponentProps<typeof FontAwesomeIcon>['icon']
	src: string
}

const App: React.FC = () => {
	const [volume, setVolume] = useState<number>(50)

	const sounds: Sound[] = [
		{
			key: 65,
			sound: 'Open Hat',
			icon: faDrum,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/openhat.wav',
		},
		{
			key: 83,
			sound: 'Clap',
			icon: faHandRock,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/clap.wav',
		},
		{
			key: 68,
			sound: 'Hit Hat',
			icon: faMusic,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/hihat.wav',
		},
		{
			key: 70,
			sound: 'Kick',
			icon: faPlay,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/kick.wav',
		},
		{
			key: 71,
			sound: 'Boom',
			icon: faBolt,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/boom.wav',
		},
		{
			key: 72,
			sound: 'Ride',
			icon: faMicrophone,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/ride.wav',
		},
		{
			key: 74,
			sound: 'Snare',
			icon: faStop,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/snare.wav',
		},
		{
			key: 75,
			sound: 'Tom',
			icon: faVolumeUp,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tom.wav',
		},
		{
			key: 76,
			sound: 'Tink',
			icon: faVolumeDown,
			src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tink.wav',
		},
	]

	const handleKeyPress = (event: KeyboardEvent): void => {
		const sound = sounds.find(s => s.key === event.keyCode)
		if (sound) {
			const audioElement = document.querySelector(
				`audio[data-key="${sound.key}"]`
			) as HTMLAudioElement
			if (audioElement) {
				audioElement.currentTime = 0
				audioElement.play()
			}
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress)
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [])

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newVolume = parseInt(e.target.value, 10)
		setVolume(newVolume)
		const audioElements = document.querySelectorAll(
			'audio'
		) as NodeListOf<HTMLAudioElement>
		audioElements.forEach(audio => {
			audio.volume = newVolume / 100
		})
	}

	return (
		<div>
			<h1>Drum Machine</h1>
			<input
				type='range'
				min='0'
				max='100'
				value={volume}
				onChange={handleVolumeChange}
			/>
			<div>
				{sounds.map(({ key, sound, icon, src }) => (
					<button
						key={key}
						onClick={() => handleKeyPress({ keyCode: key } as KeyboardEvent)}
					>
						<FontAwesomeIcon icon={icon} />
						<audio data-key={key} src={src}></audio>
						{sound}
					</button>
				))}
			</div>
		</div>
	)
}

export default App
