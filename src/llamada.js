
class PhoneCall extends Phaser.GameObjects.Sprite
{
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} originX 
     * @param {*} maxX 
     * @param {*} finalX 
     */
    constructor(scene, x, y, originX, maxX, finalX)
    {
        super(scene, x, y, 'llamada');
        this.SetIteractive();

        this.input.setDraggable();
        this.setScrollFactor(1);
 
    }
    
    DoAction(pointer, dragX, dragY)
    {
        if (dragX > this.originX && dragX < this.maxX)
        {
            this.x = dragX;
        }
    }

    FinishAction()
    {
        if (this.x <= this.finalX)
        {
            this.x = this.originX;
        }
        else
        {
            this.clearTint();
            scene.ActionFinished(true);
        }
    }
    preupdate()
    {
    
    }

}