import { _decorator, Component, Node,CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('itemController')
export class itemController extends Component {

    @property({type: CCInteger})
    public id: number;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


