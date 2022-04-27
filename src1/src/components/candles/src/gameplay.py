import clock
import time
import pygame
from pygame.time import Clock

import startGame

class Candle:
    def __init__(self, screen, x, y, imageArray):
        self.images = []
        for i in imageArray:
            self.images.append(i)
        self.screen = screen
        self.x = x
        self.y = y
        self.currentSprite = 0
        self.image = self.images[self.currentSprite]
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

    # called to draw the candles
    def draw(self):

        self.currentSprite += 1
        if self.currentSprite > 2:
            self.currentSprite = 0

        self.screen.blit(self.images[self.currentSprite], (self.rect.x, self.rect.y))
        # for image in self.images:
        #     self.screen.blit(image, (self.rect.x, self.rect.y))
        # print("here we print")


def playerWin(turn):
    if turn:
        return "Player 1 Wins"
    return "Player 1 Lost"


def computerPicks(numberOfCandles):
    return 1 if (numberOfCandles % 4 == 0) else (numberOfCandles % 4)


# def getCandles(numberOfCandles):
#     return False if (numberOfCandles < 10) or (numberOfCandles > 30) else True


def appendArray(candlesArray):
    for x in range(0, 3, 1):
        candleSprite = pygame.image.load('./candleSprites/tile00' + str(x) + '.png').convert_alpha()
        candleSprite = pygame.transform.scale(candleSprite, (64,64))
        candlesArray.append(candleSprite)
    return candlesArray


def listCreate(screen, listOfCandles, numberOfCandles, candlesArray):
    width = candlesArray[0].get_width()/3
    space = 0
    for i in range(0, numberOfCandles, 1):
        listOfCandles.append(Candle(screen, (space + 1), (screen.get_height() / 2), candlesArray))
        space += width

    return listOfCandles

def buttonClick(xCoord, yCoord):
    """will return button value 1 - 3 of which was clicked"""
    #450 - 480
    if (yCoord >= 450 and yCoord <= 480):
        if(xCoord >= 15 and xCoord <= 106):
            print("1 button clicked")
            return 1
        if (xCoord >= 125 and xCoord <= 216):
            print("2 button clicked")
            return 2
        if (xCoord >= 235 and xCoord <= 326):
            print("3 button clicked")
            return 3

def ghostDisplay(xCord, yCord,screen, ghost):
    screen.blit(ghost, (xCord, yCord))
    return

"""
:param listOfCandles, num 
listOfCandles contains all Candle objects and num is the number of Candle objects
we are going to move off the display
"""

def kickOffScreen(listOfCandles, num, screen):

    # maxWidth = screen.get_width()
    # # print(maxWidth)
    # for i in range(0, num, 1):
    #     x = listOfCandles[len(listOfCandles) - (i + 1)].x
    #     print(maxWidth - x)
    #     while(x < maxWidth):
    #         listOfCandles[len(listOfCandles) - (i + 1)].x += 10
    #         # pygame.time.Clock().tick()
    #         listOfCandles[len(listOfCandles) - (i + 1)].draw()
    #         x += 1

        # print(x)
        # listOfCandles = listOfCandles[:-(i + 1)]
    pygame.mixer.Channel(0).play(pygame.mixer.Sound('./gameAudio/blowing.wav'))
    return listOfCandles[:-num]
    # x, y = candle.image.get_size()
    # for i in range(0, 8, 1):
    #     x -= 5
    #     y -= 8
    #     x = abs(x)
    #     y = abs(y)
    #     candle.image = pygame.transform.scale(candle.image, (x, y))
    #     # for element in listOfCandles:
    #     #     element.draw()

