Sweet Dreams Theater
====================

![Sweet Dreams Theater](https://pbs.twimg.com/media/CSgr5GwXIAAsRbm.jpg)

## Setup

This was built on a system using the Raspberry Pi with the following setup:

 * A connected USB that is configured to automatically mount on reboot
 * A SAMBA share running that will make that USB drive easily accessible via the local network
 * [`omxplayer`](https://github.com/popcornmix/omxplayer) installed
 * Node.js and NPM installed
 * A connected [touchatag](http://store.touchatag.com/acatalog/touchatag.html) USB RFID reader
 * SSH access to the pi for development & testing (optional)

### Setting up the USB drive

One thing to note is that we had attach the drive via a powered USB hub, as the Pi itself didn't provide enough power for our drive.

Here are some of the resources we used:

 * Mounting the drive: http://devtidbits.com/2013/03/21/using-usb-external-hard-disk-flash-drives-with-to-your-raspberry-pi/
 * Setting up so the drive mounts on boot:  http://www.techjawab.com/2013/06/how-to-setup-mount-auto-mount-usb-hard.html

### Setting up SAMBA

 * [Turn a Raspberry Pi into a NAS (Network Attached Storage) Server](http://raspipress.com/2013/05/turn-a-raspberry-pi-into-a-nas-network-attached-storage-server/)


### Install `omxplayer`

This one should be pretty easy. You should be able to just run:

```bash
sudo apt-get omxplayer
```

https://github.com/popcornmix/omxplayer
