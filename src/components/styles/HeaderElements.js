import styled from "styled-components";
import ReactSlider from "react-slider";

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    background-color: rgb(15, 82, 186);
    border-bottom: 1px solid darkgray;
`;

export const Navbar = styled.div`
    display: flex;
    width: 80%;
    color: white;
`;

export const NavbarLogo = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: 900;
    padding-right: 60px;
    text-shadow: 0px 1px 1px black;
    cursor: pointer;
`;

export const NavbarItems = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    text-shadow: 0px 0px 1px black;
`;

export const NavbarItemWrap = styled.div`
    width: 110px;
    display: flex;
    cursor: pointer;
    justify-content: center;
`;

export const NavbarItem = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 1px;

    &:hover {
        border-bottom: 3px solid white;
    }
`;

export const DropdownContent = styled.div`
    display: none;
    position: absolute;
    top: 43px;
    left: 0px;
    background-color: rgb(0, 110, 255);
    border-radius: 2px;
    min-width: 220px;
    box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

export const NavbarDropdown = styled.div`
    display: inline-block;
    position: relative;
    max-width: 300px;
    top: 5px;
    padding-right: 20px;
    padding-left: 20px;
    cursor: pointer;
    height: 50px;
    bottom: 4px;
    color: white;

    &:hover ${DropdownContent} {
        display: block;
    }
`;

export const DropdownLink = styled.a`
    display: flex;
    align-items: center;
    height: 43px;
    width: 100%;
    min-width: 115px;
    color: white;
    border-radius: 2px;

    padding: 12px 16px;

    &:hover {
        background-color: rgb(0, 95, 255);
    }
`;

export const Slider = styled(ReactSlider)`
    width: 90%;
    height: 25px;
`;

export const SliderThumb = styled.div`
    position: absolute;
    top: -3px;
    height: 17px;
    width: 17px;
    background-color: darkblue;
    border-radius: 50%;
    cursor: grab;
`;

export const SliderTrack = styled.div`
    top: 0;
    bottom: 0;
    background: white;
    border-radius: 999px;
    height: 10px;
`;
