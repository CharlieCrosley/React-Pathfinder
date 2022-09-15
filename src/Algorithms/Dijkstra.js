import { getUnvisitedNeighbors } from "./Utility";

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export default function Dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    visitedNodesInOrder.push(startNode);
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {
        const closestNode = getClosestNode(unvisitedNodes);

        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;

        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function getClosestNode(unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (
            !currentClosest ||
            currentClosest.distance > unvisitedNodes[i].distance
        ) {
            currentClosest = unvisitedNodes[i];
            index = i;
        }
    }
    unvisitedNodes.splice(index, 1);
    return currentClosest;
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, false);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
