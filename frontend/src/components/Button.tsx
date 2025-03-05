import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
}

const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", className, children, ...props }) => {
  let buttonClass =
    "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"

  switch (variant) {
    case "ghost":
      buttonClass += " bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50"
      break
    default:
      buttonClass += " bg-blue-500 hover:bg-blue-600 text-white shadow-sm dark:bg-blue-700 dark:hover:bg-blue-800"
  }

  switch (size) {
    case "sm":
      buttonClass += " px-2.5 py-1.5 text-sm rounded-md"
      break
    case "lg":
      buttonClass += " px-4 py-2 text-lg rounded-md"
      break
    default:
      buttonClass += " px-3 py-2 text-sm rounded-md"
  }

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export { Button }