def play(screen, num):
    # pygame.init()
    # screen.fill((0, 0, 0))
    # pygame.display.update()
    # for i in range(11, 20, 2):
    #     print(computerPicks(i))
    # exit(1)
    pygame.mixer.init()

    # pygame.mixer.Channel(1).play(pygame.mixer.Sound('./gameAudio/menuMusic.wav'))

    userTurn = True
    oneBtn = pygame.image.load('gameplaySprites/oneButton.png').convert_alpha()
    # one_btn = pygame.transform.scale(one_btn, (200, 50))
    oneDisplayBtn = startGame.Button(screen, 10, screen.get_height() - 60, oneBtn)
    twoBtn = pygame.image.load('gameplaySprites/twoButton.png').convert_alpha()
    # two_btn = pygame.transform.scale(two_btn, (200, 50))
    twoDisplayBtn = startGame.Button(screen, 120, screen.get_height() - 60, twoBtn)
    threeBtn = pygame.image.load('gameplaySprites/threeButton.png').convert_alpha()
    # three_btn = pygame.transform.scale(three_btn, (200, 50))
    threeDisplayBtn = startGame.Button(screen, 230, screen.get_height() - 60, threeBtn)
    run = True

    numberOfCandles = num  # int(input("Enter candles: "))
    # print(numberOfCandles)
    # while not getCandles(numberOfCandles):
    #   numberOfCandles = int(input("Enter candles: "))
    # appending all my candle pictures to a list
    candlesArray = []
    candlesArray = appendArray(candlesArray)

    listOfCandles = []
    listOfCandles = listCreate(screen, listOfCandles, numberOfCandles, candlesArray)

    # for x in range(0, numberOfCandles, 1):
    #     candlesArray.append(list())
    #     for y in range(0, 6, 1):
    #         candlesArray[x].append(pygame.image.load('tile00' + str(y) + '.png').convert_alpha())
    backgroundTheme = pygame.image.load("gameplaySprites/gameBG.png")
    ghost = pygame.image.load("gameplaySprites/ghost.png")
    # backgroundTheme = pygame.transform.scale(screen, (screen.get_width(), screen.get_height()))
    clock = pygame.time.Clock()
    fpsCap = 60
    counter = 0
    candleWidth = 0

    ghostX = screen.get_width()

    while run:
        # screen.fill((255,255,255))
        # if ghostX == -1:

        screen.blit(backgroundTheme, (0,0))


        oneDisplayBtn.draw()
        twoDisplayBtn.draw()
        threeDisplayBtn.draw()

        if numberOfCandles > 0:
            pass
        else:
            run = False
        # looping through game events
        btnNum = -1
        for event in pygame.event.get():

            if event.type == pygame.MOUSEBUTTONDOWN:
                btnNum = buttonClick(mouseX, mouseY)
                candleWidth = listOfCandles[len(listOfCandles) - 1].x

            # if quit event then we quit the run loop
            # print(event.type)
            if event.type == pygame.QUIT:
                # quitting game
                pygame.quit()

            mouseX, mouseY = pygame.mouse.get_pos()
            # print(mouseX,mouseY)
            # else:
                # time.sleep(1)

        if (userTurn):
            if btnNum != -1:
                # print(btnNum)

                if btnNum == 1:
                    # if ghostX < candleWidth:
                    numberOfCandles -= 1
                    listOfCandles = kickOffScreen(listOfCandles, btnNum, screen)
                    # pygame.mixer.Channel(0).play(pygame.mixer.Sound('./gameAudio/blowing.mp3'))
                    userTurn = False
                elif btnNum == 2:
                    # if ghostX < candleWidth:
                    # ghostDisplay(listOfCandles[numberOfCandles - 1].x, listOfCandles[numberOfCandles - 1].y, screen, ghost)
                    numberOfCandles -= 2
                    listOfCandles = kickOffScreen(listOfCandles, btnNum, screen)
                    # pygame.mixer.music.play()
                    # pygame.mixer.Channel(0).play(pygame.mixer.Sound('./gameAudio/blowing.mp3'))
                    # listOfCandles = listOfCandles[:-2]
                    userTurn = False

                elif btnNum == 3:
                    # if ghostX < candleWidth:
                    # ghostDisplay(listOfCandles[numberOfCandles - 1].x, listOfCandles[numberOfCandles - 1].y, screen, ghost)
                    numberOfCandles -= 3
                    listOfCandles = kickOffScreen(listOfCandles, btnNum, screen)
                    # pygame.mixer.music.play()
                    # listOfCandles = listOfCandles[:-3]
                    userTurn = False

        if userTurn == False:
            ghostDisplay(ghostX, listOfCandles[len(listOfCandles) - 1].y, screen, ghost)
            ghostX -= 5
            if counter == (fpsCap) or ghostX < candleWidth:
                if ghostX < candleWidth:
                    cPick = computerPicks(numberOfCandles)
                    counter = 0
                    numberOfCandles -= cPick
                    listOfCandles = kickOffScreen(listOfCandles, cPick, screen)
                    # pygame.mixer.Channel(0).play(pygame.mixer.Sound('./gameAudio/blowing.mp3'))
                    userTurn = True
                    ghostX = screen.get_width()
            counter += 1
            # print(numberOfCandles)

            # call gameplay function
        # print("outside event loop inside while true", numberOfCandles)
        for element in listOfCandles:
            element.draw()

        clock.tick(fpsCap)
        pygame.display.update()
    return startGame.play()

""" Dead Code
    maxWidth = screen.get_width()
    print(maxWidth)
    for i in range(0, num, 1):
        x, y = listOfCandles[len(listOfCandles) - (i + 1)].x, listOfCandles[len(listOfCandles) - (i + 1)].y
        print(maxWidth - x)
        while(x < maxWidth):
            listOfCandles[len(listOfCandles) - (i + 1)].x += 1
            # time.sleep(1)
            listOfCandles[len(listOfCandles) - (i + 1)].draw()
            x += 1

        print(x, y)
        # listOfCandles = listOfCandles[:-(i + 1)]
    return listOfCandles
    # x, y = candle.image.get_size()
    # for i in range(0, 8, 1):
    #     x -= 5
    #     y -= 8
    #     x = abs(x)
    #     y = abs(y)
    #     candle.image = pygame.transform.scale(candle.image, (x, y))
    #     # for element in listOfCandles:
    #     #     element.draw()
"""