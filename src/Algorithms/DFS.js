import { getNeighbors } from "./Utility";

export default function DFS(grid, startNode) {
    const visitedNodesInOrder = [];
    const stack = [];
    stack.push(startNode);
    while (!!stack.length) {
        const current = stack.pop();

        if (current.isWall || current.isVisited) continue;

        current.isVisited = true;
        visitedNodesInOrder.push(current);
        if (current.isFinish) return visitedNodesInOrder;
        const neighbours = getNeighbors(current, grid, false);

        for (const neighbour of neighbours) {
            if (!neighbour.isVisited) {
                // Copy the current node otherwise a reference is used which changes each loop
                neighbour.previousNode = { ...current };
                stack.push(neighbour);
            }
        }
    }
    return visitedNodesInOrder;
}
