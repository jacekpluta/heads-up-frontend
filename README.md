# Heads Up App

Heads Up is a web game application written in React (React Hooks, React Router, Redux) as a front-end and NodeJS/Express as back-end.
Players guess words or phrases that appear on the mobile device held to their foreheads by watching the other players act it out or give hints as time counted down.
The aim is to get as many words/phrases correct.

Game only works on mobile devices with motion sensors (accelerometer and gyroscope).

![](mdimages/12.gif)

You choose a category and one person holds the phone/tablet in front of his/her head.
On the screen a text will appear. The other players have to describe the phrase to the active player, without mentioning any word from the actual phrase.
Once the word is guessed the active player tilts phone forward and a new phrase will be shown.
When the active player clicks on the screen, the current phrase will be skipped and a new phrase will be shown.
For every round there is a time limit and the goal is to guess as many words as possible.
This web app take the concept of mobile app Heads Up!

## Installation

install all packages

```
npm install
```

go to https://bitbucket.org/jacagaca/headsupbackend and download back-end server
install all packages in server directory and start the server with "npm install" and "npm start"

start the app

```
npm start
```

## Usage example

1. Start the game by clicking on one of the four categories.

![](mdimages/1.png)

2. Choose game variant (describe, show, challenge, draw). It this case it is "DESCRIBE" category.

![](mdimages/2.png)

3. Place your phone/tablet on the forehead to start the game.

![](mdimages/3.png)

4. The game has started. Second player sees that codeword and has to ddescribe the phrase to the active player, without mentioning any word from the actual phrase.

![](mdimages/4.png)

5. If you have guessed the word you should tilt your phone forward to gain a point.

In case of running out of time or skipping the word, you lose a point.  
![](mdimages/5.png)

6. After the game has ended, you can see what medal and amount of points you have gotten.
   Below you can see table with results what codewords you have answered.
   At the bottom you have a possibility to repeat a game with the same variant and category or go back and choose a different game variant.

You can also create your own categories! Just click in the main menu "YOUR CATEGORIES" button.  
![](mdimages/55.png)

7. Create an account using your e-mail address and password.  
   ![](mdimages/6.png)

8. After logging in, click in the top left "Add" button, enter category name and description.  
   ![](mdimages/7.png)
   
9. Now you need to put atleast 10 questions before a game could be started. You can do that by clicking "QUESTIONS" button.  
   ![](mdimages/8.png)

10. To add a new question, simply just click plus button in top right corrner, enter new question and click confirm.  
   ![](mdimages/9.png)

11. After adding atleast 10 questions you can start the game. Course of the game is exactly the same as choosing normal category from the main menu.  
    ![](mdimages/10.png)

12. Last but not least is an option to see all categories created by players. In the main menu click "ALL CATEGORIES" button at the top right corner at main page.
    Here you can see all categories created by other players and play them with your friends.

![](mdimages/11.png)


## Contact

Your Name: Jacek Pluta

Email: j.pluta123@gmail.com

Website: https://jacekplutaportfolio.netlify.app/

## License

Copyright 2020 © Jacek Pluta
