# Atari Pong
The game was originally manufactured by Atari, which released it in 1972. Allan Alcorn created Pong as a training exercise assigned to him by Atari co-founder Nolan Bushnell ([Wikipedia](https://en.wikipedia.org/wiki/Pong)).

## About this Project
This is a remake of the original atari pong game.
I have used the [Phaser CE](https://github.com/photonstorm/phaser-ce) and the [Neuroevolution Library](https://github.com/digitsensitive/neuroevolution-typescript)
in Typescript for the machine learning.

## Screenshot

![Atari Remake](/experiments/atari-pong/assets/github/atari-pong-screen1.png)

## Design
### Colors
- Black background (#000000)
- All game elements (ball, paddles, center line, scores) are in white (#FFFFFF).

### Dimensions
- Screen size: 799 x 488 pixels
- Ball: 8x8 pixels
- Paddles (each): 8x30 pixels
- Center line (dashed, each): 4x8 pixels
- Score (each): Height 64 pixels.

### Sound
- Currently no Sound

### Input
- No input -> Controlled by Reinforcement Library

## Versions

### 0.0.2 (27.08.2017)
- dashed line
- integrate machine learning algorithm

### 0.0.1 (12.08.2017)
- All elements integrated
- Player and AI working
