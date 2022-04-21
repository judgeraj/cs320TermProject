import unittest
import pygame
import gameplay
from gameplay import *


class TestGameplay(unittest.TestCase):

    """
    White-Box Test
    Full branch coverage for the following method, (numbers are 100% gauranteed 1 - 3)
    def computerPicks(numberOfCandles):
        return 1 if (numberOfCandles % 4 == 0) else (numberOfCandles % 4)
    """
    def test_computerPicks(self):
        for i in range(4, 20, 4):
            self.assertEqual(gameplay.computerPicks(i), 1)

        for i in range(1, 20, 2):
            self.assertEqual(gameplay.computerPicks(i), i%4)

    """
    White-Box Test
    
    Full branch coverage test for checking if user input was correct
    
    def getCandles(numberOfCandles):
        return False if (numberOfCandles < 10) or (numberOfCandles > 20) else True

    """
    def test_getCandles(self):
        self.assertFalse(gameplay.getCandles(9))
        self.assertTrue(gameplay.getCandles(10))
        self.assertFalse(gameplay.getCandles(21))
        self.assertTrue(gameplay.getCandles(20))

    """
    Integration testing
    """

    def test_candle(self):
        pygame.init()
        candlesArray = []
        SCREEN_HEIGHT = 500
        SCREEN_WIDTH = 800
        screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        numberOfCandles = 11
        candlesArray = appendArray(candlesArray)

        listOfCandles = []
        listOfCandles = listCreate(screen, listOfCandles, numberOfCandles, candlesArray)
        # print(len(listOfCandles[0].images))
        self.assertEqual(len(listOfCandles), numberOfCandles)

        for candle in listOfCandles:
            self.assertEqual(len(candle.images), 6)
            self.assertEqual((candle.screen.get_width(),candle.screen.get_height()), (800,500))

    def test_Win(self):
        self.assertEqual(playerWin(False), "Player 1 Wins")
        self.assertEqual(playerWin(True), "Player 1 Wins")
        self.assertEqual(playerWin(True), "Player 1 Wins")
        self.assertEqual(playerWin(False), "Player 1 Lost")

