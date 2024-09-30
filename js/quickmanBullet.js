

class quickmanBullet extends bulletPrefab{

    constructor(_scene, _posX, _posY, _spriteTag, player){        
        super(_scene, _posX, _posY, _spriteTag);
        this.tag = _spriteTag;
        this.scene = _scene;
        this.spawnPosX = _posX;        
        this.player;        
        this.reversed = false;
    }    

    create(){
        super.create();
        this.anims.play("quickmanBulletAnim", true)
        this.startTime = this.scene.time.now;
        this.disableChecked = false;
        this.scene.physics.add.overlap
        (
            this.scene.player,
            this,
            this.getGem,
            null,
            this,
        );
        this.body.collideWorldBounds = false;              
    }    

    respawn(offsetX, offSetY, posX, posY){
        super.respawn(offsetX, offSetY, posX, posY);
        this.spawnPosX = posX;  
        this.reversed = false;      
    }
    
    
    update(){
        super.update();

        if(!this.active || !this.visible)
            return;


        const elapsed = this.scene.time.now - this.startTime;
        
        var signed;
        if(this.x > this.player.x)
            signed = -1;
        else
            signed = 1;

       
        if(elapsed >= 1100 && !this.reversed){
            this.reversed = true;
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.scene.time.delayedCall(500, ()=>{ 
                var velX = Phaser.Math.FloatBetween(1,3) * signed *  50;
                var signed2 = 0;
                if(this.y > this.player.y)       
                    signed2 = -1;
                else
                    signed2 = 1;

                var velY = signed2 * Math.abs(this.player.y-(this.y)) * 1.2;
                this.shootMe(0, false, velX, velY);     
            }, [], this);         
        }

        if(elapsed >= 5000){
            this.disable();
        }
    }
    
    getGem()
    {      
        this.scene.player.hitHero();
        this.disable();
    }
    
}