class sprite {
    constructor(){
        this.name = '';
        this.path = '';
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.rowCount = 0;
        this.activeRow = 0;
        this.activeFrame = 0;
        this.img = new Image();
        action: {};
    }

}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;


const sprites = [];
const spriteActionsMap = new Map();
const currentSprite = new sprite();


// increase to slow
const frameRateLimit = 5;
// img scale;
const scale = 5;
let inc = 0;



function init(){
    let ddlSprites = document.getElementById("ddlSpriteName");
    for(let i=0; i< spritesJSON.length; i++){
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = spritesJSON[i].name;
        ddlSprites.appendChild(opt);
        spriteActionsMap.set(i, spritesJSON[i].actions)
    }
    ddlSprites.addEventListener('change', function(){
        let idx = this.value;
        currentSprite.name = ddlSprites.options[idx].text;
        currentSprite.path = spritesJSON[idx].path;
        currentSprite.frameWidth = spritesJSON[idx].frameW;
        currentSprite.frameHeight = spritesJSON[idx].frameH; 
        currentSprite.img.src = "sprites/" + spritesJSON[idx].path;
        setSpriteActions(idx);
        document.getElementById("ddlSpriteAction").dispatchEvent(new Event('change'));
    });
    currentSprite.name = ddlSprites.options[0].text;
    currentSprite.path = spritesJSON[0].path;
    currentSprite.frameWidth = spritesJSON[0].frameW;
    currentSprite.frameHeight = spritesJSON[0].frameH;
    currentSprite.actions = spritesJSON[0].actions;
    currentSprite.action = spritesJSON[0].actions[0];
    currentSprite.img.src = "sprites/" + spritesJSON[0].path;
    setSpriteActions(0);

}
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

function setSpriteActions(idx){
    let ddlSpriteActions = document.getElementById("ddlSpriteAction");
    let actions = spriteActionsMap.get(parseInt(idx));
    removeOptions(ddlSpriteActions);
    for(let i = 0; i < actions.length; i++){
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = spritesJSON[idx].actions[i].name;
        ddlSpriteActions.appendChild(opt);
    }
    currentSprite.action = actions[0];
    ddlSpriteActions.selectedIndex = 0;
    ddlSpriteActions.addEventListener('change', function(){
        currentSprite.action = actions[this.value];
    });

}


function calcSpriteFrame(inc){
    let frame = {
        x: 0,
        y: 0
    };
    if (inc %  frameRateLimit == 0){
        currentSprite.activeFrame ++;
        if (currentSprite.activeFrame >= currentSprite.actions.length){
            currentSprite.activeFrame = 0;
        } 
    }
    frame.y = currentSprite.action.row * currentSprite.frameHeight;
    frame.x = currentSprite.activeFrame * currentSprite.frameWidth;
    return frame;
}

function animate(){
    inc ++;
    let spriteFrame = calcSpriteFrame(inc);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentSprite.img, spriteFrame.x, spriteFrame.y,currentSprite.frameWidth, currentSprite.frameHeight, // src x,y,w,h,
        canvas.width / 2 - (currentSprite.frameWidth * scale / 2), canvas.height / 2 - (currentSprite.frameHeight * scale / 2), // canvas position (should be centered)
        currentSprite.frameWidth * scale ,currentSprite.frameHeight * scale); // img size on canvas
    requestAnimationFrame(animate);
}
init();
animate();