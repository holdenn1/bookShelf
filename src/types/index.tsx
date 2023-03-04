import React from "react";

export interface IChildren{
  children: React.ReactNode
}

export interface INavButtons {
  step: number,
  setStep:  React.Dispatch<React.SetStateAction<number>>
}