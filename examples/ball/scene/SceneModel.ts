import { Model } from "mvc-tsx";
import { BallModel } from "./ball";

export class SceneModel extends Model {
    width = 0;
    height = 0;
    ball = new BallModel()
}