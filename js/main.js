var gamePrefs = {
    QUICKMAN_MOVE_SPEED: 75, //65
    QUICKMAN_JUMP_SPEED: 150,
    QUICKMAN_BULLET_OFFSET: 20,
    BULLET_SPEED: 180,
    gameWidth:256,
    gameHeight:240,
    valueTimeScale:1,
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    backgroundColor: '#00000',
    scene:[MainMenu,megaman_map ,CharacterSelect],
    render:{
        pixelart: true
    },
    scale:
    {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width:gamePrefs.gameWidth,
        height:gamePrefs.gameHeight,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade', arcade:{
            gravity:{y:1000},
            timeScale: gamePrefs.valueTimeScale,
            debug:false
        }
    },
    fps:
    {
        //target:60,
        //forceSetTimeOut:true
    }
};

var juego = new Phaser.Game(config);