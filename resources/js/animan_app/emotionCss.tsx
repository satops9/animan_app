/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const tagsGrid = () => [
  css`
    display: grid;
    grid-template-columns: repeat(6, minmax(100px, 10%));
    grid-auto-rows: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid black;
    margin: auto;

    @media (max-width: 600px) {
      grid-template-columns: repeat(3, minmax(100px, 10%))};
  `
];

export const tagsGrid_up = () => [
  css`
    display: grid;
    grid-template-columns: repeat(1, minmax(100px, 10%));
    grid-auto-rows: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: auto;

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, minmax(100px, 10%))};
  `
];