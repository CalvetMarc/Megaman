class launcherEnemy extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag, MinX, MaxX ) {
        super(_scene, _posX, _posY, _spriteTag);

        this.player = _scene.player;
        this.scene = _scene;
        _scene.add.existing(this);
        this.setColliders();
        this.damage = false;
        this.MaxX = MaxX;
        this.MinX = MinX;
        this.velocity = 10;

    }
    setColliders() {
        this.scene.physics.add.overlap(
            this,
            this.scene.player,
            this.DamagePlayer,
            null,
            this
        );
        this.scene.physics.add.collider(
            this,
            this.scene.walls
        );
    }
    create() {
        this.scene.physics.world.enable(this);
        this.body.setVelocityX(this.velocity);


    }

    DamagePlayer()
    {
        if(!this.damage)
        {
            this.damage = true;
            this.scene.player.hitHero();
            this.anims.play('launcherDamage', true);
            this.scene.time.addEvent({
                delay: 2000,
                callback: this.EndDamage,
                callbackScope: this,
                loop: false
            });
            this.scene.time.addEvent({
                delay: 3000,
                callback: this.CanDamage,
                callbackScope: this,
                loop: false
            });
        }
    }
    EndDamage()
    {
        this.anims.play('launcherIdleAnim', true);

    }
    CanDamage()
    {
        this.damage = false;

    }
    update(){
        if(this.x < this.MinX && this.velocity < 0)
        {
            this.velocity = -this.velocity;
            this.setFlipX(true);
            this.body.setVelocityX(this.velocity);

        }
        else if(this.x > this.MaxX &&this.velocity > 0)
        {
            this.velocity = -this.velocity;
            this.setFlipX(false);
            this.body.setVelocityX(this.velocity);

        }




    }






}