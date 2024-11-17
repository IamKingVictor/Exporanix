import React from "react"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  max?: number
  step?: number
  ariaLabel?: string
  className?: string
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  max = 1,
  step = 0.01,
  ariaLabel,
  className,
}) => {
  return (
    <input
      type="range"
      value={value}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={ariaLabel}
      className={`w-full h-2 bg-gray-600 rounded-lg cursor-pointer focus:outline-none accent-red-500 ${className}`}
    />
  )
}

export default Slider
