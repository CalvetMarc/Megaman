class springEnemy extends enemy{
    constructor(_scene, _posX, _posY, _spriteTag, player) {
        super(_scene, _posX, _posY, _spriteTag);
        this.playerRange = 70;
        this.shootAngle = 90; 
        this.maxAngle = 120;
        this.minAngle = 80
        this.player = player;
        this.animating = false;
        this.attacksDone = 0;        
    }

    create() {
        super.create();
        this.bulletPool = this.scene.physics.add.group();        
        this.attackTimer = this.scene.time.addEvent({
            delay: 650,
            callback: this.attack,
            callbackScope: this,
            loop: 1
        });
    }

    update(){
        super.update();        
        this.bulletPool.children.each((_bullet) => {
            _bullet.update();
        });      
    }

    attack(){
        const distance = Math.sqrt(Math.pow(this.x - this.player.x, 2) + Math.pow(this.y - this.player.y, 2));
        if(!(this.animating || distance <= this.playerRange))
            return;
        if(this.attacksDone < 3){
            if(!this.anims.isPlaying){
                this.anims.play('shoot', true);
                this.animating = true;
                this.attacksDone++; 
                this.shootTimer = this.scene.time.addEvent({
                    delay: 350,
                    callback: this.CreateBullet,
                    callbackScope: this,                
                    loop: 0
                });
            }                           
        }
        else{
            this.resetTimer = this.scene.time.addEvent({
                delay: 1100,
                callback: this.reset,
                callbackScope: this,
                loop: 0
            });
            
        }
        
    }

    reset(){
        if(this.attacksDone < 3)
            return;
        this.attacksDone = 0;
        this.animating = false;
        //console.log("reset");
    }

    CreateBullet() {
        console.log("asdasd");
        var bullet;
        var found = false;
        this.bulletPool.children.each((_bullet) => {
            if (!_bullet.active && !found) {
                found = true;
                //console.log("respawn");
                bullet = _bullet;
                const bulletOffset = -2;               
                bullet.respawn(0, bulletOffset, this.x, this.y);
                                
            }
        });

        if (!bullet) {
            const bulletOffset = -2;
            bullet = new springEnemyBullet(this.scene, this.x, this.y + bulletOffset, 'springEnemyBullet', this.player);//springBulletLoop
            this.bulletPool.add(bullet);            
        }

        bullet.create();
        bullet.player = this.player;
        bullet.shootMe(0, true, Math.abs(this.player.x - this.x), -300);

        
    }
}