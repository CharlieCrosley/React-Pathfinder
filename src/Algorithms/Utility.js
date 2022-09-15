export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNeighbors(node, grid, diagonal) {
    const neighbors = [];
    const { col, row } = node;

    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);

    if (diagonal) {
        if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);

        if (row < grid.length - 1 && col > 0)
            neighbors.push(grid[row + 1][col - 1]);

        if (row > 0 && col < grid.length - 1)
            neighbors.push(grid[row - 1][col + 1]);

        if (row > grid.length - 1 && col < grid.length - 1)
            neighbors.push(grid[row + 1][col + 1]);
    }
    return neighbors;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
