class CharacterSelect extends Phaser.Scene
{
    constructor()
    {
        super({key:'character_select'});
        this.followTargets = [
            new Phaser.Math.Vector2(40, 24), //Top Left 0
            new Phaser.Math.Vector2(104, 24), //Top Middle 1
            new Phaser.Math.Vector2(168, 24), //Top Right 2
            new Phaser.Math.Vector2(40, 88), //Middle Left 3
            new Phaser.Math.Vector2(104, 88), //Middle Middle 4
            new Phaser.Math.Vector2(168, 88), //Middle Right 5 
            new Phaser.Math.Vector2(40, 152), //Bottom Left 6
            new Phaser.Math.Vector2(104, 152), //Bottom Middle 7
            new Phaser.Math.Vector2(168, 152), //Bottom Right 8
        ];
        this.CursorPosition = this.followTargets[4];//Top Left 0
        this.gameStarted = false;
    }
    
    preload(){
        this.load.setPath('assets/img');
        this.load.image('CharacterSelect','CharacterSelect.png');
        this.load.image('CharacterSelectCursor','CharacterSelectCursor.png');
        this.load.image('BossIntroBG','BossIntroBG.png');
        this.load.image('Q','Q.png');
        this.load.image('U','U.png');
        this.load.image('I','I.png');
        this.load.image('C','C.png');
        this.load.image('K','K.png');
        this.load.image('M','M.png');
        this.load.image('A','A.png');
        this.load.image('N','N.png');
        this.load.image('bg_back','background_back.png');
        this.load.image('bg_frontal','background_frontal.png');
        this.load.image('QuickManIntroPose', 'QuickManDropPose.png');
        this.load.spritesheet('QuickManDrop', 'QuickManDrop.png', {frameWidth: 29, frameHeight: 31});


        this.load.setPath('assets/sounds');
        this.load.audio('cursorMove','cursor_move.wav');
        this.load.audio('stageSelect','stageSelect.mp3');
        this.load.audio('error','error.mp3');
        this.load.audio('loadIn','stageSelectIntro.mp3');
        this.load.audio('confirm','confirm.mp3');

        // Preload megaman_map assets to avoid black screen on transition
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
        this.load.spritesheet('springEnemy', 'springEnemyBase.png', {frameWidth: 16, frameHeight: 8});
        this.load.spritesheet('springEnemyCharge', 'SpringEnemy.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('enemyFireSingle', 'singleFire.png', {frameWidth: 44, frameHeight: 36});
        this.load.spritesheet('enemyFireIdle', 'enemyFire2idle.png', {frameWidth: 44, frameHeight: 36});
        this.load.spritesheet('enemyFireAttack', 'enemyFire2attack2.png', {frameWidth: 44, frameHeight: 36});
        this.load.spritesheet('springEnemyBullet', 'springEnemyProjectile.png', {frameWidth: 11, frameHeight: 16});
        this.load.spritesheet('fireEnemyBullet', 'enemyFireBullet.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('fireEnemyBulletSingle', 'fireBulletSingle.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('healthUI','barraVida.png', {frameWidth:9, frameHeight:58});
        this.load.spritesheet('healthUIboss','quickmanVidaCharge.png', {frameWidth:9, frameHeight:58});
        this.load.spritesheet('deathAnim','deathAnim.png', {frameWidth:24, frameHeight:24});
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
        this.load.spritesheet('door', 'PortaPujar.png', {frameWidth: 16, frameHeight: 64});
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
    create(){
        const backgroundMusic = this.sound.add('stageSelect', { loop: true });
        backgroundMusic.play();
        this.textures.each(function (texture) {
            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        });
        this.cameras.main.setBounds(0, 0, 256, 256);
        this.background = this.add.image(0,0,'CharacterSelect').setOrigin(0,0);
        this.selecting = false;
        this.bgCursor = this.add.image(this.CursorPosition.x,this.CursorPosition.y,'CharacterSelectCursor').setOrigin(0,0);
        this.flashTween = this.tweens.add({
            targets: this.bgCursor,
            alpha: 0,
            duration: 150, 
            yoyo: true, 
            repeat: -1, 
            onUpdate: () => {
                
                this.bgCursor.setVisible(this.bgCursor.alpha > 0.55);
            }
        });

        this.input.keyboard.on('keydown-ENTER', (event) => {
            if (event.repeat || this.selecting) {
                return;
            }

            if (this.CursorPosition.x === 168 && this.CursorPosition.y === 24) {
                this.selecting = true;
                this.startBossAnim();
                this.sound.play('confirm');
            }
            else{
                this.sound.play('error');
            }
        });
        this.loadAnimation();
    }
    update(){
        const cursors = this.input.keyboard.createCursorKeys();

        if (Phaser.Input.Keyboard.JustDown(cursors.up) && this.CursorPosition.y > 24) {
            this.CursorPosition.y -= 64;
            this.sound.play('cursorMove');
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down) && this.CursorPosition.y < 152) {
            this.CursorPosition.y += 64;
            this.sound.play('cursorMove');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left) && this.CursorPosition.x > 40) {
            this.CursorPosition.x -= 64;
            this.sound.play('cursorMove');
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right) && this.CursorPosition.x < 168) {
            this.CursorPosition.x += 64;
            this.sound.play('cursorMove');
        }

        // Update the cursor position
        this.bgCursor.setPosition(this.CursorPosition.x, this.CursorPosition.y);

        if(this.gameStarted){
            this.bg_back.tilePositionX -=.25; 
            this.bg_frontal.tilePositionX -=1;
        }
    }

