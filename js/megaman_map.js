class megaman_map extends Phaser.Scene
{
    
    constructor()
    {
        super({key:'megaman_map'});
        this.transitioned1 = false;
        this.transitioned2 = false;
        this.transitioned3 = false;
        this.transitioned4 = false;
        this.transitioned5 = false;
        this.transitioned6 = false;
        this.transitioned7 = false;
        this.transitioned8 = false;
        this.transitioned9 = false;
        this.transitioned10 = false;
        this.transitioned11 = false;
        this.transitioned12 = false;
        this.transitioned13 = false;
        this.transitioned14 = false;
        this.transitioned15 = false;
        this.transitioned16 = false;
        this.transitioned17 = false;
        this.inBossRooom = false;
        this.doOnce1 = false;
        this.doOnce2 = false;
    }


    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112"); 


        this.load.setPath('assets/maps');
        this.load.image('megaman_tileset','megaman_tileset.png');
        this.load.tilemapTiledJSON('megaman_map','megaman_map.json');

        this.load.setPath('assets/img');
        this.load.image('bullet','spr_bullet_0.png');                    
        this.load.spritesheet('playerIdle', 'idleAnim.png', {frameWidth: 21, frameHeight: 24});
        this.load.spritesheet('playerHurt', 'playerHurt.png', {frameWidth: 26, frameHeight: 28});
        this.load.spritesheet('playerIdleShoot', 'idleShoot.png', {frameWidth: 31, frameHeight: 24});
        this.load.spritesheet('playerWalk', 'walkAnim.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerWalkShoot', 'walkShootAnim.png', {frameWidth: 30, frameHeight: 24});
        this.load.spritesheet('playerJump', 'jump.png', {frameWidth: 26, frameHeight: 30});
        this.load.spritesheet('playerJumpShoot', 'jumpShoot.png', {frameWidth: 29, frameHeight: 24});   
        this.load.spritesheet('springEnemy', 'springEnemyBase.png', {frameWidth: 16, frameHeight: 8 });      
        this.load.spritesheet('springEnemyCharge', 'SpringEnemy.png', {frameWidth: 16, frameHeight: 24 });//singleFire
        this.load.spritesheet('enemyFireSingle', 'singleFire.png', {frameWidth: 44, frameHeight: 36 });
        this.load.spritesheet('enemyFireIdle', 'enemyFire2idle.png', {frameWidth: 44, frameHeight: 36 });
        this.load.spritesheet('enemyFireAttack', 'enemyFire2attack2.png', {frameWidth: 44, frameHeight: 36 });
        this.load.spritesheet('springEnemyBullet', 'springEnemyProjectile.png', {frameWidth: 11, frameHeight: 16 });
        this.load.spritesheet('fireEnemyBullet', 'enemyFireBullet.png', {frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('fireEnemyBulletSingle', 'fireBulletSingle.png', {frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('healthUI','barraVida.png', {frameWidth:9,frameHeight:58});
        this.load.spritesheet('healthUIboss','quickmanVidaCharge.png', {frameWidth:9,frameHeight:58});
        this.load.spritesheet('deathAnim','deathAnim.png', {frameWidth:24,frameHeight:24});
        this.load.spritesheet('launcherDamageHit', 'launcherEnemyAttack.png', {frameWidth: 24, frameHeight: 32});
        this.load.spritesheet('launcherIdle', 'launcherEnemyFirst.png', {frameWidth: 24, frameHeight: 32});
        this.load.spritesheet('RWJump', 'RWjumpAnim.png', {frameWidth: 46, frameHeight: 64});
        this.load.spritesheet('RWLand', 'RWlandAnim.png', {frameWidth: 46, frameHeight: 64});
        this.load.spritesheet('RWidle', 'idleRW.png', {frameWidth: 46, frameHeight: 64});
        this.load.spritesheet('RWoutIdle', 'idleRWout.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('RWoutShoot', 'shootingRWout.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('RWoutBullet', 'bulletRWout.png', {frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('quickmanJump', 'QuickManDropPose.png', {frameWidth: 26, frameHeight: 38});
        this.load.spritesheet('quickmanShoot', 'QuickManDropPoseShoot.png', {frameWidth: 28, frameHeight: 38});
        this.load.spritesheet('quickmanRun', 'quickmanRun.png', {frameWidth: 24, frameHeight: 31});
        this.load.spritesheet('quickmanStart', 'quickmanStart.png', {frameWidth: 29, frameHeight: 31});
        this.load.spritesheet('quickmanBullet', 'quickmanBoomerang.png', {frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('quickmanBulletSingle', 'quickmanBoomerangSingle.png', {frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('HitEffects', 'HitEffects.png', {frameWidth: 32, frameHeight: 14});
        this.load.spritesheet('door', 'PortaPujar.png', {frameWidth: 16, frameHeight: 64});//bulletRWout
        this.load.image('laserBeam','laser.png');

        this.load.setPath('assets/sounds');
        this.load.audio('shootSound', 'playerShoot.mp3');
        this.load.audio('bgMusic', 'bgMusic.mp3');
        this.load.audio('hit', 'hit.wav');
        this.load.audio('laser', 'force_beam.wav');
        this.load.audio('land', 'land.wav');
        this.load.audio('door', 'boss_door.wav');
        this.load.audio('enemyHit', 'enemy_hit.wav');
        this.load.audio('death','death.wav');
        this.load.audio('bossMusic','bossBattle.mp3');
    }

    
    

    create()
    {         
        this.followTargets = [
            new Phaser.Math.Vector2(100, 100), //0
            new Phaser.Math.Vector2(100, 375), //1
            new Phaser.Math.Vector2(100, 638), //2
            new Phaser.Math.Vector2(100, 897), //3 
            new Phaser.Math.Vector2(100, 1140), //4
            new Phaser.Math.Vector2(100, 1400), //5
            new Phaser.Math.Vector2(100, 1656), //6
            new Phaser.Math.Vector2(100, 1915), //7
            new Phaser.Math.Vector2(1151, 1915), //8
            new Phaser.Math.Vector2(1151, 2185), //9
            new Phaser.Math.Vector2(1151, 2435), //10
            new Phaser.Math.Vector2(1151, 2675), //11
            new Phaser.Math.Vector2(1151, 2940), //12
            new Phaser.Math.Vector2(1151, 3200), //13
            new Phaser.Math.Vector2(1151, 3470), //14
            new Phaser.Math.Vector2(1151, 3700), //15
            new Phaser.Math.Vector2(1151, 3965), //16
            new Phaser.Math.Vector2(1225, 3965), //17
        ];
        const backgroundMusic = this.sound.add('bgMusic', { loop: true });
        backgroundMusic.play();
        this.map = this.add.tilemap('megaman_map');
        this.map.addTilesetImage('megaman_tileset');
   
        this.walls = this.map.createLayer('outerwalls','megaman_tileset');
        this.map.createLayer('backdrop','megaman_tileset');

        this.player = new character(this, 120, 120, 'playerIdle');            
        this.player.create();
        this.player.disableInputsForDuration(5000); 
        this.player.body.setMaxVelocity(200, 400);

        this.bossAppeared = false;
        this.triggerZone = this.add.zone(2176, 4015, 250, 70); 
        this.physics.world.enable(this.triggerZone);
        this.triggerZone.body.allowGravity = false;
        this.playerAppearTrigger = this.physics.add.overlap(this.player, this.triggerZone, this.bossAppear, null, this); /////////////////////////////////NOVAAAAAAAAAAAAAAAAAAAAAAA


        //this.sound.play('door');
        //BOSS DOORS
        //First door Open
        this.firstDoor = this.add.sprite(1780,3904  ,'door').setOrigin(0,0);
        this.physics.world.enable(this.firstDoor);
        this.firstDoor.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.firstDoor, () => {
            this.firstDoor.anims.play('doorOpen', true);
            this.player.canShoot = false;
            if(!this.doOnce1){
                this.doOnce1 = true;
                this.sound.play('door');
            }
            // this.firstDoor.destroy(true);
            this.player.isFlashing = true;
        }, null, this)
        
        this.firstDoor.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'doorOpen') {
                console.log('Door animation complete');
                this.firstDoor.destroy(true);
                this.player.canShoot = true;
                this.player.isFlashing = false;
            }
        }, this);
        
        //First door close
        this.firstDoorDown = this.add.sprite(1780,3904  ,'door').setOrigin(0,0);
        this.physics.world.enable(this.firstDoorDown);
        this.firstDoorDown.setVisible(false);
        this.firstDoorDown.body.allowGravity = false;
        this.triggerDoorClose = this.add.zone(1860,3940,50,50);
        this.physics.world.enable(this.triggerDoorClose);
        this.triggerDoorClose.body.allowGravity = false;

        

        this.physics.add.overlap(this.player, this.triggerDoorClose, () => {
            this.firstDoorDown.anims.play('doorClose',true);
            //this.firstDoor.destroy(true);
            this.sound.play('door');
            this.firstDoorDown.setVisible(true);
            this.player.canShoot = false;
            
            this.player.isFlashing = true;
            this.triggerDoorClose.destroy(true);
        }); 
        this.firstDoorDown.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'doorClose') {
                console.log('Door animation complete');
                //this.firstDoor.destroy(true);
                
                this.firstDoorDown.body.immovable = true;
                this.physics.add.collider(
                    this.player,
                    this.firstDoorDown
                );
                this.player.canShoot = true;
                this.player.isFlashing = false;
            }
        }, this);
        

        //Second door open
        this.secondDoor = this.add.sprite(2005,3904,'door').setOrigin(0,0);
        this.physics.world.enable(this.secondDoor);
        this.secondDoor.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.secondDoor, () => {
            this.secondDoor.anims.play('doorOpen',true);
            //this.firstDoor.destroy(true);
            this.player.canShoot = false;
            if(!this.doOnce2){
                this.doOnce2 = true;
                this.sound.play('door');
            }
            this.player.isFlashing = true;
        }); 
        
        this.secondDoor.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'doorOpen') {
                console.log('Door animation complete');
                this.secondDoor.destroy(true);
                this.player.canShoot = true;
                this.player.isFlashing = false;
            }
        }, this);


        //Second door closed
        this.secondDoorDown = this.add.sprite(2005,3904  ,'door').setOrigin(0,0);
        this.physics.world.enable(this.secondDoorDown);
        this.secondDoorDown.setVisible(false);
        this.secondDoorDown.body.allowGravity = false;
        this.triggerDoorClose2 = this.add.zone(2070,3940,50,50);
        this.physics.world.enable(this.triggerDoorClose2);
        this.triggerDoorClose2.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.triggerDoorClose2, () => {
            this.secondDoorDown.anims.play('doorClose',true);
            //this.firstDoor.destroy(true);
            this.secondDoorDown.setVisible(true);
            this.player.isFlashing = true;
            this.sound.play('door');
            this.player.canShoot = false;
            this.triggerDoorClose2.destroy(true);
        }); 
        this.secondDoorDown.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'doorClose') {
                console.log('Door animation complete');
                this.secondDoorDown.body.immovable = true;
                this.physics.add.collider(
                    this.player,
                    this.secondDoorDown
                );
                this.player.canShoot = true;
                //this.firstDoor.destroy(true);
                this.player.isFlashing = false;
            }
        }, this);



        //LASERS

        //First Room Lasers
        this.firstLaserRoomGroup = this.physics.add.group({allowGravity:false});
        this.firstLaserRoomGroup.add(new laser(this, -210, 840, 'laserBeam'));
        this.firstLaserRoomGroup.add(new laser(this, 510, 888, 'laserBeam'));
        
        this.firstLaserRoomGroup.children.each((sLaser, index) => {
            
            sLaser.reset();
        });
        //Second Room Lasers
        this.secondLaserRoomGroup = this.physics.add.group({allowGravity:false});
        this.secondLaserRoomGroup.add(new laser(this, -210, 1111, 'laserBeam'));
        this.secondLaserRoomGroup.add(new laser(this, 510, 1160, 'laserBeam'));
        this.secondLaserRoomGroup.add(new laser(this, 510, 1223, 'laserBeam'));

        
        //Third room lasers
        this.thirdLaserRoomGroup = this.physics.add.group({allowGravity:false});
        this.thirdLaserRoomGroup.add(new laser(this, 510, 1353, 'laserBeam'));

        //Fourth Room lasers
        this.fourthLaserRoomGroup1 = this.physics.add.group({allowGravity:false});
        this.fourthLaserRoomGroup2 = this.physics.add.group({allowGravity:false});
        //First Couple
        this.fourthLaserRoomGroup1.add(new laser(this, 750, 2060, 'laserBeam')); //910 goal 750 start
        this.fourthLaserRoomGroup2.add(new laser(this, 1550, 2060, 'laserBeam')); //1390 goal 1550 start
        //Second Couple
        this.fourthLaserRoomGroup1.add(new laser(this, 750, 2090, 'laserBeam')); //900 goal 750 start
        this.fourthLaserRoomGroup2.add(new laser(this, 1550, 2090, 'laserBeam')); //1550 start 1400 goal
        //Third Couple
        this.fourthLaserRoomGroup1.add(new laser(this, 750, 2135, 'laserBeam')); //900 goal 750 start
        this.fourthLaserRoomGroup2.add(new laser(this, 1550, 2135, 'laserBeam')); //1550 start 1400 goal
        //Fourth Couple
        this.fourthLaserRoomGroup1.add(new laser(this, 750, 2170, 'laserBeam')); //900 goal 750 start
        this.fourthLaserRoomGroup2.add(new laser(this, 1550, 2170, 'laserBeam')); //1550 start 1400 goal

        this.fourthLaserRoomGroup1.add(new laser(this, 750, 2220, 'laserBeam')); //900 goal 750 start
        this.fourthLaserRoomGroup2.add(new laser(this, 1550, 2220, 'laserBeam')); //1550 start 1400 goal

         //Firth room lasers
         this.fifthLaserRoomGroup1 = this.physics.add.group({allowGravity:false});
         this.fifthLaserRoomGroup2 = this.physics.add.group({allowGravity:false});
         this.fifthLaserRoomGroup1.add(new laser(this, 750, 2358, 'laserBeam'));
         this.fifthLaserRoomGroup2.add(new laser(this, 1550, 2358, 'laserBeam'));

         this.fifthLaserRoomGroup1.add(new laser(this, 750, 2400, 'laserBeam'));
         this.fifthLaserRoomGroup2.add(new laser(this, 1550, 2400, 'laserBeam'));

         this.fifthLaserRoomGroup1.add(new laser(this, 750, 2425, 'laserBeam'));
         this.fifthLaserRoomGroup2.add(new laser(this, 1550, 2425, 'laserBeam'));
        
        //Sixth Room Lasers
         this.sixthRoomLaserGroup1 = this.physics.add.group({allowGravity:false});
         this.sixthRoomLaserGroup2 = this.physics.add.group({allowGravity:false});
         this.sixthRoomLaserGroup1.add(new laser(this, 750, 2578, 'laserBeam'));
         this.sixthRoomLaserGroup2.add(new laser(this, 1550, 2578, 'laserBeam'));
         this.sixthRoomLaserGroup1.add(new laser(this, 750, 2598, 'laserBeam'));
         this.sixthRoomLaserGroup2.add(new laser(this, 1550, 2598, 'laserBeam'));
         this.sixthRoomLaserGroup1.add(new laser(this, 1550, 2730, 'laserBeam')); //1265 goal 1550 start
     
        //Seventh
         this.seventhRoomLaserGroup = this.physics.add.group({allowGravity:false});
         this.seventhRoomLaserGroup.add(new laser(this, 1550, 2850, 'laserBeam'));
         this.seventhRoomLaserGroup.add(new laser(this, 1550, 2870, 'laserBeam'));
         this.seventhRoomLaserGroup.add(new laser(this, 750, 2920, 'laserBeam')); //1040 goal 750 start
         this.seventhRoomLaserGroup.add(new laser(this, 750, 2955, 'laserBeam')); //1040 goal 750 start
         this.seventhRoomLaserGroup.add(new laser(this, 1550, 2985, 'laserBeam'));

        //Eigth
         this.eighthLaserRoomGroup = this.physics.add.group({allowGravity:false});
         this.eighthLaserRoomGroup.add(new laser(this, 1550, 3175, 'laserBeam'));
         this.eighthLaserRoomGroup.add(new laser(this, 1550, 3255, 'laserBeam')); //1265 goal


         //Ninth
         this.nignthLaserRoomGroup = this.physics.add.group({allowGravity:false});
         this.nignthLaserRoomGroup.add(new laser(this, 1550, 3380, 'laserBeam'));
         this.nignthLaserRoomGroup.add(new laser(this, 1550, 3400, 'laserBeam'));
         this.nignthLaserRoomGroup.add(new laser(this, 1675, 3435, 'laserBeam')); //1395 goal
         this.nignthLaserRoomGroup.add(new laser(this, 1550, 3455, 'laserBeam'));

        //Tenth
         this.tenthLaserRoomGroup = this.physics.add.group({allowGravity:false});
         this.tenthLaserRoomGroup.add(new laser(this, 1550, 3610, 'laserBeam'));
         this.tenthLaserRoomGroup.add(new laser(this, 1550, 3630, 'laserBeam'));
         this.tenthLaserRoomGroup.add(new laser(this, 750, 3690, 'laserBeam'));
         this.tenthLaserRoomGroup.add(new laser(this, 1550, 3755, 'laserBeam'));

         this.checkPoint1 = this.add.zone(90, 1960, 100, 70); 
         this.physics.world.enable(this.checkPoint1);
         this.checkPoint1.body.allowGravity = false;
         this.physics.add.overlap(this.player, this.checkPoint1,() => this.setRespawnPoint(90,1839), null, this);

         this.checkPoint1 = this.add.zone(1132, 3990, 100, 70); 
         this.physics.world.enable(this.checkPoint1);
         this.checkPoint1.body.allowGravity = false;
         this.physics.add.overlap(this.player, this.checkPoint1,() => this.setRespawnPoint(90,1839), null, this);


        this.transitionObject = this.add.container(100, 100);
        
        this.map.setCollisionByExclusion (-1,true,true,'outerwalls');

        this.springEnemies = this.physics.add.group();
        this.springEnemies.add(new springEnemy(this, config.width / 2 + 16, config.height + config.height / 2,'springEnemyCharge', this.player));        
        this.springEnemies.add(new springEnemy(this, config.width / 2 - 46, config.height + config.height / 2,'springEnemyCharge', this.player));

        this.RWenemies = this.physics.add.group();
        this.RWenemies.add(new RWenemy(this, 1300,3965, 'RWidle', this.player));        //1304,4033 1259,4020
        this.RWenemies.add(new RWenemy(this, 1410,3965, 'RWidle', this.player));

        this.fireEnemies = this.physics.add.group();           
        this.fireEnemies.add(new fireEnemy(this, 353, 1915,'enemyFireSingle', this.player));        
        this.fireEnemies.add(new fireEnemy(this, 532, 1940,'enemyFireSingle', this.player));
        this.fireEnemies.add(new fireEnemy(this, 786, 1940,'enemyFireSingle', this.player));
        
        this.launcherEnemies = this.physics.add.group();    
        this.launcherEnemies.add( new launcherEnemy(this, 100, 948,'launcherIdle',100,115));
        this.launcherEnemies.add( new launcherEnemy(this, 100, 1450,'launcherIdle',75,150));


        this.launcherEnemies.children.each((sEnemy) => {
            sEnemy.create();
        });

       this.springEnemies.children.each((sEnemy) => {
            sEnemy.create();
        });

        this.RWenemies.children.each((rwEnemy) => {
            rwEnemy.create();
        });

        this.fireEnemies.children.each((fEnemy) => {
            fEnemy.create();
        });       


        this.currentFollowTargetIndex = 0;
        this.cameras.main.startFollow(this.transitionObject, false, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setViewport(0, 0, this.game.config.width*4, this.game.config.height*4);

        this.hitEffect = this.add.sprite(100,100,'HitEffects').setOrigin(0);
        this.hitEffect.setVisible(false);
        //this.quickManBoss.anims.play('QuickManDrop', true);
        const zoomFactor = 4; //4
        this.healthUI = this.add.sprite(2,2,'healthUI',this.player.health)
        .setOrigin(0);
        
        this.scale.scaleMode = Phaser.Scale.ScaleModes.NEAREST;
        this.cameras.main.setZoom(zoomFactor);
        
        this.textures.each(function (texture) {
            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        });

        this.LoadAnimations(); 
        //this.hitEffect.anims.play('HitEffect',true);
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding: {
                x: 10,
                y: 5
            }
        };
    
        const sampleText = this.add.text(95, 70, 'READY', textStyle);
        this.tweens.add({
            targets: sampleText,
            alpha: {
                value: 0,
                duration: 500,
                ease: 'Linear',
                yoyo: true,
                repeat: 4,
            },
            onComplete: () => {
                sampleText.setAlpha(0);

            }
        });

        
    }
    setRespawnPoint(x,y){
        this.player.respawnX = x;
        this.player.respawnY = y;
        console.log(this.player.respawnX, ' + ', this.player.respawnY);
    }
    
    updateHealth()
    {
        if(this.player.health > 1){
            this.healthUI.setFrame(29-this.player.health);
        }
        else{
            this.sound.play('death');
            this.player.resetPlayer();
        }
    }

    bossAppear(){
        if(this.bossAppeared){
            return;
        }

        this.bossAppeared = true;
       const backgroundMusic2 = this.sound.get('bgMusic');
    if (backgroundMusic2 && backgroundMusic2.isPlaying) {
        backgroundMusic2.stop();
    }

    const bossMusic = this.sound.add('bossMusic', { loop: true });
    bossMusic.play();
        this.quickman = new quickman(this, 2239, 3850, "quickmanJump", this.player);
    }

    update() {
        this.player.update();

        const characterPosition = this.player.position;
       
        //console.log(this.player.x, ' + ', this.player.y);
    
        const targetPosition = this.followTargets[this.currentFollowTargetIndex];


        this.launcherEnemies.children.each((lEnemy) => {
            lEnemy.update();
        });
        this.springEnemies.children.each((sEnemy) => {
            sEnemy.update();
        });

        this.RWenemies.children.each((rwEnemy) => {
            rwEnemy.update();
        });

        this.fireEnemies.children.each((fEnemy) => {
            fEnemy.update();
        }); 
        //this.LauncherEnemy.update();

        if(this.bossAppeared){
            if(!this.quickman.started){
                this.quickman.create();
            }
            this.quickman.update();
        }

        const { x, y } = this.cameras.main.getWorldPoint(0, 0);


        this.healthUI.x = x + 10;
        this.healthUI.y = y + 15;


        if (characterPosition.x > 2178) {
            if(!this.transitioned16){
                this.transitioned16 = true;
                this.inBossRooom = true;
            }
        }
        else if (characterPosition.x > 1152 && characterPosition.y > 3905 && !this.inBossRooom) {
            this.cameras.main.stopFollow();
            this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
        } else if (characterPosition.y > 3800) {
            if(!this.transitioned15){
                this.transitioned15 = true;
                this.transitionToNextTarget(16);
                this.player.velocityChange(this, this.player);
            }
        } else if (characterPosition.y > 3535) {
            if(!this.transitioned14){
                this.transitioned14 = true;
                this.transitionToNextTarget(15);
                this.player.velocityChange(this, this.player);
                setTimeout(() => {
                    this.tenthLaserRoomGroup.children.each((sLaser, index) => {
                        const delayValue = [800,650,350,750]
                        const delay = index * delayValue[index];
                        const destinationXValues = [1265, 1265, 1040, 1265];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1250, delay);
                    });
                },950); 
                
            }
        } else if (characterPosition.y > 3280) {
            if(!this.transitioned13){
                this.transitioned13 = true;
                this.transitionToNextTarget(14);
                this.player.velocityChange(this, this.player);
                 setTimeout(() => {
                    this.nignthLaserRoomGroup.children.each((sLaser, index) => {
                        
                        const delayValue = [600,450,250,500]
                        const delay = index * delayValue[index];
                        const destinationXValues = [1265, 1265, 1390, 1265];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1250, delay);
                    });
                },1400);  
            }
        } else if (characterPosition.y > 3050) {
            if(!this.transitioned12){
                this.transitioned12 = true;
                this.transitionToNextTarget(13);
                this.player.velocityChange(this, this.player);
                setTimeout(() => {
                    this.eighthLaserRoomGroup.children.each((sLaser, index) => {
                        const delay = index * 700;
                        sLaser.moveTween(1265, 1250, delay);
                    });
                },650);  
            }
        } else if (characterPosition.y > 2810) {
            if(!this.transitioned11){
                this.transitioned11 = true;
                this.transitionToNextTarget(12);
                this.player.velocityChange(this, this.player);
                  setTimeout(() => {
                    this.seventhRoomLaserGroup.children.each((sLaser, index) => {
                        const delay = index * 620;
                        const destinationXValues = [1265, 1265, 1040, 1040, 1265];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1250, delay);
                    });
                },650); 
            }
        } else if (characterPosition.y > 2530) {
            if(!this.transitioned10){
                this.transitioned10 = true;
                this.transitionToNextTarget(11);
                this.player.velocityChange(this, this.player);
                setTimeout(() => {
                    this.sixthRoomLaserGroup1.children.each((sLaser, index) => {
                        const delay = index * 650;
                        const destinationXValues = [910, 910, 1265];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1250, delay);
                    });
                },750);
                setTimeout(() => {
                    this.sixthRoomLaserGroup2.children.each((sLaser, index) => {
                        const delay = index * 650;
                        const destinationXValues = [1390, 1390];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1250, delay);
                    });
                },750); 
            }
        } else if (characterPosition.y > 2290) {
            if(!this.transitioned9){
                this.transitioned9 = true;
                this.transitionToNextTarget(10);
                this.player.velocityChange(this, this.player);
                 setTimeout(() => {
                    this.fifthLaserRoomGroup1.children.each((sLaser, index) => {
                        const delayValue = [675,675,500]
                        const delay = index * delayValue[index];
                        const destinationXValues = [910, 910, 880];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1000, delay);
                    });
                },1000);
                setTimeout(() => {
                    this.fifthLaserRoomGroup2.children.each((sLaser, index) => {
                        
                        const delayValue = [675,675,500]
                        const delay = index * delayValue[index];
                        const destinationXValues = [1390, 1390, 1425];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1000, delay);
                    });
                },1000); 
            }
        }
        if (characterPosition.y > 2010) {
            if(!this.transitioned8){
                this.transitioned8 = true;
                this.transitionToNextTarget(9);
                this.player.velocityChange(this, this.player);
                setTimeout(() => {
                    this.fourthLaserRoomGroup1.children.each((sLaser, index) => {
                        const delay = index * 635;
                        sLaser.moveTween(910, 750, delay);
                    });
                },900);
                setTimeout(() => {
                    this.fourthLaserRoomGroup2.children.each((sLaser, index) => {
                        const delay = index * 635;
                        sLaser.moveTween(1390, 750, delay);
                    });
                },900); 
            }
        }
        else if (characterPosition.x > 1149 && characterPosition.y > 1900) {
            this.transitionObject.x = this.followTargets[8].x;
            this.transitionObject.y = 1915;
            this.cameras.main.startFollow(this.transitionObject, false, 0.05, 0.05);
            
        } else if (characterPosition.y > 1830) {
           
            this.transitionObject.y = 1915;
            this.transitionObject.x = this.player.x;
            this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
        } else if (characterPosition.y > 1770) {
            if(!this.transitioned7){
                this.transitioned7 = true;
                this.transitionToNextTarget(7);
                this.player.velocityChange(this, this.player);
            }
        } else if (characterPosition.y > 1520) {
            if(!this.transitioned6){
                this.transitioned6 = true;
                this.transitionToNextTarget(6);
                this.player.velocityChange(this, this.player);
            }
        } else if (characterPosition.y > 1240) {
            if(!this.transitioned5){
                this.transitioned5 = true;
                this.transitionToNextTarget(5);
                this.player.velocityChange(this, this.player);

                setTimeout(() => {
                    this.thirdLaserRoomGroup.children.each((sLaser, index) => {
                        const delay = index * 1500;
                        const destinationXValues = [150, 400, -147, 337];
                        const destinationX = destinationXValues[index] || 0;
                        sLaser.moveTween(destinationX, 1500, delay);
                    });
                },750); 
            }
        } else if (characterPosition.y > 990) {
            if(!this.transitioned4){
                this.transitioned4 = true;
                this.transitionToNextTarget(4);
                this.player.velocityChange(this, this.player);


                setTimeout(() => {
                    this.secondLaserRoomGroup.children.each((sLaser,index) => {
                        const delay = index * 100;
                        sLaser.moveTween(150,1500,delay);
                    });
                },1450); 
            }
        } else if (characterPosition.y > 740) {
            if (!this.transitioned3) {
                this.transitioned3 = true;
                this.transitionToNextTarget(3);
                this.player.velocityChange(this, this.player);
                
               
                setTimeout(() => {
                    this.firstLaserRoomGroup.children.each((sLaser, index) => {
                        const delay = index * 75;
                        sLaser.moveTween(150, 1750, delay);
                    });
                }, 1100); 
            }
        
        } else if (characterPosition.y > 470) {
            if(!this.transitioned2){
               
                this.transitioned2 = true;
                this.transitionToNextTarget(2);
                this.player.velocityChange(this, this.player);
            }
        } else if (characterPosition.y > 220) {
            if(!this.transitioned1){
                //this.lasergroup.add
                this.player.velocityChange(this, this.player);
                this.transitionToNextTarget(1);
                this.transitioned1 = true;
            }
        }

    }

    transitionToNextTarget(i) {
        this.tweens.add({
            targets: this.transitionObject,
            x: this.followTargets[i].x,
            y: this.followTargets[i].y,
            duration: 750, 
            ease: 'Linear',
            onComplete: () => {
                //console.log(this.transitionObject.x);
                //console.log(this.transitionObject.y);
               
            },
        });
    }

    resetMap(){
        setTimeout(() => {
            this.transitionObject.x = 100;
            this.transitionObject.y = 100;
            this.transitioned1 = false;
            this.transitioned2 = false;
            this.transitioned3 = false;
            this.transitioned4 = false;
            this.transitioned5 = false;
            this.transitioned6 = false;
            this.transitioned7 = false;
            this.transitioned8 = false;
            this.transitioned9 = false;
            this.transitioned10 = false;
            this.transitioned11 = false;
            this.transitioned12 = false;
            this.transitioned13 = false;
            this.transitioned14 = false;
            this.transitioned15 = false;
            this.transitioned16 = false;
            this.transitioned17 = false;
            this.inBossRooom = false;
            this.doOnce1 = false;
            this.doOnce2 = false;
           

            this.launcherEnemies.children.each((lEnemy) => {
                lEnemy.destroy(true);
            });
            this.springEnemies.children.each((sEnemy) => {
                sEnemy.destroy(true);
            });
    
            this.RWenemies.children.each((rwEnemy) => {
                rwEnemy.destroy(true);
            });
    
            this.fireEnemies.children.each((fEnemy) => {
                fEnemy.destroy(true);
            }); 
            

            this.springEnemies = this.physics.add.group();
            this.springEnemies.add(new springEnemy(this, config.width / 2 + 16, config.height + config.height / 2,'springEnemyCharge', this.player));        
            this.springEnemies.add(new springEnemy(this, config.width / 2 - 46, config.height + config.height / 2,'springEnemyCharge', this.player));
    
            this.RWenemies = this.physics.add.group();
            this.RWenemies.add(new RWenemy(this, 1151,3965, 'RWidle', this.player));        //1304,4033 1259,4020
            this.RWenemies.add(new RWenemy(this, 1364,3965, 'RWidle', this.player));
    
            this.fireEnemies = this.physics.add.group();           
            this.fireEnemies.add(new fireEnemy(this, 353, 1915,'enemyFireSingle', this.player));        
            this.fireEnemies.add(new fireEnemy(this, 532, 1940,'enemyFireSingle', this.player));
            this.fireEnemies.add(new fireEnemy(this, 786, 1940,'enemyFireSingle', this.player));
            
            this.launcherEnemies = this.physics.add.group();    
            this.launcherEnemies.add( new launcherEnemy(this, 100, 948,'launcherIdle',100,115));
            this.launcherEnemies.add( new launcherEnemy(this, 100, 1450,'launcherIdle',75,150));

    
    
            this.launcherEnemies.children.each((sEnemy) => {
                sEnemy.create();
            });
    
           this.springEnemies.children.each((sEnemy) => {
                sEnemy.create();
            });
    
            this.RWenemies.children.each((rwEnemy) => {
                rwEnemy.create();
            });
    
            this.fireEnemies.children.each((fEnemy) => {
                fEnemy.create();
            });       
        }, 3000); 
    }
    LoadAnimations(){
        this.anims.create(            //playerIdleShoot
            {
                key: 'idle',
                frames: this.anims.generateFrameNames('playerIdle', {start:0,end:1}), frameRate:2,                
                repeat:0                
            }
        );

        this.anims.create(            
            {
                key: 'idleShoot',
                frames: this.anims.generateFrameNames('playerIdleShoot', {start:0,end:0}), frameRate:10,                
                repeat:0
                
            }
        );
        this.anims.create(            
            {
                key: 'playerHurt',
                frames: this.anims.generateFrameNames('playerHurt', {start:0,end:0}), frameRate:10,                
                repeat:0
                
            }
        );
        this.anims.create(            
            {
                key: 'jump',
                frames: this.anims.generateFrameNames('playerJump', {start:0,end:0}), frameRate:10,                
                repeat:0
                
            }
        );

        this.anims.create(            
            {
                key: 'jumpShoot',
                frames: this.anims.generateFrameNames('playerJumpShoot', {start:0,end:0}), frameRate:10,                
                repeat:0
                
            }
        );

        this.anims.create(            
            {
                key: 'walk',
                frames: this.anims.generateFrameNames('playerWalk', {start:0,end:2}), frameRate:10,                
                repeat:0
                
            }
        );

        this.anims.create(            
            {
                key: 'walkShoot',
                frames: this.anims.generateFrameNames('playerWalkShoot', {start:0,end:2}), frameRate:10,                
                repeat:0
                
            }
        );       

        this.anims.create(   //springEnemyBullet         
            {
                key: 'shoot',
                frames: this.anims.generateFrameNames('springEnemyCharge', {start:0,end:6}), frameRate:12,                
                repeat:0
                
            }
        );   

        this.anims.create(            
            {
                key: 'springBulletLoop',
                frames: this.anims.generateFrameNames('springEnemyBullet', {start:0,end:1}), frameRate:12,                
                repeat:-1
                
            }
        );   
        
        this.anims.create(           
            {
                key: 'enemyFireIdleAnim',
                frames: this.anims.generateFrameNames('enemyFireIdle', {start:0,end:1}), frameRate:12,                
                repeat:-1                
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'enemyFireAttackAnim',
                frames: this.anims.generateFrameNames('enemyFireAttack', {start:0,end:2}), frameRate:12,                
                repeat: 0,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'fireEnemyBulletLoop',
                frames: this.anims.generateFrameNames('fireEnemyBullet', {start:0,end:1}), frameRate:12,                
                repeat: -1,
            }
        );

            //WithRobot

        this.anims.create(            //fireEnemyBullet
            {
                key: 'rwJump',
                frames: this.anims.generateFrameNames('RWJump', {start:0,end:2}), frameRate:12,                
                repeat: 0,
            }
        );  

        this.anims.create(            //fireEnemyBullet
            {
                key: 'rwLand',
                frames: this.anims.generateFrameNames('RWLand', {start:0,end:2}), frameRate:12,                
                repeat: 0,
            }
        ); 

        this.anims.create(            
            {
                key: 'rwIdle',
                frames: this.anims.generateFrameNames('RWidle', {start:0,end:0}), frameRate:12,                
                repeat: 0,
            }
        ); 

            //Without robot


        this.anims.create(            //fireEnemyBullet
            {
                key: 'rwOutIdle',
                frames: this.anims.generateFrameNames('RWoutIdle', {start:0,end:0}), frameRate:12,                
                repeat: 0,
            }
        ); 

        this.anims.create(            //fireEnemyBullet
            {
                key: 'rwOutShoot',
                frames: this.anims.generateFrameNames('RWoutShoot', {start:0,end:0}), frameRate:12,                
                repeat: 0,
            }
        ); 

        this.anims.create(            //fireEnemyBullet
            {
                key: 'rwOutBullet',
                frames: this.anims.generateFrameNames('RWoutBullet', {start:0,end:0}), frameRate:12,                
                repeat: 0,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanJump',
                frames: this.anims.generateFrameNames('quickmanJump', {start:0,end:0}), frameRate:12,                /////////////quickmanShoot
                repeat: 0,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanShoot',
                frames: this.anims.generateFrameNames('quickmanShoot', {start:0,end:0}), frameRate:12,                /////////////quickmanShoot
                repeat: 0,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanRunAnim',
                frames: this.anims.generateFrameNames('quickmanRun', {start:0,end:2}), frameRate:10,                /////////////
                repeat: -1,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanStart',
                frames: this.anims.generateFrameNames('quickmanStart', {start:0,end:12}), frameRate:12,                /////////////quickmanBullet
                loop: false,
            }
        );        

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanBulletAnim',
                frames: this.anims.generateFrameNames('quickmanBullet', {start:0,end:1}), frameRate:6,                /////////////quickmanBullet
                repeat: -1,
            }
        ); 

        this.anims.create(            //fireEnemyBullet
            {
                key: 'quickmanBulletSingleAnim',
                frames: this.anims.generateFrameNames('quickmanBulletSingle', {start:0,end:0}), frameRate:12,                /////////////quickmanBullet   healthUIboss
            }
        ); 

        this.anims.create(            //fireEnemyBullet
            {
                key: 'deathAnim',
                frames: this.anims.generateFrameNames('deathAnim', {start:0,end:5}), frameRate:12,                
                repeat: 0,
            }
        );

        this.anims.create(            //fireEnemyBullet
            {
                key: 'chargeHealth',
                frames: this.anims.generateFrameNames('healthUIboss', {start:0,end:28}), frameRate:8,                
            }
        );

        this.anims.create(
            {
                key: 'launcherDamage',
                frames: this.anims.generateFrameNames('launcherDamageHit', {start:0,end:3}), frameRate:10,
                repeat:50
    
            }
            );
            this.anims.create(
                {
                    key: 'launcherIdleAnim',
                    frames: this.anims.generateFrameNames('launcherIdle', {start:0,end:0}), frameRate:1,
                    repeat:0
    
                }
            );
            this.anims.create(
                {
                    key: 'HitEffect',
                    frames: this.anims.generateFrameNames('HitEffects', {start:2,end:0}), frameRate:10,
                    repeat:0
    
                }
            );
            this.anims.create(
                {
                    key: 'doorOpen',
                    frames: this.anims.generateFrameNames('door', {start:0,end:3}), frameRate:4,
                    repeat:0
    
                }
            );
            this.anims.create(
                {
                    key: 'doorClose',
                    frames: this.anims.generateFrameNames('door', {start:3,end:0}), frameRate:4,
                    repeat:0
    
                }
            );
    }        
}