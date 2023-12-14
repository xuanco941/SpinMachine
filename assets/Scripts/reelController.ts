import { _decorator, Component, Node, Vec3 } from 'cc';
import { itemController } from './itemController';
const { ccclass, property } = _decorator;

@ccclass('reelController')
export class reelController extends Component {

    private nodeItems: Node[] = [];

    private minHeightPosition: number = -300;
    private maxHeightPosition: number = 300;

    private heightItem: number = 100;

    // trạng thái reel đang chạy
    private isRunning: boolean = false;
    private isChangeResult: boolean = false;

    public typeSpin: number = 0; //0 là spinDown, 1 là spinUp,
    public spinSpeed: number = 20; // Tốc độ quay của reel, phải là số 100 chia hết

    public nodeResult1: Node;
    public nodeResult2: Node;
    public nodeResult3: Node;

    private result: number[] = [1,2,3,4,5,6,7];

    start() {
        this.nodeItems = this.node.children;
    }

    update(deltaTime: number) {
        if (this.isRunning == false) {
            // dừng reel tại điểm mặc định
            this.changeResult();
        }
        else {
            this.spin();
        }

    }

    private spin() {

        if (this.typeSpin == 0) {
            this.spinDown();
        }
        else {
            this.spinUp();
        }
    }

    private spinUp() {
        this.nodeItems.forEach((node, index) => {

            let position: Vec3 = node.getPosition();
            node.setPosition(position.x, position.y + this.spinSpeed, position.z);

        });

        let lastNode: Node;
        let arrPositionY: number[] = this.nodeItems.map(elm => elm.getPosition().y);
        lastNode = this.nodeItems.find(elm => elm.getPosition().y === Math.max(...arrPositionY));

        let positionLastNode = lastNode.getPosition();

        if (positionLastNode.y == this.maxHeightPosition + this.heightItem) {

            lastNode.setPosition(new Vec3(positionLastNode.x, this.minHeightPosition, positionLastNode.z));
        }
    }
    private spinDown() {
        this.nodeItems.forEach((node, index) => {

            let position: Vec3 = node.getPosition();
            node.setPosition(position.x, position.y - this.spinSpeed, position.z);

        });
        let lastNode: Node;
        let arrPositionY: number[] = this.nodeItems.map(elm => elm.getPosition().y);
        lastNode = this.nodeItems.find(elm => elm.getPosition().y === Math.min(...arrPositionY));

        let positionLastNode = lastNode.getPosition();

        if (positionLastNode.y == this.minHeightPosition - this.heightItem) {

            lastNode.setPosition(new Vec3(positionLastNode.x, this.maxHeightPosition, positionLastNode.z));
        }
    }


    public startReel() {

        if (this.isRunning == false) {
            this.isRunning = true;
        }

    }
    public stopReel() {
        if (this.isRunning == true) {
            this.isRunning = false;
        }
    }
    //result là mảng id kết quả của reel đó
    public setResult(result: number[]) {
        this.result = result;
        this.isChangeResult = true;
    }
    public changeResult(){
        if(this.isChangeResult){
            for (let index = 0; index < this.result.length; index++) {
                this.nodeItems.find(e => e.getComponent(itemController).id == this.result[index]).setPosition(0, 300 - this.heightItem * index, 0);
            }
            this.isChangeResult = false;
        }
    }


    public getValues() {
        let arr: number[] = [];
        arr.push(this.nodeItems.find(e => e.getPosition().y == 100).getComponent(itemController).id);
        arr.push(this.nodeItems.find(e => e.getPosition().y == 0).getComponent(itemController).id);
        arr.push(this.nodeItems.find(e => e.getPosition().y == -100).getComponent(itemController).id);

        return arr;
    }
}


