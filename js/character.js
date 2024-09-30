var shoot = false;
var shootTimer;

class character extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);
        this.lives = 1;
        this.scene = _scene;
        this.bulletsThatHitMe = [];
        this.setColliders();
        _scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.setGravityY(0);
        this.lastDirectionRight = false;
        this.jumpStartTime = 0;
        this.isJumping = false;
        this.health = 29;
        this.InTransition = false;
        this.bulletPool;
        this.isFlashing = false;
        this.isHurt = false;
        this.isOnAir = false;   
        this.canShoot = false;
        this.respawnX = _posX;
        this.respawnX = _posY;
    }

    create() {

        this.scene.physics.world.enable(this);

        this.body.collideWorldBounds = false;
        this.grounded = true;

        this.cursores = this.scene.input.keyboard.createCursorKeys();
        this.cursores.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.cursores.space.on('down', function () {
            this.Shoot();
        }, this);
        this.cursores.up.on('down', function () {
            this.JumpStart();
        }, this);
        this.cursores.up.on('up', function () {
            this.JumpEnd();
        }, this);
        this.bulletPool = this.scene.physics.add.group();
    }

    get position() {
        return { x: this.x, y: this.y };
    }

    hitHero() {
        if (this.isFlashing) {
            return;
        }
        //this.canShoot = false;
        this.scene.sound.play('hit');
        this.isHurt = true;
        const offsetX = -18; 
        const offsetY = -20; 

        this.scene.hitEffect.setPosition(this.x + offsetX, this.y + offsetY);
        this.scene.hitEffect.setVisible(true);
        this.scene.player.anims.play('playerHurt', true);
        this.scene.hitEffect.anims.play('HitEffect', true);
        setTimeout(() => {
            this.scene.hitEffect.setVisible(false);
        }, 200);
        setTimeout(() => {
            this.scene.player.isFlashing = false;
        }, 500);
        
        this.health--;
        this.scene.updateHealth();

        const flashDuration = 70;
        const numFlashes = 10;
        let currentFlash = 0;

        this.isFlashing = true;

        const flashInterval = setInterval(() => {
            if (currentFlash % 2 === 0) {
                this.setAlpha(0);
            } else {
                this.setAlpha(1);
            }

            currentFlash++;

            if (currentFlash >= numFlashes * 2) {
                clearInterval(flashInterval);
                this.setAlpha(1);
                this.isHurt = false;
            }
        }, flashDuration);
    }

    setColliders() {
        this.scene.physics.add.collider(
            this,
            this.scene.walls
        );
    }

    disableInputsForDuration(duration) {
        this.isFlashing = true;
        this.setVisible(false);
        this.canShoot = false;
        setTimeout(() => {
            this.isFlashing = false;
            this.setVisible(true);
            this.canShoot = true;
        }, duration);
    }

    velocityChange(scene, targetObject) {
        const duration = 1000;
        const targetVelocityX = 0;
        const targetVelocityY = 0;
        const targetGravityY = 0;

        // Set initial values
        this.body.setGravityY(0);
        this.body.setVelocity(0, 0);

        // Tween to the target values
        scene.tweens.add({
            targets: this.body.velocity,
            x: targetVelocityX,
            y: targetVelocityY,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                this.body.setGravityY(targetGravityY);
            },
        });
    }

    update() {
        //console.log(this.canShoot);
        if (!this.InTransition) {
            this.grounded = this.body.onFloor();
            if (!this.isFlashing) {
                this.Input();
            } else {
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
            var childrens = 0;
            this.bulletPool.children.each((_bullet) => {
                _bullet.update();
                childrens++;
            });
        }

        if (this.isJumping && !this.InTransition) {
            const elapsed = this.scene.time.now - this.jumpStartTime;
            const jumpHeightMultiplier = 1.25;
            const initialJumpVelocity = gamePrefs.QUICKMAN_JUMP_SPEED * jumpHeightMultiplier;

            const fallVelocity = 20 * initialJumpVelocity;
            const timeThresholdForPeak = 35;
            const maxJumpHeight = 50;

            const upwardVelocity = -initialJumpVelocity;

            this.body.setVelocityY(upwardVelocity);

            if (this.body.onCeiling()) {
                this.body.setVelocityY(0);
                this.isJumping = false;
            }

            if (Math.abs(this.position.y - this.jumpStartTime) > timeThresholdForPeak) {
                this.body.setVelocityY(-50);
                this.isJumping = false;
            }
        }

        if (!this.grounded && !this.InTransition && !this.isHurt && this.canShoot) {
            if (shoot) {
                this.anims.play('jumpShoot', true);
            } else {
                this.anims.play('jump', true);
            }
        }

        if(this.isOnAir == false && this.grounded == true){
            this.scene.sound.play('land');
        }
        this.isOnAir = this.grounded;
    }

    Input() {
        this.enter = false;

        if (this.cursores.right.isDown) {
            this.WalkRight();
            this.lastDirectionRight = true;
            this.enter = true;
        }
        if (this.cursores.left.isDown) {
            this.WalkLeft();
            this.lastDirectionRight = false;
            this.enter = true;
        }
        if (!this.enter) {
            this.Idle();
        }
    }

    Idle() {
        if (this.grounded && this.canShoot) {
            if (shoot) {
                this.anims.play('idleShoot', true);
            } else {
                this.anims.play('idle', true);
            }

            const deceleration = 7;

            if (Math.abs(this.body.velocity.x) > deceleration) {
                this.body.setVelocityX(this.body.velocity.x - Math.sign(this.body.velocity.x) * deceleration);
            } else {
                this.body.setAccelerationX(0);
                this.body.setVelocityX(0);
            }
        }
    }

    WalkLeft() {
        this.body.setVelocityX(-gamePrefs.QUICKMAN_MOVE_SPEED);
        if (this.grounded) {
            if (shoot) {
                this.anims.play('walkShoot', true);
            } else {
                this.anims.play('walk', true);
            }
        }
        this.setFlipX(false);
    }

    WalkRight() {
        this.body.setVelocityX(gamePrefs.QUICKMAN_MOVE_SPEED);
        if (this.grounded) {
            if (shoot) {
                this.anims.play('walkShoot', true);
            } else {
                this.anims.play('walk', true);
            }
        }
        this.setFlipX(true); 
    }

    JumpStart() {
        if (!this.grounded || this.isHurt) {
            return;
        }

        this.jumpStartTime = this.position.y;
        this.isJumping = true;
    }

    JumpEnd() {
        if (this.isJumping) {
            this.body.setVelocityY(-50);
            this.isJumping = false;
        }
    }

    Shoot() {
        if(this.canShoot){
            if (shoot) {
                shootTimer.remove();
            }
    
            shoot = true;
            this.CreateBullet();
            this.scene.sound.play('shootSound');
    
            shootTimer = this.scene.time.addEvent({
                delay: 200,
                callback: this.EndShoot,
                callbackScope: this,
                loop: false
            });
        }
       
    }

    EndShoot() {
        shoot = false;
    }

    CreateBullet() {
        var bullet;
        var found = false;
        this.bulletPool.children.each((_bullet) => {
            if (!_bullet.active && !found) {
                //console.log("respawn");
                found = true;
                bullet = _bullet;
                const bulletOffset = gamePrefs.QUICKMAN_BULLET_OFFSET * (this.lastDirectionRight ? 1 : -1);
                bullet.respawn(bulletOffset, 0, this.x, this.y);
            }
        });

        if (!bullet) {
            const bulletOffset = gamePrefs.QUICKMAN_BULLET_OFFSET * (this.lastDirectionRight ? 1 : -1);
            bullet = new playerBullet(this.scene, this.x + bulletOffset, this.y, 'bullet');
            this.bulletPool.add(bullet);
        }
        bullet.setScale(0.75, 0.75);
        const bulletVelocityX = this.lastDirectionRight ? gamePrefs.BULLET_SPEED : -gamePrefs.BULLET_SPEED;
        var angle = -90 * (this.lastDirectionRight ? 1 : -1);
        bullet.shootMe(angle, false, bulletVelocityX, 0);
    }

    resetPlayer(x,y) {
        this.scene.player.setVisible(false);
        this.scene.player.body.enable = false;

        const backgroundMusic = this.scene.sound.get('bgMusic');
        if (backgroundMusic && backgroundMusic.isPlaying) {
            backgroundMusic.stop();
        }
        this.scene.healthUI.setFrame(29);
        setTimeout(() => {
            this.scene.player.body.reset(this.respawnX, this.respawnY);
            this.health = 29;
            this.scene.updateHealth();
            this.scene.player.setVisible(true);
            this.scene.player.body.enable = true;
            backgroundMusic.play();
        }, 3000);
    }
}
