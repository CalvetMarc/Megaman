
class laser extends Phaser.GameObjects.Sprite {

    constructor(_scene, _posX, _posY, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);
        this.health = 100;
        this.isDead = false;
        this.scene = _scene;
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        _scene.add.existing(this);  
        this.setColliders();
        this.startPosX = _posX;
        if (!laser.sharedAudio) {
            laser.sharedAudio = this.scene.sound.add('laser');
        }
    }

    create() {
         
    }

    setColliders() {
        this.scene.physics.add.overlap(
            this,
            this.scene.player,
            this.check,
            null,
            this
        );
    }


    moveTween(destinationX, duration, delay) {
        // Stop and destroy the shared audio instance
        if (laser.sharedAudio.isPlaying) {
            laser.sharedAudio.stop();
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            x: destinationX,
            duration: duration,
            delay: delay,
            onStart: () => {
                // Play the shared audio instance
                laser.sharedAudio.play();
            },
            onComplete: () => {
                console.log("Laser reached destination");
            }
        });
    }


    update(){
        
    }

    check() {
        this.scene.player.resetPlayer();
        this.scene.resetMap();
        setTimeout(() => {
            this.scene.firstLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.secondLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.thirdLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.fourthLaserRoomGroup1.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.fourthLaserRoomGroup2.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.fifthLaserRoomGroup1.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.fifthLaserRoomGroup2.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.sixthRoomLaserGroup1.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.sixthRoomLaserGroup2.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.seventhRoomLaserGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.eighthLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.nignthLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
            this.scene.tenthLaserRoomGroup.children.each((sLaser, index) => {
            
                sLaser.reset();
            });
        }, 3000); 
    }

    reset(){
        this.x = this.startPosX;
    }
}