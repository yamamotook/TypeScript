import {Game} from './core/Game';
import { GamePageViewer } from './core/view/PageViewer'
import $ from 'jquery'
const gameViewer = new GamePageViewer();
const game  = new Game(gameViewer);


