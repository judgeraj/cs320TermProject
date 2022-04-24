import pygame


class Player:
    def __init__(self, x, y, name, picture):
        self.name = name
        # self.picture = pygame.transform.scale(picture, (100, 50))
        # self.rect = self.picture.get_rect()
        self.x = x
        self.y = y
        # self.rect.topleft = (x, y)
