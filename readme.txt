Add a spritesheet to the sprites folder.
Define the sprite in sprites/sprites.js by adding an object to the spritesJSON variable in the following format:
     {
    "name": "sprite name",
    "path": "relative path to spritesheet",
    "frameW": frame width (int),
    "frameH": frame height (int),
    "actions": [
        {
            "name": "name of action",
            "frames": number of frames (for current row),
            "row": row index (from 0)
        }
        ]
    },
    
