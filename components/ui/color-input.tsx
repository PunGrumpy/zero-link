"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { X } from "lucide-react";

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, label, value, onChange, ...props }, ref) => {
    const colorInputRef = React.useRef<HTMLInputElement>(null);

    const handleHexClick = () => {
      if (colorInputRef.current) {
        colorInputRef.current.click();
      }
    };

    const handleReset = () => {
      if (onChange) {
        const event = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative flex h-10 w-full items-center rounded-md border border-input dark:bg-input/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <div
            className="h-5 w-5 rounded-md border border-input"
            style={{ backgroundColor: value ? String(value) : "#000000" }}
          />
          <input
            ref={colorInputRef}
            type="color"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            value={value || "#000000"}
            onChange={onChange}
            {...props}
          />
          <span
            className="ml-3 cursor-pointer text-sm text-muted-foreground"
            onClick={handleHexClick}
          >
            {value || "#000000"}
          </span>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-auto h-6 w-6 z-10"
              onClick={handleReset}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Reset color</span>
            </Button>
          )}
        </div>
      </div>
    );
  }
);

ColorInput.displayName = "ColorInput";

export { ColorInput };