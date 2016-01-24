#coding: utf-8
import os
import sys

def env():
		print os.environ

def pid():
		print os.getpid()

operator = {'env':env,'pid':pid}

operator.get(sys.argv[1])()

