#coding: utf-8
import os
import sys

def env():
		print os.environ

def pid():
		print os.getpid()

def platform():
		print sys.platform;

operator = {'env':env,'pid':pid,'platform':platform}

operator.get(sys.argv[1])()

