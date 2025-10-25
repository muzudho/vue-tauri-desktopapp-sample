import { getLastSq } from '@/pages/minigames/reversi/game-board-content-util';


export function getStonesCap(
    restStones: number[],
    alternativeStartSq: number,
    nextOf: (sq: number)=>number,
) : number {
    if (restStones.length == 0) {
        return nextOf(alternativeStartSq);
    }
    return nextOf(getLastSq(restStones));
}
