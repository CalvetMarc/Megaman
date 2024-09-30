

class fireEnemyBullet extends bulletPrefab{

    constructor(_scene, _posX, _posY, _spriteTag, player){        
        super(_scene, _posX, _posY, _spriteTag);
        this.tag = _spriteTag;
        this.scene = _scene;
        this.spawnPosX = _posX;        
        this.player;        
    }    

    create(){
        super.create();
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
        this.anims.play('fireEnemyBulletLoop', true);       
    }

    shootMe(angle, gravity, velocityX, velocityY){
        var direction = 0;
        if(this.player.x - this.x >= 0)
            direction = 1;
        else    
            direction = -1;
        velocityX *= direction;
        if(Phaser.Math.Between(0,100) < 25){
            velocityX *= Phaser.Math.FloatBetween(1.2,1.5);
        }
        super.shootMe(angle, gravity, velocityX, velocityY);
    }

    respawn(offsetX, offSetY, posX, posY){
        super.respawn(offsetX, offSetY, posX, posY);
        this.spawnPosX = posX;        
    }

    checkWhenToDisable(){   
        super.checkWhenToDisable();        
        if(this.disableChecked){
            super.disable();
        } 
    }  
    
    update(){
        super.update();
        const elapsed = this.scene.time.now - this.startTime;
        
        if(elapsed >= 2000){
            this.disableChecked = true;
        }
    }
    
    getGem()
    {
        if(this.disableChecked == false){

            this.scene.player.hitHero();
        }
        
        this.disableChecked = true; 
    }
    
}