"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          value,
          onValueChange,
          isOpen,
          setIsOpen,
        }),
      )}
    </div>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, isOpen, setIsOpen, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    onClick={() => setIsOpen(!isOpen)}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "" : "text-muted-foreground"}>{value || placeholder}</span>
)

const SelectContent = ({ className, children, isOpen, setIsOpen, value, onValueChange }) => {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      <div
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          "top-full mt-1 w-full",
          className,
        )}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onSelect: (itemValue) => {
              onValueChange(itemValue)
              setIsOpen(false)
            },
            isSelected: value === child.props.value,
          }),
        )}
      </div>
    </>
  )
}

const SelectItem = React.forwardRef(({ className, children, value, onSelect, isSelected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      isSelected && "bg-accent text-accent-foreground",
      className,
    )}
    onClick={() => onSelect(value)}
    {...props}
  >
    {children}
  </div>
))
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
