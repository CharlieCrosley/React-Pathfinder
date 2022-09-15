import React, { useEffect, useState, useRef } from "react";
import { Grid, GridRow } from "./styles/VisualizerElements";
import Node from "./Node";
import "./styles/Node.css";
import { getNodesInShortestPathOrder } from "../Algorithms/Utility";
import Dijkstra from "../Algorithms/Dijkstra";
import Astar from "../Algorithms/Astar";
import DFS from "../Algorithms/DFS";
import BFS from "../Algorithms/BFS";

const GRID_ROWS = 31;
const GRID_COLS = 69;

const Visualizer = ({
    visualizeClick,
    setVisualizeClick,
    selectedAlgorithm,
    shouldClearGrid,
    setShouldClearGrid,
    visualizeSpeed,
}) => {
    const [grid, setGrid] = useState(null);

    const startPos = useRef({ row: 5, col: 5 });
    const finishPos = useRef({ row: 5, col: 20 });
    const eraseWall = useRef(false);
    const isMousePressed = useRef(false);
    const isGridClear = useRef(true);
    const isMovingStart = useRef(false);
    const isMovingFinish = useRef(false);
    const animationInProgress = useRef(false);
    const firstRender = useRef(true);
    const animationTimeouts = useRef([]);

    useEffect(() => {
        // Initialise the grid
        getNewGrid(false);
    }, []);

    useEffect(() => {
        // Run this code on first render only as DOM elements cant be accessed until after render
        if (grid && firstRender.current) {
            for (let row = 0; row < GRID_ROWS; row++) {
                for (let col = 0; col < GRID_COLS; col++) {
                    setNodeClassName(grid[row][col]);
                }
            }
            firstRender.current = false;
        }
    }, [grid]);

    useEffect(() => {
        // shouldClearGrid is set to true when clear button in header is pressed
        if (shouldClearGrid) {
            clearGrid(false);
        }
    }, [shouldClearGrid]);

    useEffect(() => {
        // visualizeInProgress is set to true when visualize button in header is pressed
        if (grid) visualizeAlgorithm();
    }, [visualizeClick]);

    const getNewGrid = (keepWalls) => {
        const initGrid = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < GRID_COLS; col++) {
                var node;
                node = createNode(
                    col,
                    row,
                    startPos.current,
                    finishPos.current,
                    keepWalls ? grid[row][col].isWall : false
                );
                currentRow.push(node);
                setNodeClassName(node);
            }
            initGrid.push(currentRow);
        }
        setGrid(initGrid);
    };

    const setNodeClassName = (node) => {
        // Reset node css
        const nodeId = node.row + "-" + node.col;
        if (document.getElementById(nodeId)) {
            if (node.isStart) {
                document.getElementById(nodeId).className = "node node-start";
            } else if (node.isFinish) {
                document.getElementById(nodeId).className = "node node-finish";
            } else if (node.isWall) {
                document.getElementById(nodeId).className = "node node-wall";
            } else {
                document.getElementById(nodeId).className = "node";
            }
        }
    };

    const clearGrid = (keepWalls) => {
        getNewGrid(keepWalls);
        setShouldClearGrid(false);
        clearCurrentAnimation();
        isGridClear.current = true;
    };

    const clearVisitedNodes = () => {
        // Faster than getNewGrid() as it doesnt update state each time
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                // Reset the nodes
                const node = createNode(
                    col,
                    row,
                    startPos.current,
                    finishPos.current,
                    grid[row][col].isWall
                );
                grid[row][col] = node;

                if (
                    !grid[row][col].isStart &&
                    !grid[row][col].isFinish &&
                    !grid[row][col].isWall
                ) {
                    const nodeId = row + "-" + col;
                    document.getElementById(nodeId).className = "node";
                }
            }
        }
    };

    const clearCurrentAnimation = () => {
        animationInProgress.current = false;
        for (const animation of animationTimeouts.current) {
            clearTimeout(animation);
        }
    };

    const visualizeAlgorithm = () => {
        if (animationInProgress.current) clearCurrentAnimation();
        setVisualizeClick(false);
        animationInProgress.current = true;

        // skip animation when dragging start and finish to instantly show path
        let animate = true;
        if (isMovingStart.current || isMovingFinish.current) animate = false;

        // Clear previous visualization
        if (!isGridClear.current) clearVisitedNodes();
        isGridClear.current = false;

        const startNode = grid[startPos.current.row][startPos.current.col];
        const finishNode = grid[finishPos.current.row][finishPos.current.col];
        let visitedNodesInOrder;
        if (selectedAlgorithm === "dijkstra") {
            visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
        } else if (selectedAlgorithm === "a*") {
            visitedNodesInOrder = Astar(grid, startNode, finishNode);
        } else if (selectedAlgorithm === "depth-first search") {
            visitedNodesInOrder = DFS(grid, startNode);
        } else if (selectedAlgorithm === "breadth-first search") {
            visitedNodesInOrder = BFS(grid, startNode);
        }

        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);

        const animationDuration = animateSearch(
            visitedNodesInOrder,
            nodesInShortestPathOrder,
            animate
        );

        // Allows the user to place/erase walls and move start/finish
        // after the animation has ended
        animationTimeouts.current.push(
            setTimeout(() => {
                animationInProgress.current = false;
            }, animationDuration)
        );
    };

    const animateSearch = (
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        animate
    ) => {
        // If not animated, show visited nodes instantly
        const searchAnimationDelay = animate ? 0.3 * visualizeSpeed.current : 0;
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            if (!node.isStart && !node.isFinish) {
                const nodeId = node.row + "-" + node.col;
                if (animate) {
                    animationTimeouts.current.push(
                        setTimeout(() => {
                            document.getElementById(nodeId).className =
                                "node node-visited";
                        }, searchAnimationDelay * i)
                    );
                } else {
                    document.getElementById(nodeId).className =
                        "node node-visited-instant";
                }
            }
        }
        // Add extra delay before showing shortest path
        // make animation delay 0 if not animated
        const totalSearchAnimationTime =
            searchAnimationDelay * visitedNodesInOrder.length + 500 * animate;

        return animateShortestPath(
            nodesInShortestPathOrder,
            totalSearchAnimationTime,
            animate
        );
    };

    const animateShortestPath = (
        nodesInShortestPathOrder,
        animationDelay,
        animate
    ) => {
        const shortestAnimationDelay = animate
            ? 1.5 * visualizeSpeed.current
            : 0;
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const node = nodesInShortestPathOrder[i];
            const nodeId = node.row + "-" + node.col;
            if (!node.isStart && !node.isFinish) {
                if (animate) {
                    animationTimeouts.current.push(
                        setTimeout(() => {
                            document.getElementById(nodeId).className =
                                "node node-shortest-path";
                        }, animationDelay + shortestAnimationDelay * i)
                    );
                } else {
                    document.getElementById(nodeId).className =
                        "node node-shortest-path-instant";
                }
            }
        }
        // Return the duration of the visited animation +
        // shortest path animation + 1.5s so the final node doesnt lag
        if (animationDelay === 0) return 0;
        else
            return (
                animationDelay +
                shortestAnimationDelay * nodesInShortestPathOrder.length +
                1500
            );
    };

    const moveStart = (row, col) => {
        grid[startPos.current.row][startPos.current.col].isStart = false;
        let nodeId = startPos.current.row + "-" + startPos.current.col;
        document.getElementById(nodeId).className = "node";

        grid[row][col].isStart = true;
        startPos.current = { row: row, col: col };

        nodeId = row + "-" + col;
        document.getElementById(nodeId).className = "node node-start";
        if (!isGridClear.current) visualizeAlgorithm();
    };

    const moveFinish = (row, col) => {
        grid[finishPos.current.row][finishPos.current.col].isFinish = false;
        let nodeId = finishPos.current.row + "-" + finishPos.current.col;
        document.getElementById(nodeId).className = "node";

        grid[row][col].isFinish = true;
        finishPos.current = { row: row, col: col };

        nodeId = row + "-" + col;
        document.getElementById(nodeId).className = "node node-finish";
        if (!isGridClear.current) visualizeAlgorithm();
    };

    return (
        <Grid>
            {grid &&
                grid.map((row, rowIdx) => {
                    return (
                        <GridRow key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                return (
                                    <Node
                                        key={nodeIdx}
                                        row={node.row}
                                        col={node.col}
                                        grid={grid}
                                        isMousePressed={isMousePressed}
                                        eraseWall={eraseWall}
                                        moveStart={moveStart}
                                        moveFinish={moveFinish}
                                        isMovingStart={isMovingStart}
                                        isMovingFinish={isMovingFinish}
                                        animationInProgress={
                                            animationInProgress
                                        }
                                        clearGrid={clearGrid}
                                    ></Node>
                                );
                            })}
                        </GridRow>
                    );
                })}
        </Grid>
    );
};

export default Visualizer;

const createNode = (col, row, startPos, finishPos, isWall) => {
    const isStart = row === startPos.row && col === startPos.col;
    const isFinish = row === finishPos.row && col === finishPos.col;
    return {
        col,
        row,
        isStart: isStart,
        isFinish: isFinish,
        distance: Infinity,
        isVisited: false,
        isWall: isWall,
        isShortestPath: false,
        previousNode: null,
        f: Infinity,
        g: Infinity,
    };
};
