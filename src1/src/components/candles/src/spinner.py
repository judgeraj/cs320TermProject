import pygame

class Spinner():
    def __init__(self, screen, image, xPos, yPos):
        self.image = image
        self.screen = screen
        self.x = xPos
        self.y = yPos
        self.currentAngle = 0
        self.rect = self.image.get_rect()
        self.center = self.rect.center
        self.rect.topleft = (self.center)

    def draw(self, angle):
        self.currentAngle += 3
        self.currentAngle %= 360
