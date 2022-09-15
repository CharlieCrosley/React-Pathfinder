import React from "react";
import {
    NavbarContainer,
    Navbar,
    NavbarLogo,
    NavbarItems,
    NavbarItemWrap,
    NavbarItem,
    NavbarDropdown,
    DropdownContent,
    DropdownLink,
    SliderThumb,
    Slider,
    SliderTrack,
} from "./styles/HeaderElements";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({
    visualizeClick,
    setVisualizeClick,
    algorithm,
    setAlgorithm,
    setClearGrid,
    visualizeSpeed,
}) => {
    const onVisualizeClick = () => {
        if (!visualizeClick) setVisualizeClick(true);
    };

    const onClearClick = () => {
        if (!visualizeClick) setClearGrid(true);
    };

    const onSliderChange = (value) => {
        visualizeSpeed.current = value;
    };

    const Thumb = (props, state) => <SliderThumb {...props} />;
    const Track = (props, state) => (
        <SliderTrack {...props} index={state.index} />
    );

    return (
        <NavbarContainer>
            <Navbar>
                <NavbarLogo>Pathfinder</NavbarLogo>
                <NavbarItems>
                    <NavbarDropdown>
                        {algorithm[0].toUpperCase() + algorithm.slice(1)}
                        <IoMdArrowDropdown
                            style={{
                                position: "relative",
                                top: "5px",
                                fontSize: "25px",
                            }}
                        />
                        <DropdownContent>
                            <DropdownLink
                                onClick={() => setAlgorithm("dijkstra")}
                            >
                                Dijkstra
                            </DropdownLink>
                            <DropdownLink onClick={() => setAlgorithm("a*")}>
                                A*
                            </DropdownLink>
                            <DropdownLink
                                onClick={() =>
                                    setAlgorithm("depth-first search")
                                }
                            >
                                Depth-first Search
                            </DropdownLink>
                            <DropdownLink
                                onClick={() =>
                                    setAlgorithm("breadth-first search")
                                }
                            >
                                Breadth-first Search
                            </DropdownLink>
                        </DropdownContent>
                    </NavbarDropdown>
                    <NavbarItemWrap onClick={onVisualizeClick}>
                        <NavbarItem>Visualize</NavbarItem>
                    </NavbarItemWrap>
                    <NavbarItemWrap onClick={onClearClick}>
                        <NavbarItem>Clear</NavbarItem>
                    </NavbarItemWrap>

                    <NavbarDropdown>
                        Speed
                        <IoMdArrowDropdown
                            style={{
                                position: "relative",
                                top: "5px",
                                fontSize: "25px",
                            }}
                        />
                        <DropdownContent>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "15px",
                                }}
                            >
                                <Slider
                                    onChange={onSliderChange}
                                    defaultValue={[46]}
                                    renderTrack={Track}
                                    renderThumb={Thumb}
                                    invert={true}
                                    min={8}
                                />
                            </div>
                        </DropdownContent>
                    </NavbarDropdown>
                </NavbarItems>
            </Navbar>
        </NavbarContainer>
    );
};

export default Header;
