class enemy extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);
        this.health = 100;
        this.isDead = false;
        this.scene = _scene;
        this.setColliders();
        _scene.add.existing(this);        
    }

    create() {
        this.scene.physics.world.enable(this);        
        this.body.collideWorldBounds = false;        
    }

    setColliders() {
        this.myWorldColldier = this.scene.physics.add.collider(
            this,
            this.scene.walls
        );
    }

    update(){
        
    }

    getDamage(player, bullet){
        bullet.disable();
        this.health -= 20;
        this.scene.sound.play('enemyHit');
        if(this.health <= 0){
            this.health = 0;
            this.isDead = true;
            this.anims.stop();
            this.anims.play("deathAnim");
            this.scene.physics.world.disable(this);  
            this.scene.time.delayedCall(270, this.dead, [], this);            
        }
    }

    dead(){           
        this.active = false;
        this.setVisible(false);
    }

}