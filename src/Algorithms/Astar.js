import { getNeighbors } from "./Utility";

// Performs A* algorithm. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export default function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const openSet = [];
    startNode.g = 0;
    startNode.f = Heuristic(startNode, finishNode);
    openSet.push(startNode);

    while (!!openSet.length) {
        // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
        const current = getClosestNode(openSet);

        // If we encounter a wall, we skip it.
        if (current.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (current.g === Infinity) return visitedNodesInOrder;
        if (current === finishNode) return visitedNodesInOrder;

        const unvisitedNeighbors = getNeighbors(current, grid, true);

        for (const neighbor of unvisitedNeighbors) {
            if (!neighbor.isWall) visitedNodesInOrder.push(neighbor);
            // tentative_g is the distance from start to the neighbor through current
            const tentative_g = current.g + 1;
            if (tentative_g <= neighbor.g) {
                // This path to neighbor is better than any previous one. Record it!
                if (neighbor.g === Infinity) insertNewNode(neighbor, openSet);
                neighbor.previousNode = current;
                neighbor.g = tentative_g;
                neighbor.f = tentative_g + Heuristic(neighbor, finishNode);
            }
        }
    }
}

function Heuristic(neighbor, finishNode) {
    /* Manhattan Distance since we are only allowed to move in 4 directions
         Multiplied by constant to reduce nodes searched */
    return (
        Math.abs(neighbor.row - finishNode.row) +
        Math.abs(neighbor.col - finishNode.col)
    );
}

function getClosestNode(unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (!currentClosest || currentClosest.f > unvisitedNodes[i].f) {
            currentClosest = unvisitedNodes[i];
            index = i;
        }
    }
    unvisitedNodes.splice(index, 1);
    return currentClosest;
}

function insertNewNode(node, arr) {
    /* Insert node into array based on f score (sorted in ascending order) */
    if (!arr.length) {
        arr.push(node);
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        if (node.f >= arr[i].f) {
            arr.splice(i, 0, node);
            return;
        }
    }
}
