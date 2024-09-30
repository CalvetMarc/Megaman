class RWenemy extends enemy{
    constructor(_scene, _posX, _posY, _spriteTag, player) {
        super(_scene, _posX, _posY, _spriteTag);
        this.playerRange = 200;        
        this.player = player;
        this.firstTimeUpdate = false;
        this.sniperOut = false;
        this.currentState = "idle";
        this.lastJumpTime = -3000;
        this.startJumpTime = 0;
        this.timeBetweenJumpsMilisec = 3000;
        this.playerBeenHit = false;
        this.shieldOn = true;
        this.lastShootTime = -3000;
        this.timeBetweenShoots = Phaser.Math.FloatBetween(2000,3000);
    }

    create() {
        super.create();
        this.bulletPool = this.scene.physics.add.group();            
        this.body.setSize(44, 72, 50, 25);

        this.scene.physics.add.overlap
        (
            this.scene.player.bulletPool,
            this,
            this.getDamage,
            null,
            this,
        );
        
        this.scene.physics.add.overlap
        (
            this.scene.player,
            this,
            this.crushedPlayer,
            null,
            this,
        );

        this.body.setAllowGravity(true);
    }

    update(){
        if(this.isDead){
            if(this.shootTimer != null){
                this.shootTimer.remove();
            }
            return;
        }


        if(this.sniperOut || this.currentState === "idle"){            
            if(this.player.x > this.x)
            this.setFlipX(true);
            else
                this.setFlipX(false);
        }
        const distance = Math.sqrt(Math.pow(this.x - this.player.x, 2) + Math.pow(this.y - this.player.y, 2));
        if(!this.sniperOut){
            if(this.currentState === "idle"){                
                if(distance <= this.playerRange && Math.abs(this.scene.time.now - this.lastJumpTime) >= this.timeBetweenJumpsMilisec){
                    
                    var direction = 0;
                    if(this.player.x - this.x >= 0)
                        direction = 1;
                    else    
                        direction = -1;
                    this.body.setVelocityX(Math.abs(this.player.x - this.x) * direction);
                    this.body.setVelocityY(-300);

                    this.anims.play('rwJump', true);
                    this.currentState = "jump"
                    this.startJumpTime = this.scene.time.now;
                }
            }
            else if(this.currentState === "jump"){
                if(this.body.onFloor() && Math.abs(this.scene.time.now - this.startJumpTime) >= 500){
                    this.body.setVelocityX(0);
                    this.currentState = "land";
                    this.anims.play('rwLand', true);              
                    this.scene.time.delayedCall(300, this.backToIdle, [], this);

                }
            }
            else if(this.currentState === "land"){
            }
        }
        else{
            if(this.body.onFloor()){
                this.body.setVelocityX(0);
            }
            if(this.shieldOn && this.body.onFloor() && Math.abs(this.scene.time.now - this.lastShootTime) >= this.timeBetweenShoots && distance <= this.playerRange){
                this.shieldOn = false;
                this.anims.play("rwOutShoot", true);
                this.shootTimer = this.scene.time.addEvent({
                    delay: 600,
                    callback: this.createBullet,
                    callbackScope: this,                
                    repeat: 2
                });
                this.scene.time.delayedCall(1800, this.backToIdle, [], this);
            }
        }

    }

    crushedPlayer(){
        if(!this.sniperOut && !this.playerBeenHit && this.currentState !== "idle" && !this.body.onFloor() && this.body.velocity.y > 0){
            console.log("in");
            this.playerBeenHit = true
            this.scene.player.hitHero();
        }
    }

    backToIdle(){
        if(!this.sniperOut){
            this.currentState = "idle";
            this.lastJumpTime = this.scene.time.now;
            this.playerBeenHit = false;
        }
        else{
            this.timeBetweenShoots = Phaser.Math.FloatBetween(2000,3000);
            this.lastShootTime = this.scene.time.now;
            this.shieldOn = true;
            this.anims.play("rwOutIdle", true);
        }
    }
    
    getDamage(player, bullet){
        if(!this.sniperOut){
            //TODO: Get out of robot
            bullet.disable();
            this.sniperOut = true;
            this.anims.play("rwOutIdle", true);
            this.body.setSize(24, 24, 50, 25);
        }
        else if(!this.shieldOn){            
            super.getDamage(player, bullet);
        }
        else{
            bullet.disable();
        }
    }



    createBullet() {
        var signed;
        if(this.flipX)
            signed = 1;
        else
            signed = -1;
        
        const bulletOffsetX = 17*signed;
        const bulletOffsetY = 1; 
        var bullet;
        var found = false;        
        this.bulletPool.children.each((_bullet) => {
            if (!_bullet.active && !found) {
                found = true;
                //console.log("respawn");
                bullet = _bullet;                
                bullet.respawn(bulletOffsetX, bulletOffsetY, this.x, this.y);
                                
            }
        });

        if (!bullet) {            
            bullet = new RWenemyBullet(this.scene, this.x + bulletOffsetX, this.y + bulletOffsetY, 'RWoutBullet', this.player);//springBulletLoop
            this.bulletPool.add(bullet);            
        }
        
        bullet.create();
        bullet.player = this.player;
        var velX = signed * 100;
        bullet.shootMe(0, false, velX, 0);        
    }
}