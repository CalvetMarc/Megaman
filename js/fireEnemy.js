class fireEnemy extends enemy{
    constructor(_scene, _posX, _posY, _spriteTag, player) {
        super(_scene, _posX, _posY, _spriteTag);
        this.playerRange = 130;        
        this.player = player;
        this.animating = false;
        this.attacksDone = 0;    
        this.firstTimeUpdate = false;
        this.availableAttack = true;
        this.maxAttacks;    
        this.smallWait;
        this.longWait;
    }

    create() {
        super.create();
        this.bulletPool = this.scene.physics.add.group();    
        this.setSmallWait(); 
        this.setLongWait();
        this.setMaxAttacks(); 
        this.scene.physics.add.overlap
        (
            this.scene.player.bulletPool,
            this,
            this.getDamage,
            null,
            this,
        );       
    }

    update(){
        super.update(); 
        if(this.isDead)
            return;       
        if(!this.firstTimeUpdate)    {
            this.anims.play('enemyFireIdleAnim', true);
            this.firstTimeUpdate = true;
        }
        this.bulletPool.children.each((_bullet) => {
            _bullet.update();
        });      

        const distance = Math.sqrt(Math.pow(this.x - this.player.x, 2) + Math.pow(this.y - this.player.y, 2));
        if(this.availableAttack && distance <= this.playerRange && this.anims.currentAnim.key !== "enemyFireAttackAnim"){
            this.availableAttack = false;
            this.attack();
        }    
    }

    setSmallWait(){
        this.smallWait = Phaser.Math.FloatBetween(300,550);
    }
    setLongWait(){
        this.longWait = Phaser.Math.FloatBetween(800,1300);
    }
    setMaxAttacks(){
        this.maxAttacks = Phaser.Math.Between(3, 6);
    }

    attack(){
        this.anims.play('enemyFireAttackAnim', true);
        this.CreateBullet();
        if(this.player.x > this.x)
            this.setFlipX(true);
        else
            this.setFlipX(false);
        this.scene.time.delayedCall(500, this.resetAttack, [], this);
    }

    resetAttack(){
        this.anims.play('enemyFireIdleAnim', true);   
        var waitTime;
        if(this.maxAttacks <= this.attacksDone){
            waitTime = this.longWait;
            this.setLongWait();
            this.setMaxAttacks();
            this.attacksDone = 0;
        }
        else
            waitTime = this.smallWait;
        this.setSmallWait();
        this.scene.time.delayedCall(waitTime, this.endCooldown, [], this);    
    }

    endCooldown(){
        this.availableAttack = true;
        this.attacksDone += 1;
    }

    CreateBullet() {
        var signed;
        if(this.flipX)
            signed = 1;
        else
            signed = -1;
        
        const bulletOffsetX = 2*signed;
        const bulletOffsetY = -2; 
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
            bullet = new fireEnemyBullet(this.scene, this.x + bulletOffsetX, this.y + bulletOffsetY, 'fireEnemyBulletSingle', this.player);//springBulletLoop
            this.bulletPool.add(bullet);            
        }
        
        bullet.create();
        bullet.player = this.player;
        var velY = -150;
        var velX = Math.abs(this.player.x-(this.x+bulletOffsetX))*2.2;
        console.log(velX);
        console.log(velY);
        bullet.shootMe(0, true, velX, velY);        
    }
}