    MoveBoss(destinationY, duration,target) {

        const scene = this;

        // Set up the tween
        this.tweens.add({
            targets: target,
            y: destinationY,
            duration: duration,
            ease: 'Linear'
        });
    }

    startBossAnim() {
        this.sound.stopAll();
        this.sound.play('loadIn');
        this.background.setVisible(false);
        this.flashTween.stop();
        this.bgCursor.setVisible(false);
    
        const numFlashes = 8; 
        const flashDuration = 50; 
    
        const toggleBackground = () => {
            this.background.visible = !this.background.visible;
        };
    
        const createFlash = () => {
            const flash = this.add.graphics({ x: 0, y: 0 });
            flash.fillStyle(0xffffff, 1);
            flash.fillRect(0, 0, this.game.config.width, this.game.config.height);
    
            this.tweens.add({
                targets: flash,
                alpha: 0,
                duration: flashDuration,
                onComplete: () => {
                    flash.destroy();
                }
            });
        };
    
        for (let i = 0; i < numFlashes; i++) {
            this.time.delayedCall(i * flashDuration * 2, () => {
                createFlash();
                toggleBackground();
            });
        }
    

        this.time.delayedCall(numFlashes * flashDuration * 2, () => {

            setTimeout(() => {

                setTimeout(() => {
                    this.showLettersOneByOne();
                }, 500);

                this.background.setVisible(false);
                this.bgCursor.setVisible(false);
                this.flashTween.stop();


                this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0).setVisible(false);
                this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0).setVisible(false);
                this.bossIntroBg = this.add.image(0, 0, 'BossIntroBG').setOrigin(0, 0);

                this.quickManBoss = this.add.sprite(119, -50, 'QuickManIntroPose').setOrigin(0, 0);
                this.dropTween = this.tweens.add({
                    targets: this.quickManBoss,
                    y: 90,
                    duration: 500,
                    ease: 'Linear',
                    onComplete: () => {
                        this.gameStarted = true;
                        this.bg_back.setVisible(true);
                        this.bg_frontal.setVisible(true);
                        this.quickManBoss.anims.play('QuickManDrop', true);
                        setTimeout(() => {
                            this.scene.start('megaman_map');
                        }, 3000);
                    }
                });
            }, 200);
        });
    }


    showLettersOneByOne() {
        const letters = ['Q', 'U', 'I', 'C', 'K', 'M', 'A', 'N'];
        const delayBetweenLetters = 125; 
    
  
        letters.forEach((letter, index) => {
            this.time.delayedCall(index * delayBetweenLetters, () => {
                const xPos = 100 + index * 10;
                const yPos = 125;
                this.add.image(xPos, yPos, letter).setOrigin(0, 0);
            });
        });
    }
    
    loadAnimation(){
        this.anims.create(
            {
                key: 'QuickManDrop',
                frames:this.anims.generateFrameNumbers('QuickManDrop', {start:0, end: 8}),
                frameRate: 9,
                repeat: 0,
            });
    }
}