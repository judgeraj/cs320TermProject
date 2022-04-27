import pygame
from gameplay import play
from player import Player
import random
from threading import Timer
from spinner import Spinner

def getCandles(numberOfCandles):
    return False if (numberOfCandles < 10) or (numberOfCandles > 30) else True

def validNumber(input):
    if input.isdigit():
        return getCandles(int(input))

def displayCandleNumber(screen, number):
    print(number)
    return

def enter():
    # player1 = Player(50, 50, "Naruto", 'naruto.png')
    # player2 = Player(50, 50, "star", 'star.png')
    screen_height, screen_width = 500, 800
    rand = [i for i in range(10, 31, 1)]
    for i in range(5):
        rand.append("random")

    run = True
    pygame.init()
    test = False
    clock = pygame.time.Clock()
    # setting up display screen
    screen = pygame.display.set_mode((screen_width, screen_height))
    # text_rect = pygame.Rect(200, 200, 140, 32)
    # box_color = pygame.Color('lightskyblue3')
    spinner_img = pygame.image.load('./menuSprites/spinner.png').convert()
    spinny = Spinner(screen, spinner_img, ((screen_width/2) - int((spinner_img.get_width()/2))),((screen_height/2) - int((spinner_img.get_height()/2))))
    # text initialization
    # font = pygame.font.Font(None, 32)
    # text = ''
    if test:
        return screen
    angle = 0
    counter = 0
    while run:
        # looping through game events
        # angle += 3
        if counter != 60:
            screen.blit(pygame.transform.rotate(spinner_img, spinny.currentAngle),(150, 0)) # (((screen_width) - int((spinner_img.get_width()/2))),((screen_height) - int((spinner_img.get_height()/2))))) #(screen.get_width()/2 - spinner_img.x/2, screen.get_height()/2 - spinner_img.y/2)
            angle %= 360
            spinny.draw(angle)
            # pygame.transform.rotate(spinny.image, spinny.currentAngle)
            counter += 1
        number = random.choice(rand)
        if number != "random":
            # number = random.choice(rand)
            if counter == 60:
                displayCandleNumber(screen, number)
                return play(screen, number)

        for event in pygame.event.get():
            # if quit event then we quit the run loop
            if event.type == pygame.QUIT:
                pygame.quit()
                exit(0)

        pygame.display.flip()
        clock.tick(60)


"""
 if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_BACKSPACE:
                    text = text[:-1]
                else:
                    text += event.unicode
                if event.key == pygame.K_RETURN:
                    if len(text) > 0:
                        print(len(text))
                        # if count == 0:
                        #     player1.name = text
                        #     count += 1
                        # if count == 1:
                        #     player2.name = text
                        #     count += 1
                        # if count == 2:
                        text = text[:-1]
                        if validNumber(text):
                            count = 0
                            return play(screen, int(text), player1, player2)
                            
                    screen.fill((0, 0, 0))
        # print(validNumber(text))

        pygame.draw.rect(screen, box_color, text_rect, 2)

        text_surface = font.render(text, True, (255, 255, 255))
        screen.blit(text_surface, (text_rect.x + 5, text_rect.y + 5))
        text_rect.w = max(50, text_surface.get_width() + 10)
"""
