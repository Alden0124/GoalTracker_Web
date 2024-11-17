import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";

    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className={`text-black/70 dark:text-foreground-dark`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            className={`w-full px-4 py-2 mt-[8px] rounded-[5px] border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:text-foreground-dark ${
              isPasswordType ? "pr-12" : ""
            } ${className}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ right: '15px', top: '18px' }}
              className="absolute text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input; 