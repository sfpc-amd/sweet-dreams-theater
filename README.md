Sweet Dreams Theater
====================

![Sweet Dreams Theater](https://pbs.twimg.com/media/CSgr5GwXIAAsRbm.jpg)

## Usage

You should be able to operate with a set of bash scripts included in the project:

### Testing

It's a good idea to test the server first:

```bash
./test.sh
```

You will see a `nfc-poll` prompt. Try touching a tag to the sensor and see if it gets registered. Next it will open the application in the foreground, so you'll be able to see the prompts logged in the terminal. Once again, try touching a tag to the sensor to make sure it works.


### Starting

This one's pretty easy:

```bash
./start.sh
```

It will opent the app in the background and save the process id in a file called "pid" in the project folder.

### Stopping

To stop the application, run:

```bash
./stop.sh
```

This will attempt to use the "pid" file to stop the background process.


## Setup

This was built on a system using the Raspberry Pi with the following setup:

 * A connected USB that is configured to automatically mount on reboot
 * A SAMBA share running that will make that USB drive easily accessible via the local network
 * [`omxplayer`](https://github.com/popcornmix/omxplayer) installed
 * Node.js and NPM installed
 * A connected [touchatag](http://store.touchatag.com/acatalog/touchatag.html) USB RFID reader
 * SSH access to the pi for installation & testing

### Setting up the USB drive

One thing to note is that we had attach the drive via a powered USB hub, as the Pi itself didn't provide enough power for our drive.

Here are some of the resources we used:

 * Mounting the drive: http://devtidbits.com/2013/03/21/using-usb-external-hard-disk-flash-drives-with-to-your-raspberry-pi/
 * Setting up so the drive mounts on boot:  http://www.techjawab.com/2013/06/how-to-setup-mount-auto-mount-usb-hard.html

### Setting up SAMBA

 * [Turn a Raspberry Pi into a NAS (Network Attached Storage) Server](http://raspipress.com/2013/05/turn-a-raspberry-pi-into-a-nas-network-attached-storage-server/)


### Install `omxplayer`

This one should be pretty easy. You should be able to just run this logged into your pi:

```bash
sudo apt-get omxplayer
```

If that doesn't work you can try building from source: https://github.com/popcornmix/omxplayer

### Install Node.js, NPM

I banged my head against for a while, but I think the solution I came to was simply to [upgrade to Raspbian Jessie](http://raspberrypi.stackexchange.com/questions/27858/upgrade-to-raspbian-jessie) and then install NPM.
