
class playerBullet extends bulletPrefab{

    constructor(_scene, _posX, _posY, _spriteTag){        
        super(_scene, _posX, _posY, _spriteTag);
        this.tag = _spriteTag;
        this.scene = _scene;
        this.spawnPosX = _posX;
    }

    respawn(offsetX, offSetY, posX, posY){
        super.respawn(offsetX, offSetY, posX, posY);
        this.spawnPosX = posX;
    }

    checkWhenToDisable(){   
        super.checkWhenToDisable();        
        if(this.x <= this.spawnPosX - config.width || this.x >= this.spawnPosX + config.width){       //config.width                
            super.disable();        
        }   
    }

    update(){
        super.update();
    }

}
