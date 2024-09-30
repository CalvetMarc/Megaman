
class bulletPrefab extends Phaser.GameObjects.Sprite {

    constructor(_scene, _posX, _posY, _spriteTag){        
        super(_scene, _posX, _posY, _spriteTag);
        this.tag = _spriteTag;
        this.scene = _scene;
        _scene.add.existing(this);
    }

    create(){
        
    }

    update(){
        this.checkWhenToDisable();
    }

    checkWhenToDisable(){    
    }  

    respawn(offsetX, offSetY, posX, posY){
        this.x = posX + offsetX;
        this.y = posY + offSetY;
        this.active = true;
        this.setVisible(true);
        this.scene.physics.world.enable(this); 
    }
    
    shootMe(angle, gravity, velocityX, velocityY){
        this.angle = angle;
        this.active = true;
        this.setVisible(true);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(gravity);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
    }

    disable(){
        this.active = false;
        this.setVisible(false);
        this.scene.physics.world.disable(this);        
    }
}