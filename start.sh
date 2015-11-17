#!/bin/bash

sudo fbi -d /dev/fb0 -T 1 assets/startscreen.jpg
node index.js -d
