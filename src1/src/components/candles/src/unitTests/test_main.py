import unittest

import pygame

import startGame
from startGame import Button
from info import *
import player
class testMain(unittest.TestCase):

#testing valid click
    """
    Acceptance Test
    Black-box test
    Testing to see if the click boundaries are valid for the start button
    """
    def test_validClick(self):
        self.assertFalse(main.validClick(340, 225))
        self.assertFalse(main.validClick(460, 275))
        self.assertTrue(main.validClick(341, 226))
        self.assertTrue(main.validClick(459, 274))
        self.assertFalse(main.validClick(341, 224))
        self.assertFalse(main.validClick(459, 224))
        self.assertFalse(main.validClick(341, 276))
        self.assertFalse(main.validClick(459, 276))

#testing to see if button drew acceptance black box
    """
    Acceptance Test
    Black-box Testing
    Testing to see if the button is getting draw
    """
    def test_buttonDrawn(self):
        pygame.init()
        SCREEN_HEIGHT = 500
        SCREEN_WIDTH = 800
        screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        startButton = pygame.image.load('../start_btn.png').convert_alpha()
        button = Button(screen, int(SCREEN_WIDTH / 2), int(SCREEN_HEIGHT / 2), startButton)
        button.draw()
        self.assertTrue(button.drawn)

    """
    Integration test which is testing to see if window is displayed
    """
    def test_startOfGame(self):
        flag = enter()
        self.assertEqual((flag.get_width(), flag.get_height()), (800, 500))




