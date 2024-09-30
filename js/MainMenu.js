class MainMenu extends Phaser.Scene
{
    preload(){
        this.load.setPath('assets/img');
        this.load.spritesheet('titleScreen', 'TitleScreens.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('TitleIdle', 'TitleIdle.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('EquipHelmet', 'EquipHelmet.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerTp', 'TP.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('CityBackrop','CityBackrop.png');
        this.load.image('CityBuilding','CityBuilding.png');
        this.load.image('MenuScreen','MenuScreen.png')
        this.load.image('Cursor','Cursor.png');

        this.load.setPath('assets/sounds');
        this.load.audio('menuTheme','mainMenuTheme.mp3');
        this.load.audio('introTheme','introTheme.mp3');
        this.load.audio('tpOut','teleport_out.wav');
        this.load.audio('confirm','confirm.mp3');

        this.load.once('complete', this.create, this);
        this.skipped = false;
        this.isInIntro = true;
        this.timeoutIds = []; // Initialize the array
        this.menuCreateSkip = false;
        this.inMenu = false;
        this.done = false;
    }

    create(){
        this.sound.play('introTheme');
        this.LoadAnimationsMenu();
        this.cameras.main.setBackgroundColor(0x000000)
        
        this.graphics = this.add.graphics();
        
        this.scale.scaleMode = Phaser.Scale.ScaleModes.NEAREST;
        this.cameras.main.setZoom(4);
        
       
        this.textures.each(function (texture) {
            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        });
        this.cameras.main.setBounds(0, 0, 256, 256);
        this.cameras.main.setViewport(0, 0, this.game.config.width*4, this.game.config.height*4);
        
        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isInIntro) {
                this.isInIntro = !this.isInIntro;
                this.skipped = true;
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.inMenu) {
                //console.log("Playing game now");
                this.playerIdle.anims.play('EquipHelmet',true);
                this.flashTween.stop();
                this.cursor.setVisible(false);
                this.sound.stopAll();
                this.sound.play('confirm');
                this.playerIdle.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    if(!this.done){
                        this.playerIdle.anims.play('playerTp',true);
                        this.MoveBackdrop(-30,300,this.playerIdle,true);
                        this.done = true;
                        this.sound.play('tpOut');
                        setTimeout(() => {
                           //change scene
                           this.scene.start('character_select');
                         },400); 
                    }
                }, this);
            }
        });

        
        if(!this.skipped){
            this.titleScreen = this.add.sprite(0,0,'titleScreen',0).setOrigin(0,0);
            this.titleScreen.anims.play('loadIn',true);

            this.timeoutIds.push(setTimeout(() => {
                
                this.titleScreen.anims.play('loadOut',true);
            },5000));
            this.timeoutIds.push(setTimeout(() => {
                
                this.titleScreen.setTint(0x000000);
                
            },5500));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.clearTint();
                this.titleScreen.anims.play('secondLoadIn',true);
                
            },7000));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('secondTextLoadIn',true);
                
            },7250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('secondTextLoadOut',true);
                
            },12500));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.setFrame(5);
                
            },13000));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('thirdTextLoadIn',true);
                
            },13250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('thirdTextLoadOut',true);
                
            },18250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.setFrame(5);
                
            },18750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('fourthTextLoadIn',true);
                
            },19250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('fourthTextLoadOut',true);
                
            },24250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.setFrame(5);
                
            },24750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('fifthTextLoadIn',true);
                
            },25750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('fifthTextLoadOut',true);
                
            },30750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.setFrame(5);
                
            },31250));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('sixthTextLoadIn',true);
                
            },31750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.anims.play('sixthTextLoadOut',true);
                
            },36750));
            this.timeoutIds.push(setTimeout(() => {
                this.titleScreen.setFrame(5);
                this.titleScreen.setTint(0x000000);
                this.backdrop = this.add.image(0,100,'CityBackrop').setOrigin(0,0.487);
                this.building = this.add.image(0,0,'CityBuilding').setOrigin(0,0.652);
                this.playerIdle = this.add.sprite(195,-357,'TitleIdle',0).setOrigin(0,0); 
                this.playerIdle.anims.play('TitleIdle',true);
                this.MoveBackdrop(140,6000,this.playerIdle,false);
                this.MoveBackdrop(400,6000,this.backdrop,false);
                this.MoveBackdrop(500,6000,this.building,false);
                setTimeout(() => {
                    this.CreateMenu();
                    this.menuCreateSkip = true;
                },6500); 
            },37250));    
        } 
    
    }
    
    update() {

    
        if (this.skipped && !this.menuCreateSkip) {
            this.cancelAllTimeouts();
            this.menuCreateSkip = true;
            this.titleScreen.setTint(0x000000);
            this.backdrop = this.add.image(0, 400, 'CityBackrop').setOrigin(0, 0.487);
            this.building = this.add.image(0, 500, 'CityBuilding').setOrigin(0, 0.652);
            this.playerIdle = this.add.sprite(195, 140, 'TitleIdle', 0).setOrigin(0, 0);
            this.playerIdle.anims.play('TitleIdle', true);
            this.CreateMenu();
        }
    

    }
    
    CreateMenu() {
        // Stop introTheme audio if it is playing
        if (this.sound.get('introTheme').isPlaying) {
            this.sound.stopAll();  // Stop all sounds (you can use this.sound.stop('introTheme') if you only want to stop the introTheme)
            console.log('Stopped introTheme');
        } else {
            console.log('introTheme is not playing or not found');
        }
    
        // Add the menuTheme audio
        const menuMusic = this.sound.add('menuTheme', { loop: true });
        menuMusic.play();
        console.log('Started menuTheme');
    
        // Other menu creation code...
        this.menu = this.add.image(0, 0, 'MenuScreen').setOrigin(0, 0);
        this.inMenu = true;
        this.cursor = this.add.image(50, 153, 'Cursor').setOrigin(0, 0);
        this.flashTween = this.tweens.add({
            targets: this.cursor,
            alpha: 0,
            duration: 150,
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
                this.cursor.setVisible(this.cursor.alpha > 0.55);
            }
        });
    }
    
    cancelAllTimeouts() {
        this.timeoutIds.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        this.timeoutIds = []; 
    }

    MoveBackdrop(destinationY, duration,target,isPlayer) {

        const scene = this;

       
        this.tweens.add({
            targets: target,
            y: destinationY,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                if(isPlayer)
                setTimeout(() => {
                   target.setVisible(false);
                    //this.menu = this.add.image(0,0,'MenuScreen').setOrigin(0,0);
                },10);  
            },
        });
    }

    LoadAnimationsMenu(){
        this.anims.create(
            {
                key: 'loadIn',
                frames:this.anims.generateFrameNumbers('titleScreen', {start:0, end: 2}),
                frameRate: 6,
                repeat: 0,
            });
            this.anims.create(
                {
                    key: 'loadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:2, end: 0}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'secondLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:3, end: 5}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'secondTextLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:6, end: 8}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'secondTextLoadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:8, end: 6}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'thirdTextLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:9, end: 11}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'thirdTextLoadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:11, end: 9}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'fourthTextLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:12, end: 14}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'fourthTextLoadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:14, end: 12}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'fifthTextLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:15, end: 17}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'fifthTextLoadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:17, end: 15}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'sixthTextLoadIn',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:18, end: 20}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'sixthTextLoadOut',
                    frames:this.anims.generateFrameNumbers('titleScreen', {start:20, end: 18}),
                    frameRate: 6,
                    repeat: 0,
                });
            this.anims.create(
                {
                    key: 'TitleIdle',
                    frames:this.anims.generateFrameNumbers('TitleIdle', {start:0, end: 1}),
                    frameRate: 10,
                    repeat: -1,
                    yoyo:true
                });
            this.anims.create(
                {
                    key: 'playerTp',
                    frames:this.anims.generateFrameNumbers('playerTp', {start:0, end: 2}),
                    frameRate: 10,
                    repeat: 0
                });
            this.anims.create(
                {
                    key: 'EquipHelmet',
                    frames:this.anims.generateFrameNumbers('EquipHelmet', {start:0, end: 7}),
                    frameRate: 10,
                    repeat: 0
                });
                        
    }
}