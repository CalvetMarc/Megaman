

class RWenemyBullet extends bulletPrefab{

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
    }    

    respawn(offsetX, offSetY, posX, posY){
        super.respawn(offsetX, offSetY, posX, posY);
        this.spawnPosX = posX;        
    }
    
    
    update(){
        super.update();
        const elapsed = this.scene.time.now - this.startTime;
        
        if(elapsed >= 2000){
            this.disable();
        }
    }
    
    getGem()
    {      
        this.scene.player.hitHero();
        this.disable();
    }
    
}