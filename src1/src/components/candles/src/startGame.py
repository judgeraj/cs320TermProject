import pygame

import info


class Button():
    def __init__(self, screen, x, y, image):
        # dim = (image.get_width,image.get_height)
        self.drawn = None
        self.image = pygame.transform.scale(image, (100, 50))
        self.screen = screen
        self.rect = self.image.get_rect()
        self.rect.topleft = (abs(x), abs(y))

    def draw(self):
        #drawing my button
        self.screen.blit(self.image, (self.rect.x, self.rect.y))
        self.drawn = True


def validClick(mouseX, mouseY):
    if (mouseX > 223 and mouseX < 500) and (mouseY > 151 and mouseY < 230):
        #call to start game
        return info.enter()
    if (mouseX > 223 and mouseX < 500) and (mouseY > 151 and mouseY < 230):
        # call to setting menu
        return info.setting()
    if (mouseX > 223 and mouseX < 500) and (mouseY > 151 and mouseY < 230):
        return

def play():

    pygame.init()
    pygame.mixer.music.load('./gameAudio/menuMusic.wav')

    SCREEN_HEIGHT = 500
    SCREEN_WIDTH = 800
    WHITE = (255, 255, 255)
    PINK = (255, 192, 203)
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Candles")
    startButton = pygame.image.load('menuSprites/menu.png')
    # button = Button(screen, (int(SCREEN_WIDTH / 2) - startButton.get_height()/2), (int(SCREEN_HEIGHT / 2) - (startButton.get_height() / 2)/2), startButton)

    screen.fill(PINK)
    run = True
    startGame = False
    pygame.mixer.music.play(-1)
    while run:
        screen.blit(startButton, (0,0))
        # if startGame == True:
        # looping through game events
        print(pygame.mouse.get_pos())
        for event in pygame.event.get():
            # if quit event then we quit the run loop
            if event.type == pygame.QUIT:
                # switching run flag to quit game
                run = False
            mouseX, mouseY = pygame.mouse.get_pos()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if validClick(mouseX, mouseY):
                    continue
                else:
                    return
            # if startGame == True:
            #     # user hit start game button need to switch page
            #     return info.enter()
                # call gameplay function
        pygame.display.update()

if __name__ == '__main__':
    play()