import { _decorator, Component, Node, Prefab, EventMouse, input, Input, instantiate, Vec3 } from 'cc';
import { reelController } from './reelController';
const { ccclass, property } = _decorator;

@ccclass('board1Controller')
export class board1Controller extends Component {
    @property({ type: Prefab })
    public reelPrefab: Prefab | null = null;

    public reel1Script:reelController;
    public reel2Script:reelController;
    public reel3Script:reelController;


    start() {
        let reel1 = instantiate(this.reelPrefab);
        let reel2 = instantiate(this.reelPrefab);
        let reel3 = instantiate(this.reelPrefab);

        this.node.addChild(reel1);
        this.node.addChild(reel2);
        this.node.addChild(reel3);

        reel1.setPosition(new Vec3(-100, 0, 0));
        reel2.setPosition(new Vec3(0, 0, 0));
        reel3.setPosition(new Vec3(100, 0, 0));


        this.reel1Script = reel1.getComponent(reelController);
        this.reel2Script = reel2.getComponent(reelController);
        this.reel3Script = reel3.getComponent(reelController);

        this.reel2Script.typeSpin = 1; //spinUp


        input.on(Input.EventType.MOUSE_DOWN, this.handleClickStart, this);
    }

    handleClickStart(event) {
        if (event.getButton() === EventMouse.BUTTON_LEFT) {
            this.reel1Script.startReel();
            this.reel2Script.startReel();
            this.reel3Script.startReel();

            this.reel1Script.setResult([7,6,5,4,3,2,1]);
            this.reel2Script.setResult([5,4,1,6,3,2,7]);
            this.reel3Script.setResult([5,4,1,3,2,6,7]);

        }
        else {
    

            this.reel1Script.stopReel();
            this.reel2Script.stopReel();
            this.reel3Script.stopReel();
        }


    }

    generateRandomArray() {
        let result: number[] = [];
      
        while (result.length < 3) {
          const randomNumber = Math.floor(Math.random() * (7)) + 1;
      
          // Kiểm tra số ngẫu nhiên đã tồn tại trong mảng chưa
          if (result.indexOf(randomNumber)==-1) {
            result.push(randomNumber);
          }
        }

        return result;
      }

    update(deltaTime: number) {

    }


}


