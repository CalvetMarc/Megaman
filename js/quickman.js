class quickman extends enemy{
    constructor(_scene, _posX, _posY, _spriteTag, player) {
        super(_scene, _posX, _posY, _spriteTag);
        this.player = player;
        this.jumpsDone = 0;    
        this.startDone = false;        
        this.lastStartRun = 0;
        this.timeRunning = 2;
        this.playerBeenHit = false;
        this.running = false;
        this.started = false;
        this.startChasing = false;
        this.lastJump = 0;
        this.shootDone = false;
        this.chargeDone = false;
    }

    create() {
        super.create();
        this.health = 560;
        this.started = true;
        this.bulletPool = this.scene.physics.add.group();    
         

        this.ov1 = this.scene.physics.add.overlap
        (
            this.scene.player.bulletPool,
            this,
            this.getDamage,
            null,
            this,
        );      
        
        this.ov2 = this.scene.physics.add.overlap
        (
            this.scene.player,
            this,
            this.playerTouched,
            null,
            this,
        );
    }

    getDamage(player, bullet){
        if(!this.chargeDone)
            return

        if(this.health <= 20){
            this.healthUI.setActive(false);
            this.healthUI.setVisible(false);
        }
        super.getDamage(player, bullet);
        this.healthUI.setFrame((this.health / 20));
        
        
    }    

    update(){
        super.update(); 
        if(this.isDead)
            return;       
                
        this.bulletPool.children.each((_bullet) => {
            _bullet.update();
        });      

        if(this.body.onFloor() && !this.startDone){
            this.startDone = true;
            this.anims.play("quickmanStart",true);
            this.body.setSize(24, 31);  
            this.healthUI = this.scene.add.sprite(null,false).setOrigin(0);            
            const {x, y} = this.scene.cameras.main.getWorldPoint(0,0);
            this.healthUI.x = x + 25;
            this.healthUI.y = y + 15;
            this.healthUI.anims.play("chargeHealth", true);
            this.scene.time.delayedCall(3500,()=>{this.startChasing = true; this.anims.play("quickmanJump",true); this.chargeDone = true;}, [], this);   
        }       

        if(this.startDone){
            const {x, y} = this.scene.cameras.main.getWorldPoint(0,0);
            this.healthUI.x = x + 25;
            this.healthUI.y = y + 15;
        }


        const distance = Math.sqrt(Math.pow(this.x - this.player.x, 2) + Math.pow(this.y - this.player.y, 2));
        var direction = 0;
        if(this.player.x >= this.x){
            direction = 1;
           
        }
        else    {
            direction = -1;
            
        }
                
        

        if(this.startChasing){

            if(!this.running){
                if(this.body.onFloor && this.scene.time.now - this.lastJump >= 500)
                    this.body.setVelocityX(0);

                if(this.jumpsDone >= 3){
                    if(!this.running && this.body.onFloor() && this.scene.time.now - this.lastJump >= 500){
                        if(direction > 0){
                            this.setFlipX(true);
                        }
                        else{
                            this.setFlipX(false);
                        }
                        this.running = true;
                        this.anims.play("quickmanRunAnim",true);
                        this.scene.time.delayedCall(3000,this.resetRun, [], this);  
                    }                    
                }
                else if(this.body.onFloor() && this.scene.time.now - this.lastJump >= 500 || this.lastJump == 0){ 

                    if(direction > 0){
                        this.setFlipX(true);
                    }
                    else{
                        this.setFlipX(false);
                    }

                    if(this.jumpsDone == 1 && !this.shootDone){
                        this.shootDone = true;
                        this.anims.play("quickmanShoot",true);
                        this.scene.time.delayedCall(100,this.CreateBullet, [], this);
                        this.scene.time.delayedCall(100,this.CreateBullet, [], this);
                        this.scene.time.delayedCall(100,this.CreateBullet, [], this);                 
                        this.scene.time.delayedCall(400,()=>{this.anims.play("quickmanJump",true); this.shootDone = false;}, [], this);  
                    }

                    this.body.setVelocityX(Math.abs(this.player.x - this.x) * direction * 1.5);
                    this.body.setVelocityY(-Phaser.Math.FloatBetween(450,580));
                    this.jumpsDone++;
                    this.lastJump = this.scene.time.now;
                }

            }
            else{
                if(this.flipX){
                    this.body.setVelocityX(250);
                }
                else{
                    this.body.setVelocityX(-250);
                }
            }
            
        }
        
    }

    resetRun(){
        if(this.isDead)
            return;
        this.jumpsDone = 0;
        this.running = false;
        this.anims.play("quickmanJump",true);
    }

    playerTouched(){
        if(this.playerBeenHit || !this.chargeDone)
            return;
        this.playerBeenHit = true
        this.scene.player.hitHero();
        this.scene.time.delayedCall(1000, this.resetHitbox, [], this);
    }    

    resetHitbox(){
        this.playerBeenHit = false;
    }

    CreateBullet() {
        var signed;
        if(this.flipX)
            signed = 1;
        else
            signed = -1;
        
        const bulletOffsetX = 10*signed;
        const bulletOffsetY = -5; 
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
            bullet = new quickmanBullet(this.scene, this.x + bulletOffsetX, this.y + bulletOffsetY, 'quickmanBulletSingle', this.player);//springBulletLoop
            this.bulletPool.add(bullet);            
        }
        
        bullet.create();
        bullet.player = this.player;
        var velX = Phaser.Math.FloatBetween(1,3) * signed *  50;        //Math.abs(this.player.x-(this.x+(bulletOffsetX*signed))
        var velY = Math.abs(this.player.y-(this.y+(bulletOffsetY))) * 1.2;
        bullet.shootMe(0, false, velX, velY);        
    }
}