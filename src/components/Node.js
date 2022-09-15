import React from "react";
import "./styles/Node.css";

const Node = ({
    row,
    col,
    grid,
    isMousePressed,
    eraseWall,
    moveStart,
    moveFinish,
    isMovingStart,
    isMovingFinish,
    animationInProgress,
    clearGrid,
}) => {
    const onMouseEnter = (e) => {
        // Disable mouse during search animation
        if (animationInProgress.current) return;

        const node = grid[row][col];
        if (isMovingStart.current && !node.isWall && !node.isFinish) {
            // Move start to this node if not finish or a wall
            moveStart(row, col);
            node.isStart = true;
        } else if (isMovingFinish.current && !node.isWall && !node.isStart) {
            // Move finish to this node if not start or a wall
            moveFinish(row, col);
            node.isFinish = true;
        } else if (!node.isStart && !node.isFinish) {
            // Add/Remove wall if mouse is held down
            if (isMousePressed.current) {
                node.isWall = !eraseWall.current;
                const nodeId = row + "-" + col;
                const className = !eraseWall.current
                    ? "node node-wall"
                    : "node";
                document.getElementById(nodeId).className = className;
            }
        }
    };

    const onMouseLeave = (e) => {
        const node = grid[row][col];
        // Check if leaving node whilst dragging start or finish
        if (isMovingStart.current) node.isStart = false;
        else if (isMovingFinish.current) node.isFinish = false;
    };

    const onMouseDown = (e) => {
        // Disable mouse during animation
        if (animationInProgress.current) return;

        const node = grid[row][col];
        if (node.isStart) {
            // Start dragging start
            isMovingStart.current = true;
        } else if (node.isFinish) {
            // Start dragging finish
            isMovingFinish.current = true;
        } else {
            // Choose whether to erase or add walls
            eraseWall.current = grid[row][col].isWall;
            grid[row][col].isWall = !grid[row][col].isWall;
            isMousePressed.current = true;
            const nodeId = row + "-" + col;
            document.getElementById(nodeId).className = "node node-wall";
            clearGrid(true);
        }
    };

    const onMouseUp = (e) => {
        const node = grid[row][col];
        // Stop placing/erasing walls
        isMousePressed.current = false;
        if (node.isStart) {
            // Stop moving start
            isMovingStart.current = false;
        } else if (node.isFinish) {
            // stop moving finish
            isMovingFinish.current = false;
        }
    };

    return (
        <div
            id={row + "-" + col}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

export default Node;